import React from 'react';

function ArtistIntroSection() {
  return (
    //백그라운드 이미지 넣기//
    <section
      className="relative bg-gray-100 text-white"
    >
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 flex items-center min-h-[800px]">
        <div className="max-w-xl space-y-6">
          <p className="text-sm text-white/60 tracking-widest">#Muselo와 함께 성장하기</p>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            아티스트가 되어
            <br />
            수익을 창출하세요
            </h1>


          <p className="text-lg md:text-xl text-white/90">
            Muselo는 당신의 창작 활동이 
            <br/>
            더 많은 공간에서 감동을 전할 수 있도록
            <br />
            단순한 콘텐츠 플랫폼을 넘어
            <br/>
            아티스트와 함께 성장하는 브랜드가 되고자 합니다.
          </p>

          <a
            href="#artistbenefit"
            className="inline-block bg-orange-500 text-white font-semibold px-6 py-3 rounded-2xl shadow-md hover:bg-orange-600 transition"
          >
            아티스트 혜택 알아보기
          </a>
        </div>
      </div>
    </section>
  );
}

export default ArtistIntroSection;
