import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import ReactMarkdown from 'react-markdown';

function SupportNoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [openId, setOpenId] = useState(null); // 어떤 공지 열려 있는지

  useEffect(() => {
    const q = query(
      collection(db, 'homepage_notices'),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotices(result);
    });

    return () => unsub();
  }, []);

  const toggleOpen = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-gray-100">
          <tr>
            <th className="px-4 py-3 w-1/6">번호</th>
            <th className="px-4 py-3">제목</th>
            <th className="px-4 py-3 w-1/4 text-right">등록일</th>
          </tr>
        </thead>
        <tbody>
          {notices.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-8 text-gray-400">
                등록된 공지사항이 없습니다.
              </td>
            </tr>
          ) : (
            notices.map((notice, index) => (
              <React.Fragment key={notice.id}>
                <tr
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleOpen(notice.id)}
                >
                  <td className="px-4 py-3">{notices.length - index}</td>
                  <td className="px-4 py-3">{notice.title}</td>
                  <td className="px-4 py-3 text-right text-gray-500">
                    {new Date(notice.createdAt?.seconds * 1000).toLocaleDateString()}
                  </td>
                </tr>
                {openId === notice.id && (
                  <tr className="bg-white border-b">
                    <td colSpan="3" className="px-4 py-4 text-gray-700">
                      <div className="markdown-body">
                        <ReactMarkdown>{notice.content}</ReactMarkdown>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SupportNoticeBoard;
