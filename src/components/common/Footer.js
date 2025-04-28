// src/components/common/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* 좌측: 로고 및 소개 */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500 mb-2">Muselo</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            당신의 소중한 순간을 예술로 담아내는 
            <br/>
            Muselo입니다.
          </p>
        </div>

        {/* 중앙: 메뉴 링크 */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-gray-300">사이트</h3>
          <a href="/" className="text-sm text-gray-400 hover:text-orange-500">홈</a>
          <a href="/membership" className="text-sm text-gray-400 hover:text-orange-500">멤버십</a>
          <a href="/support" className="text-sm text-gray-400 hover:text-orange-500">고객센터</a>
        </div>

        {/* 우측: 연락처 및 사업자 정보 */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-gray-300">문의</h3>
          <p className="text-sm text-gray-400">이메일: contact@muselo.co.kr</p>
          <p className="text-sm text-gray-400">주소: 충남 천안시 서북구 백석공단1로 70</p>
        </div>

        {/* 추가 정보: 사업자 등록번호 등 */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-gray-300">사업자 정보</h3>
          <p className="text-sm text-gray-400">상호명: 주식회사 모아이</p>
          <p className="text-sm text-gray-400">대표자명: 양경모</p>
          <p className="text-sm text-gray-400">사업자등록번호: 344-86-01655</p>
          <p className="text-sm text-gray-400">통신판매업 신고번호: 2020-충남천안-1514</p>
        </div>
      </div>

      {/* 하단 저작권 */}
      <div className="mt-12 text-center text-xs text-gray-500 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Muselo. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
