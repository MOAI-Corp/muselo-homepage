// src/components/artist/ArtistApplyCTA.js
import React from 'react';

function ArtistApplyCTA() {
  return (
    <section className="py-16 bg-orange-100">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          지금 아티스트로 등록하고 작품을 판매해보세요!
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          본인의 작품을 더 많은 사람에게 선보이고, 수익을 만들어보세요.
        </p>
        <button
          className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-orange-600 transition"
          onClick={() => {}}
        >
          판매자 계정 생성하기
        </button>
      </div>
    </section>
  );
}

export default ArtistApplyCTA;
