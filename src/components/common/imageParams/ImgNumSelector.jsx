const ImgNumSelector = ({ imgNum, setImgNum }) => {
  const handleChange = (e) => {
    setImgNum(Number(e.target.value));
  };

  return (
    <div className="relative">
      <label className="mb-1 block text-sm font-medium">이미지 개수</label>
      <input
        type="number"
        id="num"
        value={imgNum}
        onChange={handleChange}
        min="1"
        max="4"
        className="mt-2 rounded-md border border-gray-300 p-2"
      />
    </div>
  );
};

export default ImgNumSelector;
