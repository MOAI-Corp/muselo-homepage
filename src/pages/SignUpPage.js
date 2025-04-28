
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { serverTimestamp } from 'firebase/firestore';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import TermsAgreement from '../components/auth/TermsAgreement'; // 약관 동의 컴포넌트

function SignUpPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  const [agreeTerms, setAgreeTerms] = useState(false); // 필수
  const [agreeMarketing, setAgreeMarketing] = useState(false); // 선택
  const [agreeAll, setAgreeAll] = useState(false); // 전체동의
  const [termsError, setTermsError] = useState('');
  


  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    return /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
  };
  

  const formatPhoneNumber = (phone) => {
    if (phone.startsWith('0')) {
      return '+82' + phone.substring(1);
    }
    return phone;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!agreeTerms) {
      setTermsError('약관에 동의해야 회원가입이 가능합니다.');
      return;
    }
  
    if (!validateEmail(email)) {
      setEmailError('유효한 이메일 주소를 입력해주세요.');
      return;
    }
  
    if (!validatePassword(password)) {
      setPasswordError('비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.');
      return;
    }
  
    if (password !== passwordConfirm) {
      setPasswordConfirmError('비밀번호가 일치하지 않습니다.');
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(db, 'consumers', user.uid), {
        phoneNumber: formatPhoneNumber(phoneNumber),
        uid: user.uid,
        userEmail: email,
        userFullName: fullName,
        agreeTerms: agreeTerms,       // 필수 약관 동의 여부
        agreeMarketing: agreeMarketing, // 마케팅 수신 동의 여부
        createdAt: serverTimestamp(), // 🔥 가입일시 자동 기록
        AccountStatus: 'active', // 🔥 기본 회원 상태 추가
      });
  
      alert('회원가입 성공!');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('회원가입 실패: 이메일 또는 비밀번호를 확인해주세요.');
    }
  };
  const handleAgreeAll = (checked) => {
    setAgreeAll(checked);
    setAgreeTerms(checked);
    setAgreeMarketing(checked);
  };
  
  const handleAgreeTerms = (checked) => {
    setAgreeTerms(checked);
    if (!checked) setAgreeAll(false);
  };
  
  const handleAgreeMarketing = (checked) => {
    setAgreeMarketing(checked);
    if (!checked) setAgreeAll(false);
  };
  


  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* 이메일 */}
          <div>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(validateEmail(e.target.value) ? '' : '유효한 이메일 주소를 입력해주세요.');
              }}
              className="w-full border px-4 py-2 rounded"
              required
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          {/* 비밀번호 */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(validatePassword(e.target.value) ? '' : '비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.');
              }}
              className="w-full border px-4 py-2 rounded"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
            </button>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
                setPasswordConfirmError(password === e.target.value ? '' : '비밀번호가 일치하지 않습니다.');
              }}
              className="w-full border px-4 py-2 rounded"
              required
            />
            {passwordConfirmError && <p className="text-red-500 text-sm mt-1">{passwordConfirmError}</p>}
          </div>

          {/* 이름, 전화번호 */}
          <input
            type="text"
            placeholder="이름"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="전화번호 (예: 01012345678)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <span>확인코드</span>

        {/* 약관 동의 영역 */}
        <TermsAgreement
        agreeAll={agreeAll}
        agreeTerms={agreeTerms}
        agreeMarketing={agreeMarketing}
        onAgreeAll={handleAgreeAll}
        onAgreeTerms={handleAgreeTerms}
        onAgreeMarketing={handleAgreeMarketing}
        termsError={termsError}
        />



          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
          >
            회원가입
          </button>
          
          <p className="text-center text-sm mt-4">
            이미 계정이 있으신가요? <a href="/login" className="font-bold text-orange-600">로그인</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
