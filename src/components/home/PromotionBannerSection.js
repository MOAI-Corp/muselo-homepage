import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function PromotionBannerSection() {
  const [showBuyText, setShowBuyText] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBuyText(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    const promoEl = document.getElementById('promo-section');
    if (promoEl) observer.observe(promoEl);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="promo-section"
      className="bg-orange-500 py-10 text-center text-white relative"
    >
      <h3 className="text-lg md:text-xl font-semibold tracking-wide mb-8">
        🎁 지금 즉시, <span className="font-bold underline">5만원 할인</span> 받고 Muselo Canvas를 구매하세요!
      </h3>

      <div className="inline-block bg-white text-orange-500 font-semibold py-3 rounded-full shadow-md hover:bg-gray-100 transition px-4">
        <AnimatePresence mode="wait">
          <motion.span
            key={showBuyText ? 'buy' : 'click'}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            transition={{
              type: 'spring',
              bounce: 0.5,
              duration: 0.5,
            }}
            className="block"
          >
            {showBuyText ? (
              <a
                href="https://smartstore.naver.com/moai-mall"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 font-semibold"
              >
                🛒 지금 구매하기
              </a>
            ) : (
              '🛒 지금 구매하기'
            )}
          </motion.span>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default PromotionBannerSection;
