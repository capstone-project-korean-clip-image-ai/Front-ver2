import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import useGenerateTxt2Img from "../hooks/useGenerateTxt2Img";
import GenerateParamsBlock from "../components/common/GenerateParamsBlock";

const Txt2ImgMain = () => {
  // 프롬프트 및 모델 관련 상태 관리
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("base");
  const [lora, setLora] = useState("none");
  const [imgNum, setImgNum] = useState(4);
  const [ratio, setRatio] = useState("512x512");
  const [width, height] = ratio.split("x").map(Number);
  const [advancedOptions, setAdvancedOptions] = useState({
    negative_prompt: "",
    inference_steps: 25,
    guidance_scale: 7.5,
    clip_skip: 0,
  });

  // 이미지 생성 훅
  const { urls, loading, error, generate } = useGenerateTxt2Img();
  const { onGenerate } = useOutletContext();

  const txt2imgModels = [
    {
      value: "base",
      label: "Stable Diffusion 1.5",
      thumbnail: "/models/Stable_diffusion_1.5.png",
    },
    {
      value: "DreamShaper",
      label: "DreamShaper",
      thumbnail: "/models/Dreamshaper.png",
    },
    { value: "model3", label: "Model 3", thumbnail: "/models/Dreamshaper.png" },
    {
      value: "model4",
      label: "Model 4",
      thumbnail: "/models/Stable_diffusion_1.5.png",
    },
    { value: "model5", label: "Model 5", thumbnail: "/models/Dreamshaper.png" },
    { value: "model6", label: "Model 6", thumbnail: "/models/Dreamshaper.png" },
  ];

  const handleGenerate = async () => {
    await generate({
      prompt,
      model,
      lora,
      imgNum,
      width,
      height,
      ...advancedOptions,
    });
    onGenerate(); // 생성 후 로그 리프레시
    if (error) {
      console.error("Error generating image:", error);
    } else {
      console.log("Generated URLs:", urls);
    }
  };

  const generateBlockProps = {
    prompt,
    setPrompt,
    modelOptions: txt2imgModels,
    model,
    setModel,
    lora,
    setLora,
    imgNum,
    setImgNum,
    ratio,
    setRatio,
    advancedOptions,
    setAdvancedOptions,
    onSubmit: handleGenerate,
    loading,
  };

  return (
    <div>
      <GenerateParamsBlock
        {...generateBlockProps}
        onSubmit={handleGenerate}
        loading={loading}
        submitText="이미지 생성"
      />
    </div>
  );
};

export default Txt2ImgMain;
