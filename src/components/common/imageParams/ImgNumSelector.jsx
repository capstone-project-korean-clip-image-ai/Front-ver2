const ImgNumSelector = ({ imgNum, setImgNum }) => {
  const options = [
    { value: "1", label: "1장" },
    { value: "2", label: "2장" },
    { value: "3", label: "3장" },
    { value: "4", label: "4장" },
  ];

  const handleChange = (e) => {
    setImgNum(Number(e.target.value));
  };

  return (
    <div className="flex-1">
      <select
        value={imgNum}
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

export default ImgNumSelector;
