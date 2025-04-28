import React, { useEffect, useState } from 'react';
import { db, storage } from '../../firebase';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import imageCompression from 'browser-image-compression';

// 위에 있는 import 등 동일

function ProductEditorModal({ product, onClose }) {
    const [productName, setProductName] = useState(product?.productName || '');
    const [description, setDescription] = useState(product?.description || '');
    const [category, setCategory] = useState(product?.category || '');
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(product?.imageUrl || '');
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
      let imageUrl = product?.imageUrl || '';
  
      try {
        if (imageFile) {
          const compressedFile = await imageCompression(imageFile, {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1000,
            useWebWorker: true,
          });
  
          const uniqueName = `${uuidv4()}.${imageFile.name.split('.').pop()}`;
          const fileRef = ref(storage, `products/${uniqueName}`);
  
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
  
        const data = {
          productName,
          description,
          category,
          imageUrl,
          updatedAt: serverTimestamp(),
        };
  
        if (product?.id) {
          await updateDoc(doc(db, 'homepage_products', product.id), data);
        } else {
          await addDoc(collection(db, 'homepage_products'), {
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
          <h2 className="text-xl font-bold">{product ? '제품 수정' : '제품 등록'}</h2>
  
          <input
            type="text"
            placeholder="제품명"
            className="w-full border px-3 py-2 rounded"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
  
          <textarea
            placeholder="제품 설명 (선택)"
            className="w-full border px-3 py-2 rounded"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
  
          <input
            type="text"
            placeholder="제품 분류 (예: 본체, 액세서리, 프레임 등)"
            className="w-full border px-3 py-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
  
          <div>
            <label className="block text-sm font-medium">제품 이미지</label>
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
            권장 이미지: 1000×1000px / 정사각형 비율 / JPG 또는 WEBP / 최대 1MB
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
  
  export default ProductEditorModal;
  