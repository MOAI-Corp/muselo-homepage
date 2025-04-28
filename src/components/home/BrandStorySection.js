// src/components/BrandStorySection.js
import React from 'react';

function BrandStorySection() {
  return (
    <section id="brandstory" className="py-24 bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-16">
          당신의 삶이 곧 예술입니다
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          당신의 소중한 순간과 기억을 예술적인 형태로 담아내어, 
          <br/> 
          단순한 사진 전시가 아닌, 삶의 이야기를 예술로 표현합니다.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          Muselo와 함께
          <br/> 
          가족의 미소, 여행의 추억, 그리고 잊을 수 없는 순간들로
          <br/> 
          집 안을 작은 미술관으로 만들어보세요.
        </p>
      </div>
    </section>
  );
}

export default BrandStorySection;
