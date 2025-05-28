const AdvancedSettings = ({ advancedOptions, setAdvancedOptions }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdvancedOptions({
      ...advancedOptions,
      [name]: value,
    });
  };

  return (
    <div className="advanced-settings z-10 space-y-2">
      <div className="input-form mb-4 space-y-4">
        <p className="text-md font-medium text-white"> 부정 프롬프트 </p>
        <textarea
          id="prompt-input"
          name="negative_prompt"
          className="textarea w-full"
          value={advancedOptions.negative_prompt}
          onChange={handleChange}
          placeholder="예: 비정상적인 손가락"
        />
      </div>
      {/* Inference Steps */}
      <div className="flex items-center justify-between">
        <label htmlFor="inference_steps" className="text-sm font-medium">
          Inference Steps
        </label>
        <div className="flex w-2/3 items-center space-x-2">
          <input
            type="range"
            id="inference_steps"
            name="inference_steps"
            min="0"
            max="50"
            className="range range-sm flex-1"
            value={advancedOptions.inference_steps}
            onChange={handleChange}
          />
          <input
            type="number"
            id="inference_steps"
            name="inference_steps"
            min="0"
            max="50"
            className="input input-xs w-12 text-right"
            value={advancedOptions.inference_steps}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Guidance Scale */}
      <div className="flex items-center justify-between">
        <label htmlFor="guidance_scale" className="text-sm font-medium">
          Guidance Scale (CFG)
        </label>
        <div className="flex w-2/3 items-center space-x-2">
          <input
            type="range"
            step="0.5"
            id="guidance_scale"
            name="guidance_scale"
            min="0"
            max="20"
            className="range range-sm flex-1"
            value={advancedOptions.guidance_scale}
            onChange={handleChange}
          />
          <input
            type="number"
            step="0.5"
            id="guidance_scale"
            name="guidance_scale"
            min="0"
            max="20"
            className="input input-xs w-12 text-right"
            value={advancedOptions.guidance_scale}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <label htmlFor="clip_skip">Clip Skip:</label>
        <div className="flex w-2/3 items-center space-x-2">
          <input
            type="range"
            step="1"
            id="clip_skip"
            min="0"
            max="2"
            name="clip_skip"
            className="range range-sm flex-1"
            value={advancedOptions.clip_skip}
            onChange={handleChange}
          />
          <input
            type="number"
            step="1"
            id="clip_skip"
            min="0"
            max="2"
            name="clip_skip"
            className="input input-xs w-12 text-right"
            value={advancedOptions.clip_skip}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;
