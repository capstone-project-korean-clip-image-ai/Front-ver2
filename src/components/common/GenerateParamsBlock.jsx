import React, { useState } from "react";
import InputForm from "./imageParams/InputForm";
import ModelSelector from "./imageParams/ModelSelector";
import LoraSelector from "./imageParams/LoraSelector";
import ImgNumSelector from "./imageParams/ImgNumSelector";
import ImgRaitoSelector from "./imageParams/ImgRaitoSelector";
import AdvancedSettings from "./imageParams/AdvancedSettings";

const GenerateParamsBlock = ({
  prompt,
  setPrompt,
  modelOptions,
  model,
  setModel,
  lora,
  setLora,
  imgNum,
  setImgNum,
  ratio,
  setRatio,
  showRatio = true,
  advancedOptions,
  setAdvancedOptions,
  onSubmit,
  loading,
  submitText = "이미지 생성",
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="relative flex w-full flex-col gap-4 border p-4 shadow-md">
      {/* 프롬프트 및 모델 선택 */}
      <InputForm prompt={prompt} setPrompt={setPrompt} />
      <ModelSelector
        modelOptions={modelOptions}
        model={model}
        setModel={setModel}
      />
      <LoraSelector lora={lora} setLora={setLora} />
      <ImgNumSelector imgNum={imgNum} setImgNum={setImgNum} />
      {showRatio && <ImgRaitoSelector ratio={ratio} setRatio={setRatio} />}

      {/* 고급 옵션 토글 */}
      <button
        onClick={() => setShowAdvanced((prev) => !prev)}
        className="btn btn-sm btn-outline w-fit"
      >
        {showAdvanced ? "고급 옵션 숨기기" : "고급 옵션 보기"}
      </button>

      {/* 고급 옵션 */}
      {showAdvanced && (
        <AdvancedSettings
          advancedOptions={advancedOptions}
          setAdvancedOptions={setAdvancedOptions}
        />
      )}

      {/* 실행 버튼 */}
      <button
        className="btn btn-success mt-4 self-end"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? "처리 중..." : submitText}
      </button>
    </div>
  );
};

export default GenerateParamsBlock;
