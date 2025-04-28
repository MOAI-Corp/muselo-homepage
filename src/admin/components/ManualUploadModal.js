// src/admin/components/ManualUploadModal.js
import React, { useState } from 'react';
import { db } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';



function ManualUploadModal({ isOpen, onClose }) {
  const [productName, setProductName] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const storage = getStorage();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!productName || !file || !file.name) {
      alert('제품명과 파일을 모두 선택해주세요.');
      return;
    }
  
    setUploading(true);
  
    const storageRef = ref(storage, `manuals/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const fileUrl = await getDownloadURL(storageRef);
  
    await addDoc(collection(db, 'homepage_manuals'), {
      productName,
      fileUrl,
      createdAt: serverTimestamp(),
    });
  
    setProductName('');
    setFile(null);
    setUploading(false);
    onClose();
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={handleUpload}
        className="bg-white p-6 rounded-lg w-full max-w-md shadow space-y-4"
      >
        <h2 className="text-lg font-bold">사용설명서 등록</h2>
        <input
          type="text"
          placeholder="제품명"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
        />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            취소
          </button>
          <button
            type="submit"
            disabled={uploading}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            {uploading ? '업로드 중...' : '등록'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ManualUploadModal;
