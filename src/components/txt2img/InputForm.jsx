import React from "react";

const InputForm = ({ prompt, setPrompt }) => {
  return (
    <div className="input-form">
      <label htmlFor="prompt-input">프롬프트 입력:</label>
      <textarea
        id="prompt-input"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="예: a futuristic cityscape..."
      />
    </div>
  );
};

export default InputForm;
