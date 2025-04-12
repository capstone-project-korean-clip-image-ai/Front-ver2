import React, { useState, useEffect } from "react";
import axios from 'axios';
import ImageUploader from "../components/img2img/ImageUploader";
import ObjectSelection from "../components/img2img/ObjectSelection";
import ImageDisplay from "../components/txt2img/ImageDisplay";

const Img2ImgPage = () => {
  const [uploadedImage, setUploadedImage] = useState([]);
  const [detectedObjects, setDetectedObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [EditedImage, setEditedImage] = useState(null);

  // 업로드한 이미지 객체 탐지 
  const handleDetect = async (file, coords) => {
    if (!file || !coords) return;

    setUploadedImage(file)
    setLoading(true);
    try {
      const upload_image = new FormData();
      upload_image.append("file", file);
      upload_image.append("x", coords.x);
      upload_image.append("y", coords.y);

      // 업로드한 이미지 SAM으로 객체 탐지 후, 탐지한 사진 경로 반환
      const obj_detect = await axios.post("http://localhost:8000/img2img/object_detect", upload_image);
      // console.log(obj_detect);
      const obj_paths = obj_detect.data[1];
      
      const imageUrls = [];

      for (let i=0; i<obj_paths.length; i++) {
        // 이미지 경로를 파라미터로 전송
        const obj_img = await axios.get(`http://localhost:8000/img2img/detected_image`, {
          params: { image_path: obj_paths[i] },
          responseType: "blob",
        });

        // Blob을 URL로 변환하여 배열에 저장
        // console.log(obj_img);
        const imgUrl = URL.createObjectURL(obj_img.data);
        imageUrls.push(imgUrl);
        // console.log(`받은 이미지 URL: ${imgUrl}`);
      }
      // console.log(imageUrls);
      setDetectedObjects(imageUrls);
      // console.log(detectedObjects);
    } catch (error) {
      console.error("이미지 업로드 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 선택 영역 지우기
  const handleObjectErase = async (object) => {
    if(!object) return;

     // blob URL -> Blob 객체
    const response = await fetch(object);
    const blob = await response.blob();

    // Blob -> File
    const object_file = new File([blob], "object.jpg", { type: blob.type });
    console.log(uploadedImage, object_file);

    setLoading(true);

    try {
      const erase_image = new FormData();
      erase_image.append("image", uploadedImage);
      erase_image.append("object", object_file);

      const erase_response = await axios.post("http://localhost:8000/img2img/erase_object", erase_image);
      console.log("받은 presigned URL:", erase_response.data.image_url);
      setEditedImage(erase_response.data.image_url);
    } catch (error) {
      console.error("객체 지우기 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 mx-auto h-70vh max-w-screen-2xl sm:flex-row">
        <div className="relative flex-1">
          <ImageUploader onDetect={handleDetect} loading={loading} />
        </div>
        <div className="relative flex-1">
          <ObjectSelection objects={detectedObjects} onErase={handleObjectErase} />
        </div>
        <div className="relative flex-1">
          <div className="flex flex-col gap-4 mt-4">
            <div className="w-full max-w-xl p-4 border">
                <p>수정된 이미지 </p>
                <img
                  src={EditedImage}
                  alt={``}
                />
            </div>
          </div>
        </div>
    </div>
  );
};

export default Img2ImgPage;
