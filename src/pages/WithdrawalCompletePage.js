import React from 'react';
import { Link } from 'react-router-dom';

function WithdrawalCompletePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-500">탈퇴 완료</h2>
        <p className="text-gray-700 mb-6">
          회원 탈퇴 요청이 완료되었습니다.<br />
          저장된 정보는 14일 이내 모두 삭제됩니다.
        </p>
        <Link
          to="/"
          className="inline-block bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
        >
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}

export default WithdrawalCompletePage;
