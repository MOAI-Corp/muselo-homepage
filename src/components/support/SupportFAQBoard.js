import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import ReactMarkdown from 'react-markdown';

function SupportFAQBoard() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  useEffect(() => {
    const q = query(collection(db, 'homepage_faqs'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFaqs(result);
    });

    return () => unsub();
  }, []);

  const categories = ['전체', ...new Set(faqs.map((faq) => faq.category).filter(Boolean))];
  const filteredFaqs = selectedCategory === '전체'
    ? faqs
    : faqs.filter((faq) => faq.category === selectedCategory);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1 rounded-full text-sm font-medium border ${
              selectedCategory === cat
                ? 'bg-orange-500 text-white border-orange-500'
                : 'text-gray-600 hover:text-orange-500 border-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="divide-y border rounded-lg bg-white shadow-sm">
        {filteredFaqs.length === 0 ? (
          <p className="p-6 text-center text-gray-500">등록된 FAQ가 없습니다.</p>
        ) : (
          filteredFaqs.map((faq, index) => (
            <div key={faq.id}>
              <button
                onClick={() => toggle(index)}
                className="w-full text-left px-6 py-4 font-semibold text-gray-800 hover:bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <span className="text-orange-500 text-sm mr-2">
                    [{faq.category || '일반'}]
                  </span>
                  <span>{faq.question}</span>
                </div>
                <span className="text-gray-400">{openIndex === index ? '▲' : '▼'}</span>
              </button>
              {openIndex === index && (
                <div className="markdown-body text-left px-6 pb-6 pt-2 bg-gray-50">
                    <ReactMarkdown>{faq.answer}</ReactMarkdown>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SupportFAQBoard;