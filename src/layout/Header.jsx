import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full shadow-lg navbar bg-base-100">
      <div className="flex items-center justify-between w-full max-w-(--breakpoint-xl) px-4 mx-auto">
        <div className="flex-1">
          <a className="text-xl normal-case btn btn-ghost">KLIP</a>
        </div>
        {/* 가로 메뉴 (큰 화면) */}
        <div className="flex-none hidden lg:block">
          <ul className="p-0 menu menu-horizontal">
            <li>
              <Link to="/">이미지 생성</Link>
            </li>
            <li>
              <Link to="/img2img">이미지 수정</Link>
            </li>
            <li>
              <Link to="/community">게시판</Link>
            </li>
          </ul>
        </div>
        {/* 드롭다운 메뉴 (작은 화면) */}
        <div className="flex-none lg:hidden">
          <div className="dropdown dropdown-end">
            <button className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>{" "}
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="p-2 mt-3 shadow-2xs menu dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">이미지 생성</Link>
              </li>
              <li>
                <Link to="/img2img">이미지 수정</Link>
              </li>
              <li>
                <Link to="/community">게시판</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
