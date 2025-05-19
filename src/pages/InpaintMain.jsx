import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import GenerateParamsBlock from "../components/common/GenerateParamsBlock";
import ImageUploaderSAM from "../components/inpaint/ImageUploaderSAM";
import ImageUploaderDraw from "../components/inpaint/ImageUploaderDraw";
import ObjectSelection from "../components/inpaint/ObjectSelection";

import useObjectDetect from "../hooks/useObjectDetect";
import useInpaint from "../hooks/useInpaint";

const InpaintMain = () => {
  // Inpaint 모드 전환 상태 관리
  const [isEraseMode, setIsEraseMode] = useState(true);
  const [useSAM, setUseSAM] = useState(true);

  // 업로드된 이미지와 마스크 상태 관리
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedMask, setSelectedMask] = useState(null);
  const [drawRef, setDrawRef] = useState(null);

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
  const { masks, loading: detectLoading, detect } = useObjectDetect();
  const { loading: inpaintLoading, erase, redraw } = useInpaint();

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

  const handleDetect = async (file, coords) => {
    if (!file || !coords) return;
    setUploadedImage(file);
    await detect(uploadedImage, coords);
  };

  const handleMaskSelect = (url) => setSelectedMask(url);

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
    if (useSAM) {
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
    console.log(maskBlob);
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
    <div className="flex flex-col gap-4 p-4">
      {/* 모드 전환 스위치 */}
      <div className="mb-4 flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span className={!isEraseMode ? "opacity-50" : ""}>지우기</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={!isEraseMode}
            onChange={() => setIsEraseMode((prev) => !prev)}
          />
          <span className={isEraseMode ? "opacity-50" : ""}>새로 그리기</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={!useSAM ? "opacity-50" : ""}>SAM</span>
          <input
            type="checkbox"
            className="toggle toggle-secondary"
            checked={!useSAM}
            onChange={() => setUseSAM((prev) => !prev)}
          />
          <span className={useSAM ? "opacity-50" : ""}>직접 그리기</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        {/* 좌측: 이미지 업로드 및 마스크 작업 */}
        <div className="min-w-[300px] flex-1">
          {useSAM ? (
            <ImageUploaderSAM onDetect={handleDetect} loading={detectLoading} />
          ) : (
            <ImageUploaderDraw
              onUpload={(file) => setUploadedImage(file)}
              loading={inpaintLoading}
              onRefReady={setDrawRef}
            />
          )}

          {useSAM && masks.length > 0 && (
            <ObjectSelection objects={masks} onSelect={handleMaskSelect} />
          )}

          {isEraseMode &&
            ((useSAM && selectedMask) || (!useSAM && drawRef)) && (
              <button
                className="btn btn-error mt-4"
                onClick={handleErase}
                disabled={inpaintLoading}
              >
                영역 지우기
              </button>
            )}
        </div>

        {/* 우측: 파라미터 입력 */}
        {!isEraseMode && (
          <div className="min-w-[300px] flex-1">
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
              showRatio={false}
              advancedOptions={advancedOptions}
              setAdvancedOptions={setAdvancedOptions}
              onSubmit={handleRedraw}
              loading={inpaintLoading}
              submitText="새로 그리기"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InpaintMain;
