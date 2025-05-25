import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";

import GenerateParamsBlock from "../components/common/GenerateParamsBlock";
import ImageUploaderSAM from "../components/inpaint/ImageUploaderSAM";
import ImageUploaderDraw from "../components/inpaint/ImageUploaderDraw";
import ObjectSelection from "../components/inpaint/ObjectSelection";
import SingleImageUploadInput from "../components/common/SingleImageUploadInput";
import MaskingModeSelector from "../components/inpaint/MaskingModeSelector";
import TaskTypeSelector from "../components/inpaint/TaskTypeSelector";
import ImgNumSelector from "../components/common/imageParams/ImgNumSelector";
import useInpaint from "../hooks/useInpaint";

const InpaintMain = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  // 마스킹 모드 선택 상태 관리 (sam, drawing, search)
  const [maskingMode, setMaskingMode] = useState("sam");
  // SAM mask
  const [selectedMask, setSelectedMask] = useState(null);
  // Draw
  const [drawRef, setDrawRef] = useState(null);
  // 영역 지우기 or 그리기
  const [mode, setMode] = useState("erase");

  const [imgUploading, setImgUploading] = useState(false);

  // 화면 자동 스크롤
  const imageSectionRef = useRef(null);
  const maskSectionRef = useRef(null);
  const drawSectionRef = useRef(null);
  const promptRef = useRef(null);

  // 프롬프트 및 모델 관련 상태 관리
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("base");
  const [lora, setLora] = useState("none");
  const [imgNum, setImgNum] = useState(1);
  const [advancedOptions, setAdvancedOptions] = useState({
    negative_prompt: "",
    inference_steps: 25,
    guidance_scale: 7.5,
    clip_skip: 0,
  });

  // 이미지 생성 훅
  const { onGenerate } = useOutletContext();
  const { masks, loading, detect, erase, redraw } = useInpaint();

  const inpaintModels = [
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
  ];

  // 마스킹 모드 변경 시 초기화 (UX 개선 : 자동 스크롤 - 그리기)
  useEffect(() => {
    setMode("erase");
    setSelectedMask(null);
    masks.length = 0; // 마스크 초기화
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maskingMode]);

  // 자동 스크롤 (이미지 업로드)
  useEffect(() => {
    if ((maskingMode === "sam" || previewUrl) && imageSectionRef.current) {
      setTimeout(() => {
        imageSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 50);
    }
  }, [maskingMode, previewUrl, selectedMask, masks]);

  // 자동 스크롤 (마스킹 모드 변경 시)
  useEffect(() => {
    if (maskingMode === "drawing" && drawSectionRef.current) {
      setTimeout(() => {
        drawSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 50);
    }
  }, [maskingMode, previewUrl]);

  // 자동 스크롤 (그리기 토글)
  useEffect(() => {
    if (mode === "paint" && promptRef.current) {
      promptRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [mode]);

  const handleChange = (event) => {
    const file = event.target.files[0];
    setImgUploading(true);
    if (!file || !file.type.startsWith("image/")) return;
    handleCancel();
    setPreviewUrl(URL.createObjectURL(file));
    setUploadedImage(file);
    setImgUploading(false);
  };

  // SAM detect
  const handleDetect = async (coords) => {
    if (!uploadedImage || !coords) return;
    await detect(uploadedImage, coords);
  };

  const handleCancel = () => {
    setPreviewUrl(null);
    masks.length = 0;
    setSelectedMask(null);
  };

  const handleMaskSelect = (url) => {
    setSelectedMask(url);
  };

  // Data URL → Blob 변환 헬퍼
  const dataURLtoBlob = (dataurl) => {
    const [header, base64] = dataurl.split(",");
    const mime = header.match(/:(.*?);/)[1];
    const binary = atob(base64);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    return new Blob([array], { type: mime });
  };

  const getMaskBlob = async () => {
    if (maskingMode === "sam") {
      const res = await fetch(selectedMask);
      return await res.blob();
    }

    const maskData = await drawRef.getMaskData();
    const maskBlob = dataURLtoBlob(maskData);

    return maskBlob;
  };

  const handleErase = async () => {
    const maskBlob = await getMaskBlob();
    if (!uploadedImage || !maskBlob) {
      alert("마스크가 설정되지 않았습니다.");
      return;
    }
    await erase(uploadedImage, maskBlob);
    onGenerate();
  };

  const handleRedraw = async () => {
    const maskBlob = await getMaskBlob();
    if (!uploadedImage || !maskBlob) {
      alert("마스크가 설정되지 않았습니다.");
      return;
    }
    const params = {
      prompt,
      model,
      lora,
      imgNum,
      ...advancedOptions,
    };
    await redraw(params, uploadedImage, maskBlob);
    onGenerate();
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="gap-2 border-b-2 border-gray-800 p-4 text-xl font-bold">
        이미지 수정
      </div>
      <div className="scrollbar-hide flex flex-1 flex-col gap-2 overflow-y-auto">
        {/* 이미지 업로드 영역 */}
        <div className="flex flex-row gap-4 px-4 py-2">
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
              className="btn btn-error btn-outline btn-square text-xl rounded-lg"
              title="이미지 업로드 취소"
            >
              ✕
            </button>
          </div>
        </div>
        {/* 작업 방식 선택 컴포넌트로 분리 */}
        {previewUrl !== null ? (
          <MaskingModeSelector
            maskingMode={maskingMode}
            setMaskingMode={setMaskingMode}
          />
        ) : (
          <div className="flex items-center justify-center p-4">
            <p className="text-sm text-gray-500">이미지를 업로드해주세요.</p>
          </div>
        )}
        <div ref={imageSectionRef} className="flex flex-col gap-4">
          {maskingMode === "sam" && (
            <div ref={maskSectionRef}>
              <ImageUploaderSAM
                image={previewUrl}
                onDetect={handleDetect}
                loading={loading}
              />
              {masks.length > 0 && (
                <ObjectSelection
                  objects={masks}
                  selected={selectedMask}
                  onSelect={handleMaskSelect}
                />
              )}
            </div>
          )}
          {maskingMode === "drawing" && (
            <div>
              <ImageUploaderDraw
                originImage={previewUrl}
                drawRef={drawRef}
                onRefReady={setDrawRef}
                loading={loading}
              />
            </div>
          )}
          {maskingMode === "search" && (
            <div className="flex flex-col items-center justify-center p-4">
              <p className="text-sm text-gray-500">
                이 기능은 현재 개발 중입니다.
              </p>
            </div>
          )}
          {(maskingMode === "drawing" ||
            (maskingMode === "sam" && selectedMask !== null)) && (
            <div className="flex flex-col gap-4">
              <TaskTypeSelector
                mode={mode}
                setMode={setMode}
                loading={loading}
                maskingMode={maskingMode}
                selectedMask={selectedMask}
                forwardRef={drawSectionRef}
              />
              {mode === "paint" && (
                <div className="flex flex-col gap-4">
                  <GenerateParamsBlock
                    prompt={prompt}
                    setPrompt={setPrompt}
                    modelOptions={inpaintModels}
                    model={model}
                    setModel={setModel}
                    lora={lora}
                    setLora={setLora}
                    imgNum={imgNum}
                    setImgNum={setImgNum}
                    advancedOptions={advancedOptions}
                    setAdvancedOptions={setAdvancedOptions}
                  />
                  <div ref={promptRef} className="px-4 pb-2">
                    <ImgNumSelector imgNum={imgNum} setImgNum={setImgNum} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {mode === "erase" ? (
        <div className="flex flex-col gap-4 p-4">
          <button
            onClick={() => handleErase(selectedMask)}
            className="btn btn-secondary w-full"
            disabled={loading || (maskingMode === "sam" && !selectedMask)}
          >
            {loading ? "처리 중..." : "선택 영역 지우기"}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-4">
          <button
            onClick={() => handleRedraw(selectedMask)}
            className="btn btn-success w-full"
            disabled={loading || (maskingMode === "sam" && !selectedMask)}
          >
            {loading ? "처리 중..." : "선택 영역 다시 그리기"}
          </button>
        </div>
      )}
    </div>
  );
};

export default InpaintMain;
