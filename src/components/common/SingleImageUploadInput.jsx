const SingleImageUploadInput = ({
  label = "이미지 업로드",
  onChange,
  disabled,
  loading,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="block font-semibold">{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        disabled={disabled}
        className="file-input file-input-bordered w-full max-w-xs"
      />
      {loading && <p className="text-sm text-gray-500">업로드 중...</p>}
    </div>
  );
};

export default SingleImageUploadInput;
