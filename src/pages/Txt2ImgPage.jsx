import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar"; // 새로 추가한 사이드바 import
import InputForm from "../components/txt2img/InputForm";
import ModelSelector from "../components/txt2img/ModelSelector";
import LoraSelector from "../components/txt2img/LoraSelector";
import ImageDisplay from "../components/txt2img/ImageDisplay";

const Txt2ImgPage = () => {
  const base_img_path = "/sample.jpeg";
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
    setImageUrls([]);
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
      setImageUrls(response.data.urls);
    } catch (error) {
      console.error("이미지 생성 오류:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-[#0c0c0c] text-white">
      
      {/* 좌측 고정 사이드바 */}
      <Sidebar />

      {/* 본문 전체 */}
      <div className="flex flex-1">
        
        {/* 좌측 입력 영역 (5/20) */}
        <aside className="w-5/20 p-8 bg-[#1a1a1a] border-r border-zinc-700 overflow-y-auto space-y-6">
          
          {/* 텍스트 입력 */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-zinc-300">텍스트 입력</label>
            <textarea
              className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-700 placeholder-zinc-500 text-sm resize-none"
              rows={4}
              placeholder="예: 파란머리의 소녀"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <hr className="border-zinc-700 my-4" />

          {/* 모델 선택 */}
          <div className="flex items-center justify-between gap-4">
            <label className="block text-sm font-semibold text-zinc-300 whitespace-nowrap">
              모델 선택
            </label>
            <select
              className="w-full max-w-[90%] p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 text-sm appearance-none"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="base">Stable Diffusion 1.5</option>
              <option value="model2">Custom Model</option>
            </select>
          </div>

          <hr className="border-zinc-700 my-4" />

          {/* LoRA 선택 */}
          <div className="flex items-center justify-between gap-4">
            <label className="block text-sm font-semibold text-zinc-300 whitespace-nowrap">
              LoRA 선택
            </label>
            <select
              className="w-full max-w-[90%] p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 text-sm appearance-none"
              value={lora}
              onChange={(e) => setLora(e.target.value)}
            >
              <option value="none">없음</option>
              <option value="hanbok">한복</option>
            </select>
          </div>

          <hr className="border-zinc-700 my-4" />

          {/* 고급 옵션 */}
          <div className="space-y-2">
            <button
              onClick={() => setShowAdvanced(prev => !prev)}
              className="flex items-center gap-1 text-sm font-semibold text-zinc-300 hover:text-white hover:underline transition"
            >
              {showAdvanced ? "▲ 고급 옵션 숨기기" : "▼ 고급 옵션 보기"}
            </button>

            {showAdvanced && (
              <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700 space-y-6 text-sm">
                {/* 부정 프롬프트 */}
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-semibold text-white">부정 프롬프트 입력</label>
                  <textarea
                    className="w-full h-24 p-3 rounded-md bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 resize-none"
                    placeholder="예: 비정상적인 손가락"
                    value={advancedOptions.negative_prompt}
                    onChange={(e) => setAdvancedOptions({ ...advancedOptions, negative_prompt: e.target.value })}
                  />
                </div>

                {/* Inference Steps */}
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold text-white">Inference Steps: {advancedOptions.inference_steps}</label>
                  <input
                    type="range"
                    min={5}
                    max={50}
                    value={advancedOptions.inference_steps}
                    onChange={(e) => setAdvancedOptions({ ...advancedOptions, inference_steps: Number(e.target.value) })}
                    className="range range-sm w-full accent-blue-500"
                  />
                </div>

                {/* Guidance Scale */}
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold text-white">Guidance Scale: {advancedOptions.guidance_scale}</label>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    step={0.5}
                    value={advancedOptions.guidance_scale}
                    onChange={(e) => setAdvancedOptions({ ...advancedOptions, guidance_scale: Number(e.target.value) })}
                    className="range range-sm w-full accent-blue-500"
                  />
                </div>

                {/* Clip Skip */}
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-semibold text-white">Clip Skip: {advancedOptions.clip_skip}</label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={advancedOptions.clip_skip}
                    onChange={(e) => setAdvancedOptions({ ...advancedOptions, clip_skip: Number(e.target.value) })}
                    className="w-full p-3 rounded-md bg-zinc-900 border border-zinc-700 text-white"
                  />
                </div>
              </div>
            )}
          </div>

          <hr className="border-zinc-700 my-4" />

          {/* 생성 버튼 */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 text-base"
          >
            {loading ? "이미지 생성 중..." : "이미지 생성"}
          </button>

        </aside>

        {/* 생성 결과 영역 (15/20) */}
        <section className="w-15/20 p-6 bg-[#0c0c0c]">
          <h2 className="text-base font-semibold mb-4">생성 결과</h2>
          {imageUrls.length > 0 ? (
            <div className="flex gap-4">
              {imageUrls.map((url, idx) => (
                <ImageDisplay key={idx} image={url} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-12 text-center">
              이미지가 여기에 표시됩니다.
            </p>
          )}
        </section>



      </div>
    </div>
  );
};

export default Txt2ImgPage;
