import { useState } from "react";

const ModelSelector = ({ modelOptions, model, setModel }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="flex-1 w-full">
      <button
        onClick={toggleDropdown}
        className="flex w-full h-full bg-base-100 items-center gap-2 rounded-lg border border-gray-600 p-2 shadow-md hover:bg-base-300"
      >
        <img
          src={modelOptions.find((m) => m.value === model)?.thumbnail}
          alt={modelOptions.find((m) => m.value === model)?.label}
          className="h-10 w-10 rounded-md object-cover"
        />
        <span className="text-sm font-medium">
          {modelOptions.find((m) => m.value === model)?.label || "모델 선택"}
        </span>
      </button>

      {isDropdownOpen && (
        <div className="bg-base-200 absolute z-10 mt-2 w-48 rounded-lg border">
          {modelOptions.map((m) => (
            <div
              key={m.value}
              className={`flex cursor-pointer items-center gap-2 p-2 transition-colors hover:bg-gray-100 hover:text-black ${
                model === m.value ? "bg-gray-200 text-black" : ""
              }`}
              onClick={() => {
                setModel(m.value);
                setIsDropdownOpen(false);
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

export default ModelSelector;
