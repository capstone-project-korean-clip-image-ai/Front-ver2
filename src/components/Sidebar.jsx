import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPaintBrush, FaMagic, FaImage, FaUser, FaComments } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-16 bg-[#1a1a1a] border-r border-zinc-700 py-6 space-y-8 items-center">
      <SidebarLink to="/" icon={<FaImage />} label="생성" active={location.pathname === "/"} />
      <SidebarLink to="/img2img" icon={<FaPaintBrush />} label="편집" active={location.pathname === "/img2img"} />
      <SidebarLink to="/effects" icon={<FaMagic />} label="효과" active={location.pathname === "/effects"} />
      <SidebarLink to="/community" icon={<FaComments />} label="게시판" active={location.pathname === "/community"} />
      <SidebarLink to="/mypage" icon={<FaUser />} label="보관함" active={location.pathname === "/mypage"} />
    </aside>
  );
};

const SidebarLink = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={`flex flex-col items-center text-xs group transition-colors ${
      active ? "text-green-400" : "text-zinc-400 hover:text-white"
    }`}
  >
    <div className="text-2xl">{icon}</div>
    <span className="mt-1 hidden xl:block">{label}</span>
  </Link>
);

export default Sidebar;
