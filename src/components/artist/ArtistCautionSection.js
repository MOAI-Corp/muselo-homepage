// src/components/artist/ArtistCautionSection.js
import React, { useState } from 'react';

const basicCautions = [
  '등록 작품은 아티스트 본인의 창작물이거나, 상업적 이용에 문제가 없어야 합니다.',
  '불법 도용, 저작권 침해 등이 발생할 경우 모든 책임은 아티스트에게 있습니다.',
  '작품 가격은 지나치게 낮거나 과도하게 높게 설정하지 않도록 유의해주세요.',
  'Muselo는 콘텐츠 품질 유지를 위해 등록 작품에 대한 검토 및 승인 절차를 거칩니다.',
];

const detailedCautions = [

  'Muselo 앱의 판매자 계정은 소비자 계정과 분리되어 관리됩니다. 소비자용 앱을 체험하고 싶으신 분은 소비자 앱에서 별도로 회원가입 해주세요.',
  '판매자 계정은 아티스트 본인만 사용할 수 있으며, 타인에게 양도할 수 없습니다.',
  '컨텐츠 등록 시, 작품의 모든 저작권은 작가 본인에게 있으며ㅓ, Muselo는 해당 작품을 판매할 수 있는 권한을 부여받습니다. 단, Muselo 앱과 제품의 영역에 한정적으로 컨텐츠가 공개되거나 전시될 수 있습니다.',
  '작품 등록 시, 컨텐츠 가격은 실물 제품의 가격이 아닌 해당 컨텐츠의 전시 (컨텐츠 구매자가 보유한 제품 내에 디스플레이할 권리)에 해당하는 금액을 책정해주시기 바랍니다.',
  '실물 작품의 판매나 양도 등으로 인해 저작권자가 변경된 경우, 판매 중단 신청을 필수로 해주시기 바랍니다. 판매 중단 신청을 하지 않을 경우, 발생하는 문제에 대해서는 Muselo가 책임지지 않습니다.',
  '판매자 계정은 언제든지 판매 중단 신청 및 탈퇴를 진행할 수 있습니다. 이 경우 서버 동기화 시점에 일반 사용자들은 해당 컨텐츠를 더이상 보거나 구매할 수 없으나, 이미 구매한 사용자들은 해당 컨텐츠를 계속 보유할 수 있습니다.',
  'Muselo의 정산시스템은 결제대행사의 자동 통계를 기반으로 정산됩니다. 따라서, 판매자 본인이 직접 정산을 요청할 필요는 없습니다. 단, 정산 시점에 판매자 본인의 계좌정보가 정확히 등록되어 있어야 하며, 계좌정보가 잘못된 경우 발생하는 문제에 대해서는 Muselo가 책임지지 않습니다.',
  'Muselo는 판매자 본인의 계좌정보를 제3자에게 제공하지 않으며, Muselo의 정책에 따라 판매자 본인의 계좌정보를 안전하게 관리합니다. 단, 결제대행사와의 계약에 따라 Muselo가 제공하는 서비스에 한정하여 판매자 본인의 계좌정보가 사용될 수 있습니다.',
  '작가의 표현에 따라 컨텐츠는 선정성, 폭력성, 잔인함 등의 민감성 정보를 포함할 수 있습니다. 이 경우, 업로드 과정에서 민감성 정보 포함여부를 선택해주셔야 합니다. 해당 사항을 사전에 선택하지 않은 경우, 검토 과정에서 반려될 수 있습니다.',
];

function ArtistCautionSection() {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">판매자 주의사항</h2>

        {/* 기본 주의사항 */}
        <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside mb-6">
          {basicCautions.map((text, i) => (
            <li key={i}>{text}</li>
          ))}
        </ul>

        {/* 펼치기 버튼 */}
        <div className="text-center">
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="text-sm text-orange-600 font-semibold underline underline-offset-4"
          >
            {showDetail ? '상세 주의사항 닫기' : '상세 주의사항 펼치기'}
          </button>
        </div>

        {/* 상세 주의사항 */}
        {showDetail && (
          <ul className="mt-6 space-y-3 text-sm text-gray-600 list-disc list-inside bg-gray-50 rounded-lg p-4 border border-gray-200">
            {detailedCautions.map((text, i) => (
              <li key={i}>{text}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default ArtistCautionSection;

