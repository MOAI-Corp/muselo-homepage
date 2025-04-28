// src/components/support/SupportManualBoard.js
import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

function SupportManualBoard() {
  const [manuals, setManuals] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'homepage_manuals'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setManuals(result);
    });

    return () => unsub();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {manuals.length === 0 ? (
        <p className="text-gray-500">등록된 사용설명서가 없습니다.</p>
      ) : (
        manuals.map((manual) => (
          <div
            key={manual.id}
            className="border rounded-lg p-5 bg-white shadow-sm flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{manual.productName}</h3>
              <p className="text-sm text-gray-500">
                {new Date(manual.createdAt?.seconds * 1000).toLocaleDateString()}
              </p>
            </div>
            <a
              href={manual.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm font-semibold"
            >
              열기
            </a>
          </div>
        ))
      )}
    </div>
  );
}

export default SupportManualBoard;
