import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menu = [
    { path: "/txt2img", label: "텍스트 → 이미지", icon: "🖋️" },
    { path: "/img2img", label: "이미지 → 이미지", icon: "🖼️" },
    { path: "/inpainting", label: "이미지 복원", icon: "🩹" },
  ];

  return (
    <aside className="flex h-full w-20 flex-col items-center border-r bg-gray-100 py-4">
      {menu.map(({ path, label, icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `mb-6 text-2xl ${isActive ? "text-blue-500" : "text-gray-500"}`
          }
          title={label}
        >
          {icon}
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
