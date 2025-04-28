import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from '../../firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import imageCompression from 'browser-image-compression';


function BannerEditorModal({ banner, onClose }) {
  const [title, setTitle] = useState(banner?.title || '');
  const [subtitle, setSubtitle] = useState(banner?.subtitle || '');
  const [contents, setContents] = useState(banner?.contents || '');
  const [linkUrl, setLinkUrl] = useState(banner?.linkUrl || '');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(banner?.imageUrl || '');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    let imageUrl = banner?.imageUrl || '';

    try {
      if (imageFile) {
        // 1. 압축
        const compressedFile = await imageCompression(imageFile, {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });

        // 2. 고유 파일명 생성
        const uniqueName = `${uuidv4()}.${imageFile.name.split('.').pop()}`;
        const fileRef = ref(storage, `banners/${uniqueName}`);

        // 3. 업로드 + 진행률 표시
        const uploadTask = uploadBytesResumable(fileRef, compressedFile);
        await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(Math.round(progress));
            },
            (error) => reject(error),
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      // 4. Firestore 저장
      const data = {
        title,
        subtitle,
        contents,
        linkUrl,
        imageUrl,
        updatedAt: serverTimestamp(),
      };

      if (banner?.id) {
        await updateDoc(doc(db, 'homepage_banners', banner.id), data);
      } else {
        await addDoc(collection(db, 'homepage_banners'), {
          ...data,
          createdAt: serverTimestamp(),
        });
      }

      onClose();
    } catch (err) {
      alert('업로드 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold">{banner ? '배너 수정' : '배너 등록'}</h2>

        <input
          type="text"
          placeholder="제목"
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="부제목 (예: #웨딩사진)"
          className="w-full border px-3 py-2 rounded"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />

        <textarea
          placeholder="설명"
          className="w-full border px-3 py-2 rounded"
          rows="3"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />

        <input
          type="url"
          placeholder="링크 URL (선택)"
          className="w-full border px-3 py-2 rounded"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium">배너 이미지</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="미리보기"
              className="mt-2 rounded w-full h-40 object-cover"
            />
          )}
        </div>
        <small className="text-xs text-gray-500">
            권장 이미지 크기: 1920×960px / JPG 또는 WEBP 형식 / 최대 1MB
        </small>

        {isUploading && (
          <div className="text-sm text-gray-600">업로드 중... {uploadProgress}%</div>
        )}

        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="text-gray-600"
            onClick={onClose}
            disabled={isUploading}
          >
            취소
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={isUploading}
          >
            {isUploading ? '업로드 중...' : '저장'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BannerEditorModal;
