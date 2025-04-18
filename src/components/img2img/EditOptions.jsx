import React, { useState } from "react";

const EditOptions = ({ onErase, onRedraw }) => {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="p-4">
      <h3>수정 옵션</h3>
      <div className="space-y-2">
        <button onClick={onErase} className="btn btn-danger">
          선택 영역 지우기
        </button>
        <div>
          <input
            type="text"
            placeholder="새로 그릴 프롬프트"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="input input-bordered"
          />
          <button
            onClick={() => onRedraw(prompt)}
            className="ml-2 btn btn-success"
          >
            선택 영역 새로 그리기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOptions;
