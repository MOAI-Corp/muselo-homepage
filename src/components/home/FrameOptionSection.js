// src/components/FrameOptionSection.js
import React from 'react';

function FrameOptionSection() {
  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">프레임 액세서리</h3>
        <p className="text-gray-500 text-lg mb-12">
          Muselo Canvas에 다양한 우드 프레임을 더해,  
          당신만의 분위기를 연출해보세요.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* 내추럴 우드 */}
          <div className="p-6 transition text-center">
            <img src="/products/lightwood.png" alt="Natural Wood Frame" className="w-full h-full object-cover rounded-xl mb-4" />
            <h4 className="text-xl font-semibold text-orange-600 mb-2">내추럴 우드 프레임</h4>
            <p className="text-gray-600 text-md mb-4">
              밝고 따뜻한 분위기를 만들어주는 자연스러운 우드 컬러.
            </p>
          </div>

          {/* 월넛 우드 */}
          <div className="p-6 transition text-center">
            <img src="/products/darkwood.png" alt="Walnut Wood Frame" className="w-full h-full object-cover rounded-xl mb-4" />
            <h4 className="text-xl font-semibold text-orange-600 mb-2">월넛 우드 프레임</h4>
            <p className="text-gray-600 text-md mb-4">
              고급스러운 짙은 톤의 프레임으로 차분하고 깊은 공간 연출이 가능합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FrameOptionSection;
