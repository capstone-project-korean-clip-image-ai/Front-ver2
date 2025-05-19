import { useState } from "react";

const LoraSelector = ({ lora, setLora }) => {
  const loras = [
    { value: "none", label: "LoRA 없음" },
    { value: "hanbok", label: "한복 LoRA" },
    { value: "hanok", label: "한옥 LoRA" },
    { value: "hansik", label: "한식 LoRA" },
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
        <span className="text-sm font-medium">
          {loras.find((l) => l.value === lora)?.label || "LoRA 선택"}
        </span>
      </button>

      {isDropdownOpen && (
        <div className="bg-base-200 absolute z-10 mt-2 w-48 rounded-lg border">
          {loras.map((l) => (
            <div
              key={l.value}
              className={`flex cursor-pointer items-center gap-2 p-2 transition-colors hover:bg-gray-100 hover:text-black ${
                lora === l.value ? "bg-gray-200 text-black" : ""
              }`}
              onClick={() => {
                setLora(l.value);
                setIsDropdownOpen(false);
              }}
            >
              <span className="text-sm font-medium">{l.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoraSelector;
