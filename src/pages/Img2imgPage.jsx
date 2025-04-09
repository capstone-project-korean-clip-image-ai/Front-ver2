import React, { useState, useEffect } from "react";
import axios from 'axios';
import ImageUploader from "../components/img2img/ImageUploader";
import ObjectSelection from "../components/img2img/ObjectSelection";
import ImageDisplay from "../components/txt2img/ImageDisplay";

const Img2ImgPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [detectedObjects, setDetectedObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleDetect = async (file, coords) => {
    if (!file || !coords) return;

    setUploadedImage(file);
    setLoading(true);
    try {
      const upload_image = new FormData();
      upload_image.append("file", file);
      upload_image.append("x", coords.x);
      upload_image.append("y", coords.y);

      // 업로드한 이미지 SAM으로 객체 탐지 후, 탐지한 사진 경로 반환
      const obj_detect = await axios.post("http://localhost:8000/img2img/object_detect", upload_image);
      const obj_paths = obj_detect.data[1]

      // 디버깅 로그 추가
      // console.log("Axios 응답 전체:", obj_detect);
      // console.log("받은 객체 목록:", obj_paths);

      const imageUrls = [];

      for (let i=0; i<obj_paths.length; i++) {
        // 이미지 경로를 파라미터로 전송
        const obj_img = await axios.get(`http://localhost:8000/img2img/detected_image`, {
          params: { image_path: obj_paths[i] },
          responseType: "blob",
        });

        // Blob을 URL로 변환하여 배열에 저장
        console.log(obj_img);
        const imgUrl = URL.createObjectURL(obj_img.data);
        imageUrls.push(imgUrl);
        console.log(`받은 이미지 URL: ${imgUrl}`);
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

  const handleObjectSelect = (object) => {
    setSelectedObject(object);
    // console.log(uploadedImage);
    console.log(object);
  };

  return (
    <div className="flex flex-col h-70vh max-w-screen-2xl gap-4 p-4 mx-auto sm:flex-row">
        <div className="relative flex-1">
          <ImageUploader onDetect={handleDetect} loading={loading} />
        </div>
        <div className="relative flex-1">
          <ObjectSelection objects={detectedObjects} onSelect={handleObjectSelect} />
        </div>
        <div className="relative flex-1">
          <div className="border">
            <p>수정된 이미지 </p>
          </div>
        </div>
    </div>
  );
};

export default Img2ImgPage;
