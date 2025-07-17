import { useState } from "react";

const LoraSelector = ({ loras, setLoras }) => {
  const options = [
    { value: "none", label: "LoRA 없음" },
    {
      value: "hanbok",
      label: "한복 LoRA",
      thumbnail: "/loras/hanbok.png",
      desc: "한복 스타일 LoRA \n 한복 이미지 생성에 \n 최적화 되어있습니다.",
    },
    {
      value: "hanok",
      label: "한옥 LoRA",
      thumbnail: "/loras/hanok.png",
      desc: "한옥 스타일 LoRA \n 한옥 이미지 생성에 \n 최적화 되어있습니다.",
    },
    {
      value: "hansik",
      label: "한식 LoRA",
      thumbnail: "/loras/hansik.png",
      desc: "한식 스타일 LoRA \n 한식 이미지 생성에 \n 최적화 되어있습니다.",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full flex-1">
      {/* 모달 오픈 버튼 */}
      <button
        type="button"
        className="bg-base-100 hover:bg-base-300 flex h-full w-full cursor-pointer items-center gap-2 rounded-lg border border-gray-600 p-2 shadow-md"
        onClick={() => setIsModalOpen(true)}
      >
        {loras.length > 0 ? (
          <div className="flex gap-2">
            {loras.map((val) => {
              const opt = options.find((o) => o.value === val);
              return (
                opt?.thumbnail && (
                  <img
                    key={val}
                    src={opt.thumbnail}
                    alt={opt.label}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                )
              );
            })}
          </div>
        ) : (
          <span className="text-sm font-medium">LoRA 선택</span>
        )}
      </button>

      {/* 모달 */}
      {isModalOpen && (
        <div className="modal modal-open" role="dialog">
          <div className="modal-box w-11/12 max-w-7xl">
            <h3 className="mb-4 text-lg font-bold">LoRA 선택</h3>
            <div className="flex flex-row flex-wrap justify-center gap-8">
              {options.map((l) => (
                <label
                  key={l.value}
                  className={`group flex cursor-pointer flex-col items-center rounded-lg border p-4 transition-all ${loras.includes(l.value) ? "border-primary ring-primary ring-2" : "border-gray-600"} bg-base-100 relative hover:bg-gray-800`}
                  style={{ minWidth: 200, minHeight: 200 }}
                  onClick={() => {
                    if (l.value === "none") {
                      setLoras([]);
                    } else {
                      setLoras(
                        loras.includes(l.value)
                          ? loras.filter((v) => v !== l.value)
                          : [...loras, l.value],
                      );
                    }
                  }}
                >
                  <div className="relative mb-2 flex h-52 w-52 items-center justify-center">
                    {l.value === "none" ? (
                      <span className="flex h-full w-full items-center justify-center text-lg font-bold text-gray-400">
                        {l.label}
                      </span>
                    ) : (
                      l.thumbnail && (
                        <img
                          src={l.thumbnail}
                          alt={l.label}
                          className="h-52 w-52 rounded-md object-cover"
                        />
                      )
                    )}
                    {/* 썸네일 위에 설명(호버 시만 보임, 명칭은 제외) */}
                    {l.desc && l.value !== "none" && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-md bg-black/60 px-4 py-6 opacity-0 transition-all group-hover:opacity-100">
                        <span
                          className="text-center font-['Noto_Sans_KR','sans-serif'] text-lg leading-relaxed whitespace-pre-line text-white drop-shadow-md"
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
