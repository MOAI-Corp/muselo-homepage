import React from 'react';
import { FiMessageCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { KAKAO_CHANNEL_CHAT_URL } from '../../constants/config'; // ✅ 추가

function KakaoChatButton() {
  const openKakaoPopup = () => {
    const width = 500;
    const height = 700;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    window.open(
      KAKAO_CHANNEL_CHAT_URL, // ✅ 하드코딩 제거, config 참조
      'kakaoChat',
      `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=no`
    );
  };

  return (
    <motion.button
      onClick={openKakaoPopup}
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: 'spring',
        bounce: 0.5,
        duration: 0.6,
      }}
      whileHover={{
        scale: 1.1,
        transition: { type: 'spring', stiffness: 300, damping: 12 },
      }}
      className="fixed bottom-6 right-6 z-50 bg-yellow-400 hover:bg-yellow-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition"
      aria-label="카카오톡 문의"
    >
      <FiMessageCircle className="text-2xl text-black" />
    </motion.button>
  );
}

export default KakaoChatButton;
