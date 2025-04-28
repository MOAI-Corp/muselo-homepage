import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

import React, { useState, useEffect } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../firebase';
import { setDoc, serverTimestamp, doc } from 'firebase/firestore';

function PostEditorModal({ isOpen, onClose, type, defaultData }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const isEditing = !!defaultData;

  useEffect(() => {
    if (defaultData) {
      setTitle(defaultData.title || defaultData.question || '');
      setContent(defaultData.content || defaultData.answer || '');
      setCategory(defaultData.category || '');
    } else {
      setTitle('');
      setContent('');
      setCategory('');
    }
  }, [defaultData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || (type === 'faq' && !category)) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const collectionName =
      type === 'notice'
        ? 'homepage_notices'
        : type === 'faq'
        ? 'homepage_faqs'
        : null;

    if (!collectionName) return;

    const docId = isEditing ? defaultData.id : uuidv4();
    const data =
      type === 'notice'
        ? { title, content, createdAt: serverTimestamp() }
        : {
            question: title,
            answer: content,
            category,
            createdAt: serverTimestamp(),
          };

    await setDoc(doc(db, collectionName, docId), data, { merge: true });

    setTitle('');
    setContent('');
    setCategory('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-xl shadow space-y-4"
      >
        <h2 className="text-lg font-bold">{isEditing ? '글 수정' : '새 글 작성'}</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={type === 'faq' ? '질문' : '제목'}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />

        {type === 'faq' && (
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="분류 (예: 배송, 결제, 제품)"
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        )}

        <MarkdownEditor
          value={content}
          onChange={(val) => setContent(val)}
          height="200px"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            {isEditing ? '수정 완료' : '등록'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostEditorModal;
