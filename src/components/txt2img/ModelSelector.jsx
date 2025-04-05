import React from "react";

const ModelSelector = ({ model, setModel }) => {
  return (
    <div className="model-selector">
      <label htmlFor="model-select">모델 선택:</label>
      <select
        id="model-select"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      >
        <option value="base">Stable Diffusion 1.5</option>
        <option value="DreamShaper">DreamShaper</option>
        {/* 향후 모델 추가 */}
      </select>
    </div>
  );
};

export default ModelSelector;
