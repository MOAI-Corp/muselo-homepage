// src/admin/components/AdminSidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (err) {
      console.error('로그아웃 실패:', err);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  return (
    <aside className="w-64 bg-white shadow h-screen p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6">Muselo 관리자 페이지</h2>
        <nav className="flex flex-col space-y-4">
          <Link to="/admin" className="text-gray-700 hover:text-orange-500 font-medium">대시보드 홈</Link>
          <Link to="/admin/posts" className="text-gray-700 hover:text-orange-500">공지/FAQ 관리</Link>
          <Link to="/admin/banners" className="text-gray-700 hover:text-orange-500">배너 관리</Link>
          <Link to="/admin/products" className="text-gray-700 hover:text-orange-500">제품 관리</Link>
        </nav>

        <div className="mt-6 border-t pt-4">
          <Link to="/seller/admin" className="text-gray-700 hover:text-orange-500 font-medium">
            셀러 관리 페이지
          </Link>
        </div>
        <div className="mt-2">
          <Link to="/" className="text-gray-700 hover:text-orange-500 font-medium">
            홈페이지로 돌아가기
          </Link>
        </div>
      </div>

      <div className="pt-6">
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-700 font-medium"
        >
          로그아웃
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
