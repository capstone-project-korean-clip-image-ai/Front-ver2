import { NavLink } from "react-router-dom";
import { FaImage, FaEdit } from "react-icons/fa";

const Sidebar = () => {
  const menu = [
    { path: "/generate", label: "이미지\n생성", icon: <FaImage size={24} /> },
    { path: "/inpainting", label: "이미지\n수정", icon: <FaEdit size={24} /> },
  ];

  return (
    <aside className="bg-base-300 flex flex-row items-center justify-center gap-x-12 
      h-16 min-h-16 w-full border-r-2 border-b border-gray-800
      lg:flex-col lg:items-center lg:justify-center lg:gap-x-0 lg:gap-y-12 
      lg:h-full lg:min-h-full lg:w-16 lg:border-b-0 lg:border-r-2">
      {menu.map(({ path, label, icon }) => (
        <NavLink key={path} to={path} className="flex flex-col items-center" title={label}>
          {icon}
          <span className="mt-2 text-xs text-white whitespace-pre-line text-center hidden lg:block">
            {label}
          </span>
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;