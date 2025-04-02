import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="w-full shadow-lg navbar">
      <div className="flex items-center justify-between w-full max-w-screen-xl px-4 mx-auto">
        <div className="flex-1">
          <a className="text-xl normal-case btn btn-ghost">KLIP</a>
        </div>
        <div className="flex-none">
          <ul className="p-0 menu menu-horizontal">
            <li><Link to="/">이미지 생성</Link></li>
            <li><Link to="/img2img">이미지 수정</Link></li>
            <li><Link to="/community">게시판</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
