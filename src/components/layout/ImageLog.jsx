import React from "react";

const ImageLog = ({ imageUrls = [] }) => {
  if (!imageUrls.length) {
    return <p className="text-gray-400">아직 생성된 이미지가 없습니다.</p>;
  }

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {imageUrls.map((url, idx) => (
          <div key={idx} className="w-full">
            <img
              src={url}
              alt={`생성 이미지 ${idx}`}
              className="h-auto w-full shadow"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageLog;
