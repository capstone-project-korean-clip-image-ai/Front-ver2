import { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import useGenerate from "../hooks/useGenerate";
import GenerateParamsBlock from "../components/common/GenerateParamsBlock";
import SingleImageUploadInput from "../components/common/SingleImageUploadInput";
import ModeSelector from "../components/common/ModeSelector";
import FilterSelector from "../components/common/FilterSelector";
import ImgNumSelector from "../components/common/imageParams/ImgNumSelector";
import ImgRaitoSelector from "../components/common/imageParams/ImgRaitoSelector";

const GenerateMain = () => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("DreamShaper");
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

  const [img2imgMode, setImg2imgMode] = useState("style");
  const [filter, setFilter] = useState("Disney"); // 디즈니, 지브리
  const [imgUploading, setImgUploading] = useState(false);
  const [advancedOpened, setAdvancedOpened] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [previewUrl, advancedOpened]);

  const { urls, loading, error, generate, modify, strain } = useGenerate();
  const { onGenerate } = useOutletContext();

  const modelOptions = [
    {
      value: "InsaneRealistic",
      label: "InsaneRealistic",
      thumbnail: "/models/InsaneRealistic.png",
    },
    {
      value: "DreamShaper",
      label: "DreamShaper",
      thumbnail: "/models/Dreamshaper.png",
    },
    {
      value: "ToonYou",
      label: "ToonYou",
      thumbnail: "/models/ToonYou.png",
    },
    {
      value: "PastelMix",
      label: "PastelMix",
      thumbnail: "/models/PastelMix.png",
    },
  ];

  // TXT2IMG
  const handleGenerate = async () => {
    if (prompt === "") {
      alert("프롬프트를 입력해주세요.");
      return;
    }

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

  // IMG2IMG - Edge, Pose, IP-Adapter, Face
  const handleModify = async () => {
    if (previewUrl === null) {
      alert("이미지를 업로드 하지 않았습니다.");
      return;
    }

    if (img2imgMode === undefined) {
      alert("작업 방식을 선택해주세요.");
      return;
    }

    const params = {
      prompt,
      model,
      lora,
      imgNum,
      width,
      height,
      ...advancedOptions,
    };
    await modify(params, img2imgMode, previewUrl);
    onGenerate(); // 생성 후 로그 리프레시
    if (error) {
      console.error("Error generating image:", error);
    } else {
      console.log("Generated URLs:", urls);
    }
  };

  // IMG2IMG - Filter
  const handleFilter = async () => {
    if (img2imgMode !== "filter") {
      alert("필터 모드가 아닙니다.");
      return;
    }
    if (previewUrl === null) {
      alert("이미지를 업로드 하지 않았습니다.");
      return;
    }
    if (filter === "") {
      alert("필터를 선택해주세요.");
      return;
    }

    await strain(filter, imgNum, previewUrl);

    onGenerate();
    if (error) {
      console.error("Error generating image:", error);
    } else {
      console.log("Generated URLs:", urls);
    }
  };

  const handlePush = async () => {
    if (loading) return;

    if (previewUrl === null && img2imgMode !== "filter") {
      // TXT2IMG
      handleGenerate();
    } else if (previewUrl !== null && img2imgMode !== "filter") {
      // IMG2IMG (not filter mode)
      handleModify();
    } else if (previewUrl !== null && img2imgMode === "filter") {
      // Filter mode
      handleFilter();
    } else {
      alert("이미지를 업로드 하거나 작업 방식을 선택해주세요.");
      return;
    }
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    setImgUploading(true);
    if (!file || !file.type.startsWith("image/")) return;
    setPreviewUrl(URL.createObjectURL(file));
    setImgUploading(false);
  };

  // 이미지 업로드 취소
  const handleCancel = () => {
    setPreviewUrl(null);
  };

  const handleFilterSelect = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const generateBlockProps = {
    prompt,
    setPrompt,
    modelOptions: modelOptions,
    model,
    setModel,
    lora,
    setLora,
    advancedOptions,
    setAdvancedOptions,
  };

  return (
    <div className="flex h-full flex-col">
      {/* 상단 컨텐츠 스크롤 영역 */}
      <div className="gap-2 border-b-2 border-gray-800 p-4 text-xl font-bold">
        이미지 생성
      </div>
      <div
        ref={scrollRef}
        className="scrollbar-hide flex flex-1 flex-col gap-2 overflow-y-auto"
      >
        {/* 상단 프롬프트 영역 */}
        {img2imgMode !== "filter" ? (
          <GenerateParamsBlock
            {...generateBlockProps}
            onToggleAdvanced={setAdvancedOpened}
          />
        ) : (
          <FilterSelector
            filter={filter}
            setFilter={setFilter}
            onSelect={handleFilterSelect}
          />
        )}
        <div className="bg-base-800 flex flex-col gap-4 p-4">
          <div className="flex flex-row gap-x-2">
            <p className="text-md font-medium text-white">
              참조할 이미지 업로드
            </p>
            <p className="text-md font-medium text-gray-500">(선택)</p>
          </div>
          <ModeSelector
            img2imgMode={img2imgMode}
            setImg2imgMode={setImg2imgMode}
          />
          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <SingleImageUploadInput
                onChange={handleChange}
                disabled={loading}
                imgUploading={imgUploading}
              />
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleCancel()}
                className="btn btn-error btn-outline btn-square rounded-lg text-xl"
                title="이미지 업로드 취소"
              >
                ✕
              </button>
            </div>
          </div>

          {previewUrl !== null && (
            <div className="relative h-64 justify-center rounded-md border border-gray-600 shadow-md">
              <div className="absolute h-full w-full overflow-hidden">
                <img
                  src={previewUrl}
                  alt="업로드된 이미지"
                  className="h-full w-full object-cover blur-md brightness-50"
                />
              </div>
              <div className="relative z-10 flex h-full items-center justify-center">
                <img
                  src={previewUrl}
                  alt="업로드된 이미지"
                  className="h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* 이미지 수 및 비율 선택 영역 (하단 고정) */}
      <div className="flex flex-row gap-4 p-4">
        <ImgNumSelector imgNum={imgNum} setImgNum={setImgNum} />
        <ImgRaitoSelector ratio={ratio} setRatio={setRatio} />
      </div>
      {/* 생성하기 버튼 (하단 고정) */}
      <div className="flex flex-col gap-4 p-4 pt-0">
        <button
          className="btn btn-success w-full"
          onClick={handlePush}
          disabled={loading}
        >
          {loading ? "처리 중..." : "생성하기"}
        </button>
      </div>
    </div>
  );
};

export default GenerateMain;
