import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-[#121212] border-b border-zinc-800 text-white shadow-md">
      <div className="flex items-center justify-between w-full px-6 h-16">
        {/* 좌측: 로고 */}
        <div className="text-xl font-bold tracking-wide">
          KLIP
        </div>

        {/* 모바일 전용 드롭다운 메뉴 */}
        <div className="lg:hidden dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-sm text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 z-[1] p-2 shadow-lg bg-[#1f1f1f] border border-zinc-700 rounded-lg w-40"
          >
            <li><Link to="/">Generate</Link></li>
            <li><Link to="/img2img">Edit</Link></li>
            <li><Link to="/effects">Effects</Link></li>
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/mypage">MyPage</Link></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
