// src/pages/ArtistJoinPage.js
import React from 'react';
import { motion } from 'framer-motion';



function ArtistJoinPage() {
  return (
    <div className="h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-8 py-12  max-w-xl"
      >
        <h1 className="text-5xl font-extrabold text-orange-500 mb-6">Coming Soon...</h1>
        <p className="text-lg text-gray-700 mb-2">아티스트 가입 페이지가 준비중입니다.</p>
        <p className="text-lg text-gray-600">조금만 기다려주세요!</p>

        {/* 선택 사항: 홈으로 이동 버튼 */}
        <div className="mt-8">
          <a
            href="/"
            className="inline-block px-6 py-2 text-sm font-bold text-orange-600 border border-orange-600 rounded-xl hover:bg-orange-50 transition"
          >
            홈으로 돌아가기
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default ArtistJoinPage;




/* 준비중
function ArtistJoinPage() {
  return (
    <div className="bg-white text-gray-800">
      <FadeInWhenVisible>
        <ArtistIntroSection />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.1}>
        <ArtistBenefitSection />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.2}>
        <ArtistApplyGuideSection />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.3}>
        <ArtistCautionSection />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.4}>
        <ArtistApplyCTA />
      </FadeInWhenVisible>
    </div>
  );
}

export default ArtistJoinPage;

*/