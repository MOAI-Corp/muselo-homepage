import React, { useState, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate('/login');
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 shadow-md backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* 로고 */}
          <Link
            to="/"
            className="text-3xl font-extrabold text-black hover:text-gray-800 transition"
            style={{ fontFamily: 'Cafe24Decobox' }}
            onClick={handleMobileClose}
          >
            Muselo
          </Link>

          {/* PC 메뉴 */}
          <nav className="hidden md:flex gap-8 text-sm font-bold text-gray-700">
            <a href="/#brandstory" className="hover:text-orange-500">브랜드스토리</a>
            <a href="/#productstory" className="hover:text-orange-500">제품</a>
            <Link to="/membership" className="hover:text-orange-500">멤버십</Link>
            <Link to="/support" className="hover:text-orange-500">고객센터</Link>
          </nav>

          {/* 우측 메뉴 */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/artist"
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold text-orange-600 hover:text-orange-500 transition"
            >
              아티스트 도전하기
            </Link>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 hover:text-orange-500 transition"
                >
                  <FiUser className="text-lg" />
                  <FiChevronDown className="text-base" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-md z-50 overflow-hidden">
                    <Link
                      to="/mypage"
                      onClick={handleMobileClose}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FiUser /> 마이페이지
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FiLogOut /> 로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-semibold text-gray-700 hover:text-orange-500 transition"
              >
                로그인
              </Link>
            )}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-2xl text-black focus:outline-none"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {mobileOpen && (
        <div className="absolute top-16 right-0 w-3/4 bg-white shadow-md p-6 md:hidden z-50">
          <nav className="flex flex-col gap-4 text-sm font-bold text-gray-700">
            

      {/* 마이페이지/로그아웃 구역 */}
      {currentUser ? (
        <div className="flex justify-between items-center gap-4">
          <Link
            to="/mypage"
            onClick={handleMobileClose}
            className="flex-1 text-center py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
          >
            마이페이지
          </Link>
          <button
            onClick={handleLogout}
            className="flex-1 text-center py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          onClick={handleMobileClose}
          className="flex-1 text-center py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
        >
          로그인
        </Link>
      )}
      {/* 구분선 */}
      <div className="border-t border-gray-300 my-1" />
            
            <a href="/#brandstory" onClick={handleMobileClose}>브랜드스토리</a>
            <a href="/#productstory" onClick={handleMobileClose}>제품</a>
            <Link to="/membership" onClick={handleMobileClose}>멤버십</Link>
            <Link to="/support" onClick={handleMobileClose}>고객센터</Link>
            <Link to="/artist" className="text-orange-600 hover:text-orange-500" onClick={handleMobileClose}>
              아티스트 도전하기
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
