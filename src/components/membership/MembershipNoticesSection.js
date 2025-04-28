import React from 'react';
import { FaCrown } from 'react-icons/fa';

function MembershipNoticesSection() {
  const notices = [
    {
      icon: <FaCrown />,
      iconColor: 'bg-yellow-100 text-yellow-600',
      title: '연간 구독 시 최대 25% 할인 혜택!',
      highlights: [
        '요금제 변경은 마이페이지에서 자유롭게 이용할 수 있습니다.',
        '요금제 변경 시 환불 금액은 월 단위로 계산됩니다.',
      ],
      footnote:
        '예시: 프리미엄 1년 결제 후 6개월 이하 사용 시 → 58,800원 - 6개월 사용 29,400원 공제 후 환불',
    },
    {
      icon: <FaCrown />,
      iconColor: 'bg-blue-100 text-blue-600',
      title: '넉넉한 저장 공간, 안전한 사진 보관',
      highlights: [
        '업로드된 사진은 보안 시스템을 통해 안전하게 보관됩니다.',
        '회원 탈퇴 시 모든 데이터는 즉시 일괄 삭제됩니다.',
      ],
    },
    {
      icon: <FaCrown />,
      iconColor: 'bg-red-100 text-red-600',
      title: '유명 작가의 작품을 감상하고 소장하세요!',
      highlights: [
        '예술 작품의 콘텐츠를 저렴한 가격에 소장할 수 있습니다.',
        '멤버십 등급에 따라 할인 혜택이 제공됩니다.',
      ],
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">멤버십 혜택 안내</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {notices.map((notice, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full ${notice.iconColor}`}
                >
                  {notice.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{notice.title}</h3>
              </div>

              <ul className="space-y-2 text-gray-700 text-sm leading-relaxed pl-4 list-disc">
                {notice.highlights.map((text, i) => (
                  <li key={i}>{text}</li>
                ))}
              </ul>

              {notice.footnote && (
                <div className="mt-4 bg-white text-xs text-gray-500 border rounded-md p-3">
                  {notice.footnote}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MembershipNoticesSection;
