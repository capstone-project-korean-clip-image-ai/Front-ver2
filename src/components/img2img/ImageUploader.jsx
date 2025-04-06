import React, { useState } from "react";

const ImageUploader = ({ onUpload, loading }) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      onUpload(file);
    } else {
      alert("이미지 파일만 업로드 가능합니다.");
    }
  };

  return (
    <div className="p-4 border">
      <label className="block mb-2">이미지 업로드</label>
      <input type="file" accept="image/*" onChange={handleChange} disabled={loading} />
      {loading && <p>업로드 중...</p>}
      {preview && (
        <div className="mt-4">
          <p>미리보기:</p>
          <div className="w-32 h-32 overflow-hidden bg-gray-200">
            <img
              src={preview}
              alt="미리보기"
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
