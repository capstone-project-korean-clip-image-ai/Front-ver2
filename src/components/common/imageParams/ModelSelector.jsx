import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const ModelSelector = ({ modelOptions, model, setModel }) => {
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
        top: rect.bottom + 8, // 버튼 바로 아래에 띄움
        left: rect.left,
        minWidth: rect.width,
        zIndex: 2000,
        maxHeight: "60vh",
      });
    }
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!isModalOpen) return;
    const handleResize = () => setIsModalOpen(false); // 창 크기 바뀌면 닫기
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isModalOpen]);

  const selectedModel = modelOptions.find((m) => m.value === model);

  // 모달 내용
  const modal = (
    <div style={modalStyle}>
      <div className="bg-base-200 border border-gray-600 rounded-xl shadow-2xl p-6 max-h-[60vh] overflow-y-auto flex flex-col gap-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold">모델 선택</span>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {modelOptions.map((m) => (
            <button
              key={m.value}
              className={`relative group rounded-lg overflow-hidden border transition-all ${model === m.value
                  ? "border-primary ring-2 ring-primary"
                  : "border-gray-600"
                }`}
              style={{ height: 120 }}
              onClick={() => {
                setModel(m.value);
                setIsModalOpen(false);
              }}
            >
              <img
                src={m.thumbnail}
                alt={m.label}
                className="w-full h-full object-cover"
                style={{ minHeight: 120, maxHeight: 120 }}
              />
              {/* 오버레이 */}
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-black opacity-0 group-hover:opacity-60 transition-all">
                <span className="text-lg font-bold text-white opacity-0 group-hover:opacity-100">
                  {m.label}
                </span>
                <span className="text-xs text-gray-200 mt-1 opacity-0 group-hover:opacity-100">
                  {m.desc || "모델 설명이 없습니다."}
                </span>
              </div>
            </button>
          ))}
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
        <img
          src={selectedModel?.thumbnail}
          alt={selectedModel?.label}
          className="h-10 w-10 rounded-md object-cover"
        />
        <span className="text-sm font-medium">
          {selectedModel?.label || "모델 선택"}
        </span>
      </button>
      {isModalOpen && createPortal(modal, document.body)}
    </div>
  );
};

export default ModelSelector;