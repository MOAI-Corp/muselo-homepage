// src/admin/pages/ManagePostsPage.js
import React, { useState } from 'react';
import PostList from '../components/PostList';

function ManagePostsPage() {
  const [tab, setTab] = useState('notice');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">게시글 관리</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTab('notice')}
          className={`px-4 py-2 rounded-full font-semibold ${
            tab === 'notice' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          공지사항
        </button>
        <button
          onClick={() => setTab('faq')}
          className={`px-4 py-2 rounded-full font-semibold ${
            tab === 'faq' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          FAQ
        </button>
        <button
          onClick={() => setTab('manual')}
          className={`px-4 py-2 rounded-full font-semibold ${
            tab === 'manual' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          사용설명서
        </button>
      </div>

      <PostList type={tab} />
    </div>
  );
}

export default ManagePostsPage;
