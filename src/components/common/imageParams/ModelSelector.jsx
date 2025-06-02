import { useId } from "react";

const ModelSelector = ({ modelOptions, model, setModel }) => {
  // 고유 id 생성 (여러 셀렉터가 있을 때 충돌 방지)
  const modalId = useId();

  return (
    <div className="flex-1 w-full">
      {/* 모달 오픈 버튼 */}
      <label
        htmlFor={modalId}
        className="flex w-full h-full bg-base-100 items-center gap-2 rounded-lg border border-gray-600 p-2 shadow-md hover:bg-base-300 cursor-pointer"
      >
        {modelOptions.find((m) => m.value === model)?.thumbnail && (
          <img
            src={modelOptions.find((m) => m.value === model)?.thumbnail}
            alt={modelOptions.find((m) => m.value === model)?.label}
            className="h-10 w-10 rounded-md object-cover"
          />
        )}
        <span className="text-sm font-medium">
          {modelOptions.find((m) => m.value === model)?.label || "모델 선택"}
        </span>
      </label>

      {/* 모달 토글용 체크박스 */}
      <input type="checkbox" id={modalId} className="modal-toggle" readOnly />

      {/* 모달 */}
      <div className="modal" role="dialog">
        <div className="modal-box w-11/12 max-w-7xl">
          <h3 className="font-bold text-lg mb-4">모델 선택</h3>
          <div className="flex flex-row flex-wrap gap-8 justify-center">
            {modelOptions.map((m) => (
              <label
                key={m.value}
                htmlFor={modalId}
                className={`group flex flex-col items-center p-4 rounded-lg border transition-all cursor-pointer
                  ${model === m.value ? "border-primary ring-2 ring-primary" : "border-gray-600"}
                  bg-base-100 hover:bg-gray-800 relative`}
                style={{ minWidth: 200, minHeight: 200 }}
                onClick={() => setModel(m.value)}
              >
                <div className="relative flex items-center justify-center mb-2 w-52 h-52">
                  {m.thumbnail && (
                    <img
                      src={m.thumbnail}
                      alt={m.label}
                      className="w-52 h-52 rounded-md object-cover"
                    />
                  )}
                  {/* 썸네일 위에 설명(호버 시만 보임, 명칭은 제외) */}
                  {m.desc && (
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all rounded-md px-4 py-6">
                      <span
                        className="text-white text-center text-sm md:text-base leading-relaxed whitespace-pre-line font-['Noto_Sans_KR','sans-serif'] drop-shadow-md"
                        style={{ fontWeight: 500 }}
                      >
                        {m.desc}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-base font-medium">{m.label}</span>
              </label>
            ))}
          </div>
          <div className="modal-action mt-6">
            {/* 닫기 버튼 */}
            <label htmlFor={modalId} className="btn">닫기</label>
          </div>
        </div>
        {/* 모달 바깥 클릭 시 닫힘 */}
        <label className="modal-backdrop" htmlFor={modalId}>닫기</label>
      </div>
    </div>
  );
};

export default ModelSelector;