import React, { useEffect, useState, useMemo } from 'react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import ManualUploadModal from './ManualUploadModal';
import PostEditorModal from './PostEditorModal';
import { ref, deleteObject } from 'firebase/storage';
import ReactMarkdown from 'react-markdown';

function PostList({ type }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [openId, setOpenId] = useState(null);

  const toggleOpen = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  // ✅ 수정: collectionName을 useMemo로 최적화
  const collectionName = useMemo(() => {
    return type === 'notice'
      ? 'homepage_notices'
      : type === 'faq'
      ? 'homepage_faqs'
      : 'homepage_manuals';
  }, [type]);

  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(result);
      setLoading(false);
    });
    return () => unsub();
  }, [collectionName]); // ✅ 수정: collectionName 의존성 추가

  const handleDelete = async (id, fileUrl) => {
    const confirm = window.confirm('정말로 삭제하시겠습니까?');
    if (!confirm) return;

    await deleteDoc(doc(db, collectionName, id));

    if (fileUrl) {
      try {
        const decodedUrl = decodeURIComponent(fileUrl.split('?')[0]);
        const pathStart = decodedUrl.indexOf('/o/') + 3;
        const fullPath = decodedUrl.slice(pathStart);
        const fileRef = ref(storage, fullPath);
        await deleteObject(fileRef);
      } catch (err) {
        console.warn('Storage 삭제 실패:', err.message);
      }
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          {type === 'notice' ? '공지사항' : type === 'faq' ? 'FAQ' : '사용설명서'}
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm font-semibold"
        >
          새 글 작성
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">불러오는 중...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-400">게시글이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border-b border-gray-200 last:border-b-0">
              <button
                onClick={() => toggleOpen(post.id)}
                className="w-full text-left px-4 py-3 flex justify-between items-center"
              >
                <span className="font-semibold text-gray-800">
                  {post.title || post.question || post.productName}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(post.createdAt?.seconds * 1000).toLocaleDateString()}
                </span>
              </button>

              {openId === post.id && (
                <div className="px-4 pb-6 pt-2 border-t border-gray-200 rounded-b-md">
                  {/* 본문 영역 */}
                  {type !== 'manual' && (
                    <div className="space-y-4">
                      <div
                        className="markdown-body pt-4 pb-4"
                        style={{ maxHeight: '300px', overflowY: 'auto' }}
                      >
                        <ReactMarkdown>{post.content || post.answer}</ReactMarkdown>
                      </div>

                      {/* 버튼 영역 */}
                      <div className="flex justify-end space-x-3 pt-2 border-gray-200">
                        <button
                          onClick={() => {
                            setSelectedPost(post);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(post.id, post.fileUrl)}
                          className="text-red-500 hover:text-red-700 font-medium text-sm"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* 모달 영역 */}
      {type !== 'manual' && (
        <PostEditorModal
          isOpen={isModalOpen || selectedPost !== null}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPost(null);
          }}
          type={type}
          defaultData={selectedPost}
        />
      )}

      {type === 'manual' && (
        <ManualUploadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default PostList;
