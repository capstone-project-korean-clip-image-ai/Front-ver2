const ImgRatioSelector = ({ ratio, setRatio }) => {
  const options = [
    { value: "512x512", label: "512 × 512" },
    { value: "512x768", label: "512 × 768" },
    { value: "768x512", label: "768 × 512" },
    { value: "1024x576", label: "1024 × 576" },
  ];

  const handleChange = (e) => {
    setRatio(e.target.value);
  };

  return (
    <div className="flex-1">
      <select
        value={ratio}
        onChange={handleChange}
        className="select bg-base-100 hover:bg-base-300 flex h-full w-full items-center gap-2 rounded-lg border border-gray-600 p-2 shadow-md"
      >
        {options.map((opt) => (
          <option className="bg-base-100" key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ImgRatioSelector;
