import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar"; // 사이드바 추가
import ImageUploader from "../components/img2img/ImageUploader";
import ObjectSelection from "../components/img2img/ObjectSelection";
import ImageDisplay from "../components/txt2img/ImageDisplay";

const Img2ImgPage = () => {
  const [uploadedImage, setUploadedImage] = useState([]);
  const [detectedObjects, setDetectedObjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editedImage, setEditedImage] = useState(null);

  const handleDetect = async (file, coords) => {
    if (!file || !coords) return;

    setUploadedImage(file);
    setLoading(true);

    try {
      const upload_image = new FormData();
      upload_image.append("file", file);
      upload_image.append("x", coords.x);
      upload_image.append("y", coords.y);

      const obj_detect = await axios.post(
        "http://localhost:8000/img2img/object_detect",
        upload_image
      );

      const obj_paths = obj_detect.data[1];
      const imageUrls = [];

      for (let i = 0; i < obj_paths.length; i++) {
        const obj_img = await axios.get(
          "http://localhost:8000/img2img/detected_image",
          {
            params: { image_path: obj_paths[i] },
            responseType: "blob",
          }
        );
        const imgUrl = URL.createObjectURL(obj_img.data);
        imageUrls.push(imgUrl);
      }

      setDetectedObjects(imageUrls);
    } catch (error) {
      console.error("이미지 업로드 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleObjectErase = async (object) => {
    if (!object) return;

    const response = await fetch(object);
    const blob = await response.blob();
    const object_file = new File([blob], "object.jpg", { type: blob.type });

    setLoading(true);

    try {
      const erase_image = new FormData();
      erase_image.append("image", uploadedImage);
      erase_image.append("object", object_file);

      const erase_response = await axios.post(
        "http://localhost:8000/img2img/erase_object",
        erase_image
      );
      setEditedImage(erase_response.data.image_url);
    } catch (error) {
      console.error("객체 지우기 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0c0c0c] text-white">
      
      {/* 좌측 고정 사이드바 */}
      <Sidebar />

      {/* 본문 전체 */}
      <div className="flex flex-1 p-6 gap-6">
        
        {/* 업로드 영역 */}
        <div className="flex-1 bg-[#1a1a1a] p-6 rounded-lg border border-zinc-700 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">이미지 업로드</h2>
          <div className="flex-1">
            <ImageUploader onDetect={handleDetect} loading={loading} />
          </div>
        </div>

        {/* 객체 선택 영역 */}
        <div className="flex-1 bg-[#1a1a1a] p-6 rounded-lg border border-zinc-700 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">수정할 영역 선택</h2>
          <div className="flex-1 overflow-y-auto">
            <ObjectSelection
              objects={detectedObjects}
              onErase={handleObjectErase}
            />
          </div>
        </div>

        {/* 수정된 이미지 출력 영역 */}
        <div className="flex-1 bg-[#1a1a1a] p-6 rounded-lg border border-zinc-700 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">수정된 이미지</h2>
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            {editedImage ? (
              <img
                src={editedImage}
                alt="수정된 이미지"
                className="max-w-full max-h-full rounded-md"
              />
            ) : (
              <p className="text-gray-500">수정된 이미지가 없습니다.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Img2ImgPage;
