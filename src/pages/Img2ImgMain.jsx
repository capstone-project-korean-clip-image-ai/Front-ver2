import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import useGenerateImg2Img from "../hooks/useGenerateImg2Img";
import GenerateParamsBlock from "../components/common/GenerateParamsBlock";
import SingleImageUploadInput from "../components/common/SingleImageUploadInput";
import ModeSelector from "../components/img2img/ModeSelector";

const Img2ImgMain = () => {
  const [uploadFile, setUploadFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("base");
  const [lora, setLora] = useState("none");
  const [imgNum, setImgNum] = useState(4);
  const [advancedOptions, setAdvancedOptions] = useState({
    negative_prompt: "",
    inference_steps: 25,
    guidance_scale: 7.5,
    clip_skip: 0,
  });

  // Img2Img 모드 (edge, pose, filter)
  const [img2imgMode, setImg2imgMode] = useState("edge");

  const { urls, loading, error, generate } = useGenerateImg2Img();
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
    if (!uploadFile) {
      alert("이미지를 업로드 하지 않았습니다.");
      return;
    }
    const params = {
      prompt,
      model,
      lora,
      imgNum,
      ...advancedOptions,
    };
    await generate(params, img2imgMode, uploadFile);
    onGenerate(); // 생성 후 로그 리프레시
    if (error) {
      console.error("Error generating image:", error);
    } else {
      console.log("Generated URLs:", urls);
    }
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    setUploadFile(file);
    setPreviewUrl(URL.createObjectURL(file));
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
    showRatio: false,
    advancedOptions,
    setAdvancedOptions,
    onSubmit: handleGenerate,
    loading,
  };

  return (
    <div className="flex flex-col gap-2 border p-4">
      <SingleImageUploadInput
        label="이미지 업로드"
        onChange={handleChange}
        disabled={loading}
        loading={loading}
      />
      <div>
        {previewUrl && (
          <img
            src={previewUrl}
            alt="업로드된 이미지"
            className="m-4 h-64 rounded-lg object-cover"
          />
        )}
      </div>
      <ModeSelector img2imgMode={img2imgMode} setImg2imgMode={setImg2imgMode} />
      {img2imgMode === "edge" || img2imgMode === "pose" ? (
        <GenerateParamsBlock
          {...generateBlockProps}
          onSubmit={handleGenerate}
          loading={loading}
        />
      ) : img2imgMode === "filter" ? (
        <div className="flex flex-col gap-4 p-4">
          <h2 className="text-lg font-bold">필터 적용 모드</h2>
          <p>
            필터 적용 모드에서는 업로드한 이미지에 필터를 적용하여 새로운
            이미지를 생성합니다.
          </p>
          <p>적용하고싶은 필터를 선택하세요.</p>
        </div>
      ) : null}
    </div>
  );
};

export default Img2ImgMain;
