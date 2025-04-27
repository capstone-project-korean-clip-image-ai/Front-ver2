const ImageDisplay = ({ image }) => {
  if (!image) return <p>이미지가 없습니다.</p>;

  return (
    <div className="w-full overflow-hidden rounded-lg border border-zinc-700 shadow-md bg-[#0c0c0c]">
      <img
        src={image}
        alt="생성된 이미지"
        className="object-contain w-full h-full"
      />
    </div>
  );
};

export default ImageDisplay;
