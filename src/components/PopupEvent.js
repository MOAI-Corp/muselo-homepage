import React, { useState, useEffect } from 'react';

function SignupPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 페이지 로드 후 2초 뒤에 팝업 표시 (너무 갑작스럽지 않게)
    const timer = setTimeout(() => {
      setShow(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-2xl relative text-center">
        {/* 닫기 버튼 */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-orange-600 mb-2">🎁 신규 회원 혜택</h2>
        <p className="text-gray-700 text-sm mb-4">
          지금 회원가입하면 <span className="font-bold text-orange-500">3만원 쿠폰</span>을 드려요!
        </p>

        <a
          href="#membership"
          className="inline-block bg-orange-500 text-white font-semibold px-6 py-2 rounded-xl hover:bg-orange-600 transition"
        >
          가입하고 혜택 받기
        </a>
      </div>
    </div>
  );
}

export default SignupPopup;
