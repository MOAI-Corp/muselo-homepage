import React from 'react';

function Brand() {
  return (
    <section className="py-24 bg-white px-4 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-6">브랜드 스토리</h2>
      <p className="text-gray-700 text-lg leading-relaxed">
        당신의 소중한 순간과 기억을 예술적인 형태로 담아내어,
        일상 속에서 새로운 영감을 찾을 수 있게 도와줍니다.
      </p>
      <p className="text-gray-700 text-lg leading-relaxed mt-6">
        단순한 사진 전시가 아닌, 삶의 이야기를 예술로 표현하는 <span className="font-semibold text-orange-500">muselo</span>는
        당신만의 디지털 갤러리를 만들어 줍니다.
      </p>
      <p className="text-gray-700 text-lg leading-relaxed mt-6">
        muselo와 함께라면 집 안이 작은 미술관이 됩니다.
        가족의 미소, 여행의 추억, 그리고 잊을 수 없는 순간들을 muselo에 담아보세요.
      </p>
    </section>
  );
}

export default Brand;
