import { useState } from "react";
import InputForm from "./imageParams/InputForm";
import ModelSelector from "./imageParams/ModelSelector";
import LoraSelector from "./imageParams/LoraSelector";
import AdvancedSettings from "./imageParams/AdvancedSettings";

const GenerateParamsBlock = ({
  prompt,
  setPrompt,
  modelOptions,
  model,
  setModel,
  lora,
  setLora,
  advancedOptions,
  setAdvancedOptions,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="relative flex w-full flex-col gap-4 p-4 pt-2 pb-0">
      <p className="text-md font-medium text-white"> 프롬프트 </p>
      <InputForm prompt={prompt} setPrompt={setPrompt} />
      <div className="flex flex-row gap-2">
        <ModelSelector
          modelOptions={modelOptions}
          model={model}
          setModel={setModel}
        />
        <LoraSelector lora={lora} setLora={setLora} />
      </div>

      {/* 고급 옵션 드롭다운 */}
      <div className="relative">
        <button
          onClick={() => setShowAdvanced((prev) => !prev)}
          className="select bg-base-100 hover:bg-base-300 flex w-full items-center justify-between rounded-md border border-gray-600 p-2 shadow-sm"
        >
          <span className="text-sm font-medium">고급 옵션</span>
          
        </button>
        {showAdvanced && (
          <div className="bg-base-200 mt-2 w-full rounded-md border border-gray-600 p-4">
            <AdvancedSettings
              advancedOptions={advancedOptions}
              setAdvancedOptions={setAdvancedOptions}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateParamsBlock;
