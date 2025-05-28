const ModeSelector = ({ img2imgMode, setImg2imgMode }) => {
  const tabs = [
    { value: "style", label: "화풍" },
    { value: "edge", label: "형태" },
    { value: "pose", label: "포즈" },
    { value: "filter", label: "대상" },
  ];
  return (
    <div className="relative">
      <div className="tabs tabs-boxed flex justify-start gap-2 rounded-md">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`tab rounded-lg border ${
              img2imgMode === tab.value
                ? "border-success bg-base-100 tab-active font-bold"
                : "border-transparent text-gray-400"
            } hover:bg-base-100 hover:border-gray-600`}
            onClick={() => setImg2imgMode(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModeSelector;
