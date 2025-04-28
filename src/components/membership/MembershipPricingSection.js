// src/components/MembershipPricingSection.js
import React from 'react';

function MembershipPricingSection() {
  return (
    <section id="membership" className="py-24">
      <div className="max-w-6xl mx-auto px-4">

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm text-center shadow bg-white rounded-xl overflow-hidden">
            <colgroup>
              <col className="w-[120px]" /> {/* 항목 열 */}
              <col className="w-[180px]" />
              <col className="w-[180px]" />
              <col className="w-[180px]" />
            </colgroup>
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-4 px-4 font-semibold text-left bg-white">항목</th>
                <th className="py-4 px-4 font-bold text-gray-800">베이직</th>
                <th className="py-4 px-4 font-bold text-orange-600 bg-orange-50 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2">
                    <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                      추천
                    </span>
                  </div>
                  프리미엄
                </th>
                <th className="py-4 px-4 font-bold text-gray-400">VIP<br /><span className="text-xs">(준비 중)</span></th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {[
                ['요금', '무료', '5,900원/월 (연 4,900원)', '9,900원/월 (연 7,900원)'],
                ['광고', '포함', '없음', '없음'],
                ['Weekly Art', '제공', '제공', '제공'],
                ['저장 공간', '5GB', '20GB', '50GB'],
                ['기기 등록', '2대', '4대', '제한 없음'],
                ['할인 혜택', '없음', '20%', '50%'],
                ['광고 없는 포스트', '해당 없음', '1장 제공', '3장 제공'],
              ].map(([label, basic, premium, vip], i) => (
                <tr key={i} className="border-t border-gray-200">
                  <td className="py-3 px-6 text-left font-medium bg-gray-50">{label}</td>
                  <td className="py-3 px-6">{basic}</td>
                  <td className="py-3 px-6 bg-orange-50 font-semibold">{premium}</td>
                  <td className="py-3 px-6 text-gray-400 italic">{vip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-400 text-center mt-4">* VIP 요금제는 현재 준비 중입니다.</p>
      </div>
    </section>
  );
}

export default MembershipPricingSection;
