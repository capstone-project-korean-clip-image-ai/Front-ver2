import React, { useState } from "react";
import axios from 'axios';
import InputForm from "../../components/txt2img/InputForm";
import ModelSelector from "../../components/txt2img/ModelSelector";
import LoraSelector from "../../components/txt2img/LoraSelector";
import AdvancedSettings from "../../components/txt2img/AdvancedSettings";
import ImageDisplay from "../../components/txt2img/ImageDisplay";

const Txt2ImgPage = () => {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("default");
  const [lora, setLora] = useState("none");
  const [advancedOptions, setAdvancedOptions] = useState({
    negative_prompt: "",
    inference_steps: 25,
    guidance_scale: 7.5,
    clip_skip: 0,
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setGeneratedImage(null);
    try {
      const response = await axios.post('http://localhost:8000/generate', {
        prompt,
        model,
        lora,
        negative_prompt: advancedOptions.negative_prompt,
        steps: advancedOptions.inference_steps,
        guidance_scale: advancedOptions.guidance_scale,
        clip_skip: advancedOptions.clip_skip,
      }, { responseType: 'blob' }); // 이미지 파일 받기

      const imageUrl = URL.createObjectURL(response.data);
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error('이미지 생성 오류:', error);
    }
    setLoading(false);
  };

  return (
    <div className="txt2img-page">
      <h1>Text to Image Generation</h1>
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
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "이미지 생성 중..." : "이미지 생성"}
      </button>
      {generatedImage && <ImageDisplay image={generatedImage} />}
    </div>
  );
};

export default Txt2ImgPage;
