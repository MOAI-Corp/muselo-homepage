// src/components/artist/ArtistApplyGuideSection.js
import React from 'react';

const steps = [
  '아티스트 계정 가입',
  '정산 계좌 등록',
  '작품 등록 및 설명 작성',
  '관리자 검토',
  '승인 및 판매 시작',
];

function ArtistApplyGuideSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-10">서비스 절차</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                {idx + 1}
              </div>
              <p className="mt-2 text-sm text-gray-700 text-center">{step}</p>
              {idx !== steps.length - 1 && (
                <div className="hidden md:block h-1 w-10 bg-orange-300 mx-2 mt-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ArtistApplyGuideSection;
