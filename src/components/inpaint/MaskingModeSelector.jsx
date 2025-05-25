const MaskingModeSelector = ({ maskingMode, setMaskingMode }) => {
  const modes = [
    { value: "sam", label: "탐지" },
    { value: "drawing", label: "그리기" },
    { value: "search", label: "검색" },
  ];

  return (
    <div className="flex gap-4 px-4 justify-start">
      {modes.map((mode) => (
        <label
          key={mode.value}
          className="flex cursor-pointer items-center gap-2"
        >
          <input
            type="radio"
            name="masking-mode"
            className="radio radio-primary"
            value={mode.value}
            checked={maskingMode === mode.value}
            onChange={(e) => setMaskingMode(e.target.value)}
          />
          <span>{mode.label}</span>
        </label>
      ))}
    </div>
  );
};

export default MaskingModeSelector;
