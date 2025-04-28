import React, { useEffect, useState } from 'react';
import { FiChevronUp } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="scroll-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          whileHover={{
            scale: 1.1,
            transition: { type: 'spring', stiffness: 300, damping: 12 },
          }}
          transition={{
            type: 'spring',
            bounce: 0.5,
            duration: 0.6,
          }}
          className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-gray-700 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition"
          aria-label="맨 위로 이동"
        >
          <FiChevronUp className="text-2xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTopButton;
