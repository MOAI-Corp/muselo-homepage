import React from 'react';

function TermsAgreement({
  agreeAll,
  agreeTerms,
  agreeMarketing,
  onAgreeAll,
  onAgreeTerms,
  onAgreeMarketing,
  termsError,
}) {
  return (
    <div className="space-y-2 mt-6">
      {/* 전체 동의 */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="agreeAll"
          checked={agreeAll}
          onChange={(e) => onAgreeAll(e.target.checked)}
        />
        <label htmlFor="agreeAll" className="font-semibold text-gray-800">
          전체 약관에 동의합니다.
        </label>
      </div>

      {/* 필수 약관 */}
      <div className="flex items-center gap-2 pl-4">
        <input
          type="checkbox"
          id="terms"
          checked={agreeTerms}
          onChange={(e) => onAgreeTerms(e.target.checked)}
        />
        <label htmlFor="terms" className="text-sm text-gray-700">
          (필수) 개인정보처리방침에 동의합니다.
        </label>
        <a
          href="/terms.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-orange-600 underline"
        >
          보기
        </a>
        
      </div>

      {/* 선택 약관 */}
      <div className="flex items-center gap-2 pl-4">
        <input
          type="checkbox"
          id="marketing"
          checked={agreeMarketing}
          onChange={(e) => onAgreeMarketing(e.target.checked)}
        />
        <label htmlFor="marketing" className="text-sm text-gray-700">
          (선택) 마케팅 수신 동의
        </label>
        <a
          href="/marketing.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-orange-600 underline"
        >
          보기
        </a>
      </div>

      {/* 에러 메시지 */}
      {termsError && <p className="text-red-500 text-sm mt-1">{termsError}</p>}
    </div>
  );
}

export default TermsAgreement;
