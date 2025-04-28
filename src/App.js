import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProtectedAdminRoute from './routes/ProtectedAdminRoute';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import MembershipPage from './pages/Membership';
import CustomerSupportPage from './pages/CustomerSupportPage';
import ArtistJoinPage from './pages/ArtistJoinPage';

import AdminLayout from './admin/components/AdminLayout';
import AdminLoginPage from './admin/pages/AdminLoginPage';
import AdminDashboardPage from './admin/pages/AdminDashboardPage';
import ManagePostsPage from './admin/pages/ManagePostsPage';
import 'react-quill/dist/quill.snow.css';
import ManageBannerPage from './admin/pages/ManageBannerPage';
import ProductList from './admin/pages/ManageProductList';
import KakaoChatButton from './components/common/KakaoChatButton'; 
import LoginPage from './pages/LoginPage';
import AccountEditPage from './pages/UserPage';
import SignUpPage from './pages/SignUpPage';
import TermsAgreement from './components/auth/TermsAgreement';
import WithdrawalCompletePage from './pages/WithdrawalCompletePage';
import ProtectedRoute from './routes/ProtectedRoute';


function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPage && <Header />}

      <Routes>
        {/* 사용자 페이지 */}
        <Route path="/" element={<Home />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/support" element={<CustomerSupportPage />} />
        <Route path="/artist" element={<ArtistJoinPage />} />
        <Route path="/login" element={<LoginPage />} />  
        {/* 🔥 마이페이지는 보호처리 */}
        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <AccountEditPage />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/terms" element={<TermsAgreement />} />
        <Route path="/withdrawal-complete" element={<WithdrawalCompletePage />} />
        

        {/* 어드민 로그인만 예외 처리 */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* 어드민 레이아웃 + 중첩 페이지 */}
        <Route
          path="/admin/*"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="posts" element={<ManagePostsPage />} />
          <Route path="banners" element={<ManageBannerPage />} />
          <Route path="products" element={<ProductList />} />
          {/* 여기에 추가적인 어드민 페이지들 계속 확장 가능 */}
        </Route>
      </Routes>

      {!isAdminPage && <Footer />}
      {!isAdminPage && <KakaoChatButton />} 
    </>
  );
}

export default App;
