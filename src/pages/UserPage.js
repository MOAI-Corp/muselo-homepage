import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../firebase';
import { doc, getDoc, updateDoc, deleteDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { deleteObject, ref, listAll } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { updatePassword, signOut, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

function UserProfilePage() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [editedMarketing, setEditedMarketing] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');

  const [deleting, setDeleting] = useState(false); // 탈퇴 처리 중
  const [passwordModalOpen, setPasswordModalOpen] = useState(false); // 비밀번호 입력 모달
  const [inputPassword, setInputPassword] = useState(''); // 입력한 비밀번호

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        navigate('/login');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'consumers', currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          setEditedName(data.userFullName);
          setEditedPhone(data.phoneNumber.startsWith('+82') ? '0' + data.phoneNumber.substring(3) : data.phoneNumber);
          setEditedMarketing(data.agreeMarketing);
        }
      } catch (error) {
        console.error('유저 데이터 가져오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
  };

  const handleSaveChanges = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    try {
      const formattedPhone = editedPhone.startsWith('0')
        ? '+82' + editedPhone.substring(1)
        : editedPhone;

      await updateDoc(doc(db, 'consumers', currentUser.uid), {
        userFullName: editedName,
        phoneNumber: formattedPhone,
        agreeMarketing: editedMarketing,
      });

      alert('회원정보가 수정되었습니다.');
      setUserData((prev) => ({
        ...prev,
        userFullName: editedName,
        phoneNumber: formattedPhone,
        agreeMarketing: editedMarketing,
      }));
      setEditMode(false);
    } catch (error) {
      console.error('회원정보 수정 실패:', error);
      alert('회원정보 수정에 실패했습니다.');
    }
  };

  const handleChangePassword = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    if (!currentPasswordInput || !newPassword || !confirmPassword) {
      setPasswordError('모든 항목을 입력해주세요.');
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(currentUser.email, currentPasswordInput);
      await reauthenticateWithCredential(currentUser, credential);

      if (currentPasswordInput === newPassword) {
        setPasswordError('이전 비밀번호와 동일합니다. 다른 비밀번호를 입력하세요.');
        return;
      }

      if (!validatePassword(newPassword)) {
        setPasswordError('대문자, 소문자, 숫자, 특수문자 포함 8자 이상이어야 합니다.');
        return;
      }

      if (newPassword !== confirmPassword) {
        setPasswordError('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
        return;
      }

      await updatePassword(currentUser, newPassword);
      alert('비밀번호가 변경되었습니다. 다시 로그인해주세요.');
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
      if (error.code === 'auth/wrong-password') {
        setPasswordError('현재 비밀번호가 일치하지 않습니다.');
      } else {
        setPasswordError('비밀번호 변경 중 오류가 발생했습니다.');
      }
    }
  };

  const confirmDeleteAccount = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    if (!inputPassword) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    try {
      setPasswordModalOpen(false); // 모달 닫기
      setDeleting(true); // 로딩 시작

      const credential = EmailAuthProvider.credential(currentUser.email, inputPassword);
      await reauthenticateWithCredential(currentUser, credential);

      const uid = currentUser.uid;

      await deleteDoc(doc(db, 'consumers', uid));

      const storageRef = ref(storage, `consumers/${uid}`);
      const listResult = await listAll(storageRef);
      for (const itemRef of listResult.items) {
        await deleteObject(itemRef);
      }

      await setDoc(doc(db, 'deleted_users', uid), {
        uid: uid,
        email: currentUser.email,
        deletedAt: serverTimestamp(),
      });

      await currentUser.delete();

      navigate('/withdrawal-complete');
    } catch (error) {
      console.error('회원 탈퇴 실패:', error);
      if (error.code === 'auth/wrong-password') {
        alert('비밀번호가 틀렸습니다.');
      } else if (error.code === 'auth/requires-recent-login') {
        alert('최근 로그인 정보가 필요합니다. 다시 로그인 후 시도해주세요.');
      } else {
        alert('회원 탈퇴에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setDeleting(false);
      setInputPassword('');
    }
  };

  if (loading) {
    return <div className="text-center py-20">로딩 중...</div>;
  }

  if (!userData) {
    return <div className="text-center py-20">유저 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-28 pb-20 px-4 relative">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8 space-y-12">
        
        {/* 프로필 섹션 */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">내 프로필</h2>
            {editMode ? (
              <div className="flex gap-2">
                <button onClick={handleSaveChanges} className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 text-sm">저장</button>
                <button onClick={() => setEditMode(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm">취소</button>
              </div>
            ) : (
              <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm">수정하기</button>
            )}
          </div>

          {/* 프로필 입력 */}
          <div className="space-y-4">
            {[
              { label: '이름', value: editedName, onChange: setEditedName },
              { label: '전화번호', value: editedPhone, onChange: setEditedPhone },
            ].map((field, idx) => (
              <div key={idx}>
                <label className="block text-gray-600 text-sm mb-1">{field.label}</label>
                {editMode ? (
                  <input type="text" value={field.value} onChange={(e) => field.onChange(e.target.value)} className="w-full border rounded-md p-2" />
                ) : (
                  <div className="text-gray-900">{field.value}</div>
                )}
              </div>
            ))}

            <div>
              <label className="block text-gray-600 text-sm mb-1">이메일</label>
              <div className="text-gray-900">{userData.userEmail}</div>
            </div>

            {/* 약관 및 마케팅 수신 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={userData.agreeTerms} disabled className="w-4 h-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded" />
                <span className="text-sm text-gray-700">약관 동의</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={editedMarketing} disabled={!editMode} onChange={(e) => setEditedMarketing(e.target.checked)} className="w-4 h-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded" />
                <span className="text-sm text-gray-700">마케팅 수신 동의</span>
              </div>
            </div>
          </div>
        </section>

        {/* 비밀번호 변경 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">비밀번호 변경</h2>
          <input type="password" placeholder="현재 비밀번호" value={currentPasswordInput} onChange={(e) => { setCurrentPasswordInput(e.target.value); setPasswordError(''); }} className="w-full border rounded-md p-2" />
          <input type="password" placeholder="새 비밀번호" value={newPassword} onChange={(e) => { setNewPassword(e.target.value); setPasswordError(''); }} className="w-full border rounded-md p-2" />
          <input type="password" placeholder="새 비밀번호 확인" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError(''); }} className="w-full border rounded-md p-2" />
          {passwordError && <div className="text-red-500 text-sm">{passwordError}</div>}
          <button onClick={handleChangePassword} className="w-full mt-2 bg-orange-500 text-white py-2 rounded hover:bg-orange-600">비밀번호 변경</button>
        </section>

        {/* 계정 관리 */}
        <section className="space-y-4 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">계정 관리</h2>
          <button onClick={() => auth.signOut()} className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500">로그아웃</button>
          <button onClick={() => setPasswordModalOpen(true)} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">회원 탈퇴</button>
        </section>
      </div>

      {/* 비밀번호 재입력 모달 */}
      {passwordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">회원 탈퇴</h2>
            <p className="text-gray-600 mb-4"> 
              정말 탈퇴를 진행하시겠습니까? <br />
              탈퇴 후에는 복구할 수 없습니다. 
              </p>
            <input type="password" placeholder="현재 비밀번호 입력" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} className="w-full border rounded-md p-2 mb-4" />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setPasswordModalOpen(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm">취소</button>
              <button onClick={confirmDeleteAccount} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm">탈퇴 진행</button>
            </div>
          </div>
        </div>
      )}

      {/* 탈퇴 진행 중 로딩 */}
      {deleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-lg font-semibold">탈퇴 처리 중...</div>
        </div>
      )}
    </div>
  );
}

export default UserProfilePage;
