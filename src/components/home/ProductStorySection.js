// src/components/ProductStorySection.js
import React from 'react';

function ProductStorySection() {
  return (
    <section id="productstory" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* 이미지 */}
        <div className="w-full md:w-1/2">
          <img
            src="/products/canvas-main.png"
            alt="Muselo Canvas"
          />
        </div>

        {/* 텍스트 */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Muselo Canvas</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
              디지털 아트, 사진, 추억을 전시할 수 있는 감성적인 프레임형 디스플레이.
              <br />
              모던하고 슬림한 디자인으로 어떤 인테리어에도 어울립니다.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            결혼사진, 아이의 성장기, 반려동물과의 일상까지 —  
            <br />
            Muselo는 당신의 삶을 감성적으로 기록하고 보여주는 공간입니다.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProductStorySection;
