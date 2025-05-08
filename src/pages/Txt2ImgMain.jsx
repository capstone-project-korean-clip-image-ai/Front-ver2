import React, { useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import GenerateParamsBlock from "../components/common/GenerateParamsBlock";

const Txt2ImgMain = () => {
  const { setImageUrls } = useOutletContext();

  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("base");
  const [lora, setLora] = useState("none");
  const [advancedOptions, setAdvancedOptions] = useState({
    negative_prompt: "",
    inference_steps: 25,
    guidance_scale: 7.5,
    clip_skip: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setImageUrls([]); // 로그 초기화

    try {
      const response = await axios.post("http://localhost:8000/txt2img", {
        prompt,
        model,
        lora,
        ...advancedOptions,
      });

      setImageUrls(response.data.urls); // 4장 presigned URL
    } catch (error) {
      console.error("이미지 생성 오류:", error);
    }

    setLoading(false);
  };

  return (
    <GenerateParamsBlock
      prompt={prompt}
      setPrompt={setPrompt}
      model={model}
      setModel={setModel}
      lora={lora}
      setLora={setLora}
      advancedOptions={advancedOptions}
      setAdvancedOptions={setAdvancedOptions}
      onSubmit={handleGenerate}
      loading={loading}
      submitText="이미지 생성"
    />
  );
};

export default Txt2ImgMain;
