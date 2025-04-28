// src/components/FrameMountVideoSection.js
import React from 'react';

function FrameMountVideoSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">프레임 장착 방법</h2>
        <p className="text-gray-600 mb-8">
          프레임 교체는 간단합니다. 아래 영상을 통해 손쉽게 따라해보세요.
        </p>

        <div className="w-full max-w-3xl mx-auto aspect-[16/9]">
          <iframe
            src="https://www.youtube.com/embed/E-RFxrJ5AOY"
            title="Muselo Frame Mounting"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-xl shadow-lg w-full h-full"
          />
        </div>

      </div>
    </section>
  );
}

export default FrameMountVideoSection;
