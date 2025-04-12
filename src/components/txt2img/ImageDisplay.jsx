const ImageDisplay = ({ image }) => {
  if (!image || image.length === 0) return <p>생성된 이미지가 없습니다.</p>;

  return (
    <div className="grid grid-cols-4 gap-4">
      {image.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`생성된 이미지 ${index + 1}`}
          className="border shadow"
        />
      ))}
    </div>
  );
};

export default ImageDisplay;
