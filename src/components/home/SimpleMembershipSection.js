// src/components/SimpleMembershipSection.js
import React from 'react';
import { Link } from 'react-router-dom';

function SimpleMembershipSection() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">멤버십 안내</h2>
        <p className="text-gray-600 text-base md:text-lg mb-8">
          무료부터 프리미엄까지,<br className="md:hidden" />
          당신의 라이프스타일에 맞는 혜택을 선택하세요.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10">
          {/* 베이직 요약 */}
          <div className="bg-gray-50 px-6 py-5 rounded-xl shadow-sm w-full md:w-64">
            <h3 className="text-lg font-bold text-gray-800 mb-1">베이직</h3>
            <p className="text-sm text-gray-500">무료 
              <br/>
              기본 기능 제공</p>
          </div>

          {/* 프리미엄 요약 */}
          <div className="bg-orange-50 px-6 py-5 rounded-xl shadow-md w-full md:w-64 border-2 border-orange-400">
            <h3 className="text-lg font-bold text-orange-600 mb-1">프리미엄</h3>
            <p className="text-sm text-gray-600">월 5,900원
              <br/>
              작품 다운로드, 기기 4대 등록</p>
          </div>
        </div>

        {/* 더보기 버튼 */}
        <Link
          to="/membership"
          className="text-amber-600 text-sm font-semibold px-6 py-3 rounded-full shadow hover:bg-orange-600 hover:text-white transition"
        >
          멤버십 자세히 보기 →
        </Link>
      </div>
    </section>
  );
}

export default SimpleMembershipSection;
