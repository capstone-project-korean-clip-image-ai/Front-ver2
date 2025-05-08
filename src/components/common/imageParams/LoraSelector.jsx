import React from "react";

const LoraSelector = ({ lora, setLora }) => {
  return (
    <div className="lora-selector">
      <label htmlFor="lora-select">LoRA 선택:</label>
      <select
        id="lora-select"
        value={lora}
        onChange={(e) => setLora(e.target.value)}
      >
        <option value="none">없음</option>
        <option value="hanbok">한복</option>
        {/* 추가 옵션 가능 */}
      </select>
    </div>
  );
};

export default LoraSelector;
