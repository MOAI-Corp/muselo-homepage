import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function BuyFloatingButton() {
  const [show, setShow] = useState(false);
  const [hideCTA, setHideCTA] = useState(false);

  useEffect(() => {
    const toggleButton = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleButton);
    return () => window.removeEventListener('scroll', toggleButton);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideCTA(entry.isIntersecting);
      },
      { threshold: 0.7 }
    );

    const promoEl = document.getElementById('promo-section');
    if (promoEl) observer.observe(promoEl);

    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && !hideCTA && (
        <div className="fixed bottom-6 w-full flex justify-center z-50 pointer-events-none">
          <motion.div
            key="buy-button-wrapper"
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              scaleY: 0.1,
              y: 10,
              transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.2,
                delayChildren: 0.15,
                staggerChildren: 0.1,
              },
            }}
            transition={{
              type: 'spring',
              bounce: 0.5,
              duration: 0.8,
            }}
            whileHover={{
              scale: 1.08,
              transition: { type: 'spring', stiffness: 300, damping: 10 },
            }}
            className="bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 text-sm font-semibold flex items-center justify-center pointer-events-auto origin-center overflow-hidden"
          >
            <motion.span
              initial={{ opacity: 1 }}
              exit={{
                opacity: 0,
                y: -10,
                transition: {
                  duration: 0.6,
                  ease: 'easeInOut',
                },
              }}
            >
              <a href 
                ="https://smartstore.naver.com/moai-mall"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white font-semibold"
              >
              🛒 지금 구매하기
              </a>
            </motion.span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default BuyFloatingButton;
