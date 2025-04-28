import React, { useState } from 'react';
import SupportNoticeBoard from '../components/support/SupportNoticeBoard';
import SupportFAQBoard from '../components/support/SupportFAQBoard';
import SupportManualBoard from '../components/support/SupportManualBoard';
import { AnimatePresence, motion } from 'framer-motion';

function CustomerSupportPage() {
  const [tab, setTab] = useState('notice');

  const renderTabContent = () => {
    switch (tab) {
      case 'notice':
        return <SupportNoticeBoard />;
      case 'faq':
        return <SupportFAQBoard />;
      case 'manual':
        return <SupportManualBoard />;
      default:
        return null;
    }
  };

  return (
    <section className="bg-gradient-to-br from-orange-50 to-white bg-cover bg-center bg-no-repeat text-black py-32 text-center">
      <div className="px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">고객 센터</h1>
        <p className="text-md md:text-lg font-light">
          고객님을 위한 지원 센터입니다.<br />
          자주 묻는 질문과 사용 설명서를 확인해 보세요.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-24">
        <div className="flex justify-center items-center gap-8 mb-10 border-b border-gray-300 pb-4">
          {['notice', 'faq', 'manual'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-semibold transition-all ${
                tab === t
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-500'
              }`}
            >
              {t === 'notice' ? '공지사항' : t === 'faq' ? 'FAQ' : '사용설명서'}
            </button>
          ))}
        </div>

        {/* AnimatePresence for smooth tab content transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default CustomerSupportPage;
