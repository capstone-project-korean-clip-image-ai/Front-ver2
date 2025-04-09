import React, { useState, useRef } from "react";

const ImageUploader = ({ onDetect, loading }) => {
  const [image, setImage] = useState(null); // ⬅️ file + src 통합
  const [marker, setMarker] = useState(null);
  const [imageCoords, setImageCoords] = useState(null);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const src = URL.createObjectURL(file);
      setImage({ file, src }); // ⬅️ 통합
      setMarker(null);
    } else {
      alert("이미지 파일만 업로드 가능합니다.");
    }
  };

  const handleImageClick = (e) => {
    const img = imgRef.current;
    const container = containerRef.current;
  
    // 1. 이미지 컨테이너 위치 정보 가져오기 (브라우저 기준 위치)
    const rect = container.getBoundingClientRect();
  
    // 2. 클릭 위치 (브라우저 좌표)에서 이미지 컨테이너 내부 상대 좌표로 변환
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
  
    // 3. 이미지가 그려지는 박스 크기 (보이는 크기)
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
  
    // 4. 이미지 원본 크기 (자연 해상도)
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
  
    // 5. 비율 계산을 위해 컨테이너 비율과 이미지 비율 비교
    const containerRatio = containerWidth / containerHeight;
    const imageRatio = naturalWidth / naturalHeight;
  
    let renderWidth, renderHeight;
  
    // 6. 이미지가 컨테이너 안에서 실제로 차지하는 렌더링 크기 계산 (object-contain 기준)
    if (imageRatio > containerRatio) {
      // 가로가 더 긴 경우: 가로 기준으로 꽉 채우고, 세로는 비율 유지
      renderWidth = containerWidth;
      renderHeight = containerWidth / imageRatio;
    } else {
      // 세로가 더 긴 경우: 세로 기준으로 꽉 채우고, 가로는 비율 유지
      renderHeight = containerHeight;
      renderWidth = containerHeight * imageRatio;
    }
  
    // 7. 이미지가 중앙 정렬될 때 생기는 여백 계산
    const offsetX = (containerWidth - renderWidth) / 2;
    const offsetY = (containerHeight - renderHeight) / 2;
  
    // 8. 클릭한 위치가 실제 이미지 내부가 아닐 경우 무시
    if (
      clickX < offsetX ||
      clickX > offsetX + renderWidth ||
      clickY < offsetY ||
      clickY > offsetY + renderHeight
    ) {
      console.log("이미지 바깥을 클릭했어요");
      return;
    }
  
    // 9. 이미지 내부에서 클릭한 위치를 비율로 계산 (0~1)
    const relativeX = (clickX - offsetX) / renderWidth;
    const relativeY = (clickY - offsetY) / renderHeight;
  
    // 10. 원본 이미지 좌표로 변환
    const imgX = Math.round(relativeX * naturalWidth);
    const imgY = Math.round(relativeY * naturalHeight);
  
    // 11. 마커 위치 저장
    setMarker({ x: clickX, y: clickY }); // 화면 박스 내 좌표
    setImageCoords({ x: imgX, y: imgY }); // 원본 이미지 내 좌표
    // console.log(`이미지 내부 좌표: (${imgX}, ${imgY})`);
  };

  const handleDetectClick = () => {
    if (!image || !imageCoords) {
      alert("이미지 업로드와 객체 클릭을 완료해주세요.");
      return;
    }

    onDetect?.(image.file, imageCoords); // ✅ marker 대신 imageCoords
  };

  return (
    <div className="p-4 border w-full max-w-xl">
      <label className="block mb-2 font-semibold">이미지 업로드</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={loading}
        className="file-input file-input-bordered w-full max-w-xs"
      />
      {loading && <p className="mt-2 text-sm text-gray-500">업로드 중...</p>}

      {image?.src && (
        <div className="mt-4 flex flex-col gap-4">
          <p className="text-sm">수정하고 싶은 영역을 클릭해주세요</p>
          <div
            ref={containerRef}
            className="relative w-full aspect-square border border-gray-400 bg-gray-100 cursor-crosshair"
            onClick={handleImageClick}
          >
            <img
              ref={imgRef}
              src={image.src}
              alt="미리보기"
              className="object-contain w-full h-full"
            />

            <div
              className="absolute w-3 h-3 bg-red-500 rounded-full border border-white"
              style={
                marker
                  ? {
                      left: `${marker.x - 6}px`,
                      top: `${marker.y - 6}px`,
                      pointerEvents: "none",
                    }
                  : {
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      pointerEvents: "none",
                    }
              }
            />
          </div>

          <button
            className="btn btn-success self-end"
            onClick={handleDetectClick}
          >
            객체 탐지
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
