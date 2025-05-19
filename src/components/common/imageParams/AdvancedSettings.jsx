const AdvancedSettings = ({ advancedOptions, setAdvancedOptions }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdvancedOptions({
      ...advancedOptions,
      [name]: value,
    });
  };

  return (
    <div className="advanced-settings space-y-2">
      <div className="input-form">
        <label htmlFor="negative-prompt-input">부정 프롬프트 입력:</label>
        <textarea
          id="prompt-input"
          className="textarea w-full"
          value={advancedOptions.negative_prompt}
          onChange={handleChange}
          placeholder="예: 비정상적인 손가락"
        />
      </div>
      <div>
        <label htmlFor="inference_steps">Inference Steps:</label>
        <input
          type="range"
          id="inference_steps"
          name="inference_steps"
          min="0"
          max="50"
          value={advancedOptions.inference_steps}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="guidance_scale">Guidance Scale:</label>
        <input
          type="range"
          step="0.5"
          id="guidance_scale"
          name="guidance_scale"
          min="0"
          max="20"
          value={advancedOptions.guidance_scale}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="clip_skip">Clip Skip:</label>
        <input
          type="number"
          id="clip_skip"
          name="clip_skip"
          value={advancedOptions.clip_skip}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default AdvancedSettings;
