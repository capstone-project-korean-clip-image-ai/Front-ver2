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
    <div className="mb-4">
      <label className="mb-1 block text-sm font-medium">이미지 비율</label>
      <select
        value={ratio}
        onChange={handleChange}
        className="mt-2 rounded-md border border-gray-300 bg-gray-500 p-2"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ImgRatioSelector;
