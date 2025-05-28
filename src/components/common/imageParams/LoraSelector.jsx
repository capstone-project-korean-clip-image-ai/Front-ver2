import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const loras = [
  { value: "none", label: "LoRA 없음", desc: "LoRA를 적용하지 않습니다." },
  { value: "hanbok", label: "한복 LoRA", desc: "한복 스타일을 적용합니다.", thumbnail: "/thumbnails/hanbok.png" },
  { value: "hanok", label: "한옥 LoRA", desc: "한옥 스타일을 적용합니다.", thumbnail: "/thumbnails/hanok.png" },
  { value: "hansik", label: "한식 LoRA", desc: "한식 스타일을 적용합니다.", thumbnail: "/thumbnails/hansik.png" },
];

const LoraSelector = ({ lora, setLora }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef(null);
  const [modalStyle, setModalStyle] = useState({});

  const toggleModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      return;
    }
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setModalStyle({
        position: "fixed",
        top: rect.bottom + 8,
        left: rect.left,
        minWidth: rect.width,
        maxWidth: rect.width,
        zIndex: 2000,
        maxHeight: "60vh",
      });
    }
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!isModalOpen) return;
    const handleResize = () => setIsModalOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isModalOpen]);

  const selectedLora = loras.find((l) => l.value === lora);

  const modal = (
    <div style={modalStyle}>
      <div className="bg-base-200 border border-gray-600 rounded-xl shadow-2xl p-6 max-h-[50vh] overflow-y-auto flex flex-col gap-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold">LoRA 선택</span>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {loras.map((l) =>
            l.value === "none" ? (
              <button
                key={l.value}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-all shadow hover:bg-base-300 ${lora === l.value
                    ? "border-primary bg-base-100"
                    : "border-gray-600"
                  }`}
                onClick={() => {
                  setLora(l.value);
                  setIsModalOpen(false);
                }}
              >
                <span className="text-md font-bold">{l.label}</span>
                <span className="text-xs text-gray-400 ml-2">{l.desc}</span>
              </button>
            ) : (
              <button
                key={l.value}
                className={`relative group rounded-lg overflow-hidden border transition-all ${lora === l.value
                    ? "border-primary ring-2 ring-primary"
                    : "border-gray-600"
                  }`}
                style={{ height: 120 }}
                onClick={() => {
                  setLora(l.value);
                  setIsModalOpen(false);
                }}
              >
                <img
                  src={l.thumbnail}
                  alt={l.label}
                  className="w-full h-full object-cover"
                  style={{ minHeight: 120, maxHeight: 120 }}
                />
                {/* 오버레이 */}
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-black opacity-0 group-hover:opacity-60 transition-all">
                  <span className="text-lg font-bold text-white opacity-0 group-hover:opacity-100">
                    {l.label}
                  </span>
                  <span className="text-xs text-gray-200 mt-1 opacity-0 group-hover:opacity-100">
                    {l.desc || "LoRA 설명이 없습니다."}
                  </span>
                </div>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative flex-1">
      <button
        ref={buttonRef}
        onClick={toggleModal}
        className="flex w-full h-full bg-base-100 items-center gap-2 rounded-lg border border-gray-600 p-2 shadow-md hover:bg-base-300"
      >
        {selectedLora?.thumbnail && selectedLora.value !== "none" && (
          <img
            src={selectedLora.thumbnail}
            alt={selectedLora.label}
            className="h-10 w-10 rounded-md object-cover"
          />
        )}
        <span className="text-sm font-medium">
          {selectedLora?.label || "LoRA 선택"}
        </span>
      </button>
      {isModalOpen && createPortal(modal, document.body)}
    </div>
  );
};

export default LoraSelector;