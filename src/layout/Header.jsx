import React from "react";
import { Link } from "react-router-dom";

const menuItems = [
  { to: "/", label: "이미지 생성" },
  { to: "/style", label: "스타일 변경" },
  { to: "/img2img", label: "이미지 수정" },
  { to: "/community", label: "게시판" },
];

const Header = () => {
  return (
    <header className="w-full shadow-lg navbar bg-base-100">
      <div className="flex items-center justify-between w-full max-w-screen-xl px-4 mx-auto">
        <div className="flex-1">
          <a className="text-xl normal-case btn btn-ghost">KLIP</a>
        </div>
        {/* 가로 메뉴 (큰 화면) */}
        <div className="flex-none hidden lg:block">
          <ul className="p-0 menu menu-horizontal">
            {menuItems.map(({ to, label }) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
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
              className="p-2 mt-3 shadow menu dropdown-content bg-base-100 rounded-box w-52"
            >
              {menuItems.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
