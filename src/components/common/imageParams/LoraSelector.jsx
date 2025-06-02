import { useState } from "react";

const LoraSelector = ({ lora, setLora }) => {
  const loras = [
    { value: "none", label: "LoRA 없음" },
    { value: "hanbok", label: "한복 LoRA", thumbnail: "/loras/hanbok.png", desc: "한복 스타일 LoRA \n 한복 이미지 생성에 \n 최적화 되어있습니다."  },
    { value: "hanok", label: "한옥 LoRA", thumbnail: "/loras/hanok.png", desc: "한옥 스타일 LoRA \n 한옥 이미지 생성에 \n 최적화 되어있습니다." },
    { value: "hansik", label: "한식 LoRA", thumbnail: "/loras/hansik.png", desc: "한식 스타일 LoRA \n 한식 이미지 생성에 \n 최적화 되어있습니다." },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-1 w-full">
      {/* 모달 오픈 버튼 */}
      <button
        type="button"
        className="flex w-full h-full bg-base-100 items-center gap-2 rounded-lg border border-gray-600 p-2 shadow-md hover:bg-base-300 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {loras.find((l) => l.value === lora)?.thumbnail && (
          <img
            src={loras.find((l) => l.value === lora)?.thumbnail}
            alt={loras.find((l) => l.value === lora)?.label}
            className="h-10 w-10 rounded-md object-cover"
          />
        )}
        <span className="text-sm font-medium">
          {loras.find((l) => l.value === lora)?.label || "LoRA 선택"}
        </span>
      </button>

      {/* 모달 */}
      {isModalOpen && (
        <div className="modal modal-open" role="dialog">
          <div className="modal-box w-11/12 max-w-7xl">
            <h3 className="font-bold text-lg mb-4">LoRA 선택</h3>
            <div className="flex flex-row flex-wrap gap-8 justify-center">
              {loras.map((l) => (
                <label
                  key={l.value}
                  className={`group flex flex-col items-center p-4 rounded-lg border transition-all cursor-pointer
                    ${lora === l.value ? "border-primary ring-2 ring-primary" : "border-gray-600"}
                    bg-base-100 hover:bg-gray-800 relative`}
                  style={{ minWidth: 200, minHeight: 200 }}
                  onClick={() => {
                    setLora(l.value);
                    setIsModalOpen(false);
                  }}
                >
                  <div className="relative flex items-center justify-center mb-2 w-52 h-52">
                    {l.value === "none" ? (
                      <span className="text-lg font-bold text-gray-400 flex items-center justify-center w-full h-full">
                        {l.label}
                      </span>
                    ) : (
                      l.thumbnail && (
                        <img
                          src={l.thumbnail}
                          alt={l.label}
                          className="w-52 h-52 rounded-md object-cover"
                        />
                      )
                    )}
                    {/* 썸네일 위에 설명(호버 시만 보임, 명칭은 제외) */}
                    {l.desc && l.value !== "none" && (
                      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all rounded-md px-4 py-6">
                        <span
                          className="text-white text-center text-lg leading-relaxed whitespace-pre-line font-['Noto_Sans_KR','sans-serif'] drop-shadow-md"
                          style={{ fontWeight: 500 }}
                        >
                          {l.desc}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-base font-medium">{l.label}</span>
                </label>
              ))}
            </div>
            <div className="modal-action mt-6">
              {/* 닫기 버튼 */}
              <button
                type="button"
                className="btn"
                onClick={() => setIsModalOpen(false)}
              >
                닫기
              </button>
            </div>
          </div>
          {/* 모달 바깥 클릭 시 닫힘 */}
          <div
            className="modal-backdrop"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default LoraSelector;
