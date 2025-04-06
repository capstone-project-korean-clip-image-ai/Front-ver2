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
  const [step, setStep] = useState(1); // 단계 관리

  const handleUpload = async (file) => {
    setLoading(true);
    try {
      const upload_image = new FormData();
      upload_image.append("file", file);

      // 업로드한 이미지 SAM으로 객체 탐지 후, 탐지한 사진 경로 반환
      const obj_detect = await axios.post("http://localhost:8000/img2img/object_detect", upload_image);
      const obj_paths = obj_detect.data[1]

      // 디버깅 로그 추가
      console.log("Axios 응답 전체:", obj_detect);
      console.log("받은 객체 목록:", obj_paths);

      const imageUrls = [];

      for (let i=0; i<obj_paths.length; i++) {
        // 이미지 경로를 파라미터로 전송
        const obj_img = await axios.get(`http://localhost:8000/img2img/get_obj_dect_img`, {
          params: { image_path: obj_paths[i] },
          responseType: "blob",
        });

        // Blob을 URL로 변환하여 배열에 저장
        const imgUrl = URL.createObjectURL(obj_img.data);
        imageUrls.push(imgUrl);
        console.log(`받은 이미지 URL: ${imgUrl}`);
      }
      console.log(imageUrls);
      setDetectedObjects(imageUrls);
      console.log(detectedObjects);

      setStep(2);
    } catch (error) {
      console.error("이미지 업로드 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleObjectSelect = (object) => {
    setSelectedObject(object);
    setStep(3);
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">Img2Img Page</h2>
        <div className="">
          <ImageUploader onUpload={handleUpload} loading={loading} />
          <ObjectSelection objects={detectedObjects} onSelect={handleObjectSelect} />
        </div>
    </div>
  );
};

export default Img2ImgPage;
