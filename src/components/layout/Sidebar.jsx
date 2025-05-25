import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menu = [
    { path: "/generate", label: "이미지 생성", icon: "🖋️" },
    { path: "/inpainting", label: "이미지 수정", icon: "🩹" },
  ];

  return (
    <aside className="bg-base-300 flex h-10 w-full flex-row items-center justify-center border-r-2 border-b border-gray-800 lg:h-full lg:w-15 lg:flex-col">
      {menu.map(({ path, label, icon }) => (
        <NavLink key={path} to={path} className={() => `mb-6`} title={label}>
          {icon}
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
