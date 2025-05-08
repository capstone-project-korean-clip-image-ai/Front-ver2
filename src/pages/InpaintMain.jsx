import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import GenerateParamsBlock from "../components/common/GenerateParamsBlock";
import axios from "axios";

import ImageUploaderSAM from "../components/inpaint/ImageUploaderSAM";
import ImageUploaderDraw from "../components/inpaint/ImageUploaderDraw";
import ObjectSelection from "../components/inpaint/ObjectSelection";
import MaskDrawCanvas from "../components/inpaint/MaskDrawCanvas";

const InpaintMain = () => {
  const { setImageUrls } = useOutletContext();

  // 상태
  const [isEraseMode, setIsEraseMode] = useState(true);
  const [useSAM, setUseSAM] = useState(true);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [detectedMasks, setDetectedMasks] = useState([]);
  const [selectedMask, setSelectedMask] = useState(null);
  const [drawnMask, setDrawnMask] = useState(null);
  const [loading, setLoading] = useState(false);

  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("base");
  const [lora, setLora] = useState("none");
  const [advancedOptions, setAdvancedOptions] = useState({
    negative_prompt: "",
    inference_steps: 25,
    guidance_scale: 7.5,
    clip_skip: 0,
  });

  const handleDetect = async (file, coords) => {
    if (!file || !coords) return;
    setUploadedImage(file);
    setLoading(true);

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("x", coords.x);
      form.append("y", coords.y);

      const response = await axios.post(
        "http://localhost:8000/img2img/object_detect",
        form,
      );
      const paths = response.data[1];

      const urls = [];
      for (const path of paths) {
        const imgBlob = await axios.get(
          "http://localhost:8000/img2img/detected_image",
          {
            params: { image_path: path },
            responseType: "blob",
          },
        );
        urls.push(URL.createObjectURL(imgBlob.data));
      }

      setDetectedMasks(urls);
    } catch (e) {
      console.error("객체 탐지 오류:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleMaskSelect = (maskUrl) => {
    setSelectedMask(maskUrl);
  };

  const handleErase = async () => {
    if (!uploadedImage || (useSAM && !selectedMask) || (!useSAM && !drawnMask))
      return;
    setLoading(true);

    try {
      const form = new FormData();
      form.append("image", uploadedImage);

      if (useSAM) {
        const maskBlob = await fetch(selectedMask).then((res) => res.blob());
        form.append(
          "object",
          new File([maskBlob], "mask.jpg", { type: maskBlob.type }),
        );
      } else {
        const maskBlob = await fetch(drawnMask).then((res) => res.blob());
        form.append(
          "object",
          new File([maskBlob], "mask.png", { type: maskBlob.type }),
        );
      }

      const response = await axios.post(
        "http://localhost:8000/img2img/erase_object",
        form,
      );
      setImageUrls([response.data.image_url]);
    } catch (e) {
      console.error("지우기 실패:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleRedraw = async () => {
    if (!uploadedImage || (useSAM && !selectedMask) || (!useSAM && !drawnMask))
      return;
    setLoading(true);

    try {
      const form = new FormData();
      form.append("image", uploadedImage);

      if (useSAM) {
        const maskBlob = await fetch(selectedMask).then((res) => res.blob());
        form.append(
          "mask",
          new File([maskBlob], "mask.jpg", { type: maskBlob.type }),
        );
      } else {
        const maskBlob = await fetch(drawnMask).then((res) => res.blob());
        form.append(
          "mask",
          new File([maskBlob], "mask.png", { type: maskBlob.type }),
        );
      }

      form.append("prompt", prompt);
      form.append("model", model);
      form.append("lora", lora);
      form.append("negative_prompt", advancedOptions.negative_prompt);
      form.append("inference_steps", advancedOptions.inference_steps);
      form.append("guidance_scale", advancedOptions.guidance_scale);
      form.append("clip_skip", advancedOptions.clip_skip);

      const response = await axios.post(
        "http://localhost:8000/img2img/redraw_object",
        form,
      );
      setImageUrls(response.data.urls);
    } catch (e) {
      console.error("새로 그리기 실패:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* 스위치 */}
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
        {/* Inpainting */}
        <div className="min-w-[300px] flex-1">
          {useSAM ? (
            <ImageUploaderSAM onDetect={handleDetect} loading={loading} />
          ) : (
            <ImageUploaderDraw onUpload={setUploadedImage} loading={loading} />
          )}

          {useSAM && uploadedImage && (
            <ObjectSelection
              objects={detectedMasks}
              onErase={handleMaskSelect}
            />
          )}

          {!useSAM && uploadedImage && (
            <>
              <p className="text-white">✅ 직접 그리기 모드입니다</p>
              <MaskDrawCanvas
                imageUrl={URL.createObjectURL(uploadedImage)}
                onMaskDrawn={setDrawnMask}
              />
            </>
          )}

          {isEraseMode &&
            ((useSAM && selectedMask) || (!useSAM && drawnMask)) && (
              <button
                className="btn btn-error mt-4"
                onClick={handleErase}
                disabled={loading}
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
              model={model}
              setModel={setModel}
              lora={lora}
              setLora={setLora}
              advancedOptions={advancedOptions}
              setAdvancedOptions={setAdvancedOptions}
              onSubmit={handleRedraw}
              loading={loading}
              submitText="새로 그리기"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InpaintMain;
