// src/admin/components/AdminLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <Outlet /> {/* 여기에 각 admin 하위 페이지가 렌더링됨 */}
      </main>
    </div>
  );
}

export default AdminLayout;
