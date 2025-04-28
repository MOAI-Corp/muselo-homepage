// src/components/artist/ArtistBenefitSection.js
import React from 'react';
import { FaPenNib, FaShieldAlt, FaCoins, FaBullhorn } from 'react-icons/fa';

const benefits = [
  {
    icon: <FaPenNib className="text-orange-500 text-3xl mb-2" />,
    title: '작품 등록 및 판매',
    description: '나만의 작품을 쉽게 등록하고 전 세계 고객에게 판매할 수 있어요.',
  },
  {
    icon: <FaCoins className="text-orange-500 text-3xl mb-2" />,
    title: '정산 시스템',
    description: '판매 수익은 안전한 정산 시스템을 통해 지급됩니다.',
  },
  {
    icon: <FaShieldAlt className="text-orange-500 text-3xl mb-2" />,
    title: '저작권 보호',
    description: '모든 작품은 아티스트의 권리를 보호하는 기반 위에서 운영돼요.',
  },
  {
    icon: <FaBullhorn className="text-orange-500 text-3xl mb-2" />,
    title: '작품 노출 및 홍보',
    description: '홈페이지, 앱, SNS 등을 통해 아티스트 작품을 적극적으로 알립니다.',
  },
];

function ArtistBenefitSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-10">아티스트 혜택</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition text-left"
            >
              {b.icon}
              <h3 className="text-lg font-bold text-gray-800 mb-2">{b.title}</h3>
              <p className="text-sm text-gray-600">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ArtistBenefitSection;
