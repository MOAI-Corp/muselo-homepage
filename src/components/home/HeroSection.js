import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase'; // ✅ 경로는 프로젝트에 맞게 조정
/*
const slides = [
  {
    title: '신혼부부의 추억',
    subtitle: '#웨딩사진',
    contents: '소중한 순간을 액자 속에 담아 함께 간직하세요.',
    image: '/hero/wedding.jpg',
  },
  {
    title: '우리 아이의 성장',
    subtitle: '#100일',
    contents: '매일매일 자라나는 아이의 순간을 따뜻하게 기록하세요.',
    image: '/hero/kids.jpg',
  },
  {
    title: '반려동물과 함께',
    subtitle: '#펫사진',
    contents: '사랑스러운 반려동물과의 일상을 예술처럼 전시해보세요.',
    image: '/hero/pet.jpg',
  },
];
*/

function HeroSection() {
  const [slides, setSlides] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'homepage_banners'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const banners = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSlides(banners);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
        setFade(true);
      }, 300);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides]);

  if (slides.length === 0) return null;

  const activeSlide = slides[activeIndex];

  return (
    <section
      id="home"
      className="relative bg-cover bg-center bg-no-repeat text-white transition-all duration-500"
      style={{ backgroundImage: `url('${activeSlide.imageUrl}')` }}
    >
      <div className="absolute inset-0 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 flex items-center min-h-[800px]">
        <div
          className={`max-w-xl space-y-6 transition-opacity duration-700 ${fade ? 'opacity-100' : 'opacity-0'}`}
        >
          <p className="text-sm text-white/60 tracking-widest">{activeSlide.subtitle || ''}</p>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            {activeSlide.title}
          </h1>

          <p className="text-lg md:text-xl text-white/90">
            {activeSlide.contents || ''}
          </p>
          <a
            href={activeSlide.linkUrl || '#productstory'}
            className="inline-block bg-orange-500 text-white font-semibold px-6 py-3 rounded-2xl shadow-md hover:bg-orange-600 transition"
          >
            Muselo Canvas 알아보기
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6 z-10">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => {
              setFade(false);
              setTimeout(() => {
                setActiveIndex(idx);
                setFade(true);
              }, 300);
            }}
            className={`text-sm tracking-wide transition duration-200 ${
              activeIndex === idx
                ? 'text-white font-bold underline underline-offset-4'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            {slide.title}
          </button>
        ))}
      </div>
    </section>
  );
}

export default HeroSection;
