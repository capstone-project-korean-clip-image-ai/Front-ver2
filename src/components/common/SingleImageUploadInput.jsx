const SingleImageUploadInput = ({
  onChange,
  disabled,
  imgUploading,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        disabled={disabled}
        className="file-input file-input-bordered w-full"
      />
      {imgUploading && <p className="text-sm text-gray-500">업로드 중...</p>}
    </div>
  );
};

export default SingleImageUploadInput;
