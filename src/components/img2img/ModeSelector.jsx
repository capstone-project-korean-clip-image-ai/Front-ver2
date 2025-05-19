import { useState } from "react";

const ModeSelector = ({ img2imgMode, setImg2imgMode }) => {
  const modes = [
    {
      value: "edge",
      label: "Edge Detection",
      thumbnail: "/sample.jpeg", // public 폴더에 저장된 임의의 이미지
    },
    {
      value: "pose",
      label: "Pose Estimation",
      thumbnail: "/sample.jpeg", // public 폴더에 저장된 임의의 이미지
    },
    {
      value: "filter",
      label: "Filter Application",
      thumbnail: "/sample.jpeg", // public 폴더에 저장된 임의의 이미지
    },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 rounded-lg border p-2 shadow-md hover:bg-gray-100"
      >
        <img
          src={modes.find((m) => m.value === img2imgMode)?.thumbnail}
          alt={modes.find((m) => m.value === img2imgMode)?.label}
          className="h-10 w-10 rounded-md object-cover"
        />
        <span className="text-sm font-medium">
          {modes.find((m) => m.value === img2imgMode)?.label || "모드 선택"}
        </span>
      </button>

      {isDropdownOpen && (
        <div className="bg-base-200 absolute z-10 mt-2 w-48 rounded-lg border">
          {modes.map((m) => (
            <div
              key={m.value}
              className={`flex cursor-pointer items-center gap-2 p-2 transition-colors hover:bg-gray-100 hover:text-black ${
                img2imgMode === m.value ? "bg-gray-200 text-black" : ""
              }`}
              onClick={() => {
                setImg2imgMode(m.value); // 선택된 모드 업데이트
                setIsDropdownOpen(false); // 드롭다운 닫기
              }}
            >
              <img
                src={m.thumbnail}
                alt={m.label}
                className="h-8 w-8 rounded-md object-cover"
              />
              <span className="text-sm font-medium">{m.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModeSelector;
