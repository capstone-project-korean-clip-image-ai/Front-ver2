import React from "react";

const TaskTypeSelector = ({
  mode,
  setMode,
  loading,
  maskingMode,
  selectedMask,
  forwardRef,
}) => {
  const isDisabled = loading || (maskingMode === "sam" && !selectedMask);

  return (
    <div className="flex justify-start gap-4 px-4 pt-4" ref={forwardRef}>
      <label className="flex cursor-pointer items-center gap-2">
        <input
          type="radio"
          name="task-type"
          className="radio radio-secondary"
          value="erase"
          checked={mode === "erase"}
          disabled={isDisabled}
          onChange={(e) => setMode(e.target.value)}
        />
        <span>지우기</span>
        <input
          type="radio"
          name="task-type"
          className="radio radio-success"
          value="paint"
          checked={mode === "paint"}
          disabled={isDisabled}
          onChange={(e) => setMode(e.target.value)}
        />
        <span>그리기</span>
      </label>
    </div>
  );
};

export default TaskTypeSelector;
