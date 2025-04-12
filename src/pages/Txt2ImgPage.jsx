import React, { useState } from "react";
import axios from "axios";
import InputForm from "../components/txt2img/InputForm";
import ModelSelector from "../components/txt2img/ModelSelector";
import LoraSelector from "../components/txt2img/LoraSelector";
import AdvancedSettings from "../components/txt2img/AdvancedSettings";
import ImageDisplay from "../components/txt2img/ImageDisplay";

const Txt2ImgPage = () => {
  const base_img_path = "/sample.jpeg"
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("base");
  const [lora, setLora] = useState("none");
  const [advancedOptions, setAdvancedOptions] = useState({
    negative_prompt: "",
    inference_steps: 25,
    guidance_scale: 7.5,
    clip_skip: 0,
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [imageUrls, setImageUrls] = useState(Array(4).fill(base_img_path));
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setImageUrls([]); // 기존 이미지 초기화

    try {
      const response = await axios.post("http://localhost:8000/txt2img", {
        prompt,
        model,
        lora,
        negative_prompt: advancedOptions.negative_prompt,
        inference_steps: advancedOptions.inference_steps,
        guidance_scale: advancedOptions.guidance_scale,
        clip_skip: advancedOptions.clip_skip,
      });

      console.log("받은 presigned URL 목록:", response.data.urls);
      setImageUrls(response.data.urls); // 4장 presigned URL 저장
    } catch (error) {
      console.error("이미지 생성 오류:", error);
    }

    setLoading(false);
  };

  return (
    <main className="flex flex-col max-w-screen-lg gap-4 p-4 mx-auto sm:flex-row">
      {/* 왼쪽: 입력 폼 */}
      <div className="relative flex-col flex-1 p-4 space-y-4 border shadow-md">
        <InputForm prompt={prompt} setPrompt={setPrompt} />
        <ModelSelector model={model} setModel={setModel} />
        <LoraSelector lora={lora} setLora={setLora} />

        <button onClick={() => setShowAdvanced((prev) => !prev)}>
          {showAdvanced ? "고급 옵션 숨기기" : "고급 옵션 보기"}
        </button>

        {showAdvanced && (
          <AdvancedSettings
            advancedOptions={advancedOptions}
            setAdvancedOptions={setAdvancedOptions}
          />
        )}

        <button
          className="absolute btn btn-success right-4 bottom-4"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "이미지 생성 중..." : "이미지 생성"}
        </button>
      </div>

      {/* 오른쪽: 이미지 출력 */}
      <div className="flex-1 p-4 border shadow-md">
        <ImageDisplay image={imageUrls} />
      </div>
    </main>
  );
};

export default Txt2ImgPage;
