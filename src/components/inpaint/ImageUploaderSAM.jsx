import { useState, useRef } from "react";

const ImageUploaderSAM = ({ image, onDetect, loading }) => {
  const [marker, setMarker] = useState(null);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  const handleImageClick = (e) => {
    if (loading) return; // disable click when loading
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
    setMarker({ x: clickX, y: clickY }); // 화면 좌표
    const coords = { x: imgX, y: imgY }; // 원본 이미지 좌표
    // 클릭된 좌표를 즉시 부모로 전달
    onDetect?.(coords);
  };

  return (
    <div className="w-full p-4">
      {image && (
        <div className="flex flex-col gap-4">
          <p className="text-sm">수정하고 싶은 부분을 클릭해주세요</p>
          <div
            ref={containerRef}
            className={`relative mx-auto flex aspect-square w-full ${
              loading ? "cursor-wait" : "cursor-crosshair"
            } items-center justify-center overflow-hidden rounded-md border border-gray-600 shadow-md`}
            onClick={handleImageClick}
          >
            <div className="absolute h-full w-full overflow-hidden">
              <img
                src={image}
                alt="배경"
                className="h-full w-full object-cover blur-md brightness-50"
              />
            </div>
            <div className="relative z-10 flex h-full items-center justify-center">
              <img
                ref={imgRef}
                src={image}
                alt="업로드된 이미지"
                className="h-full w-full object-contain"
              />
            </div>

            <div
              className="absolute z-20 h-3 w-3 rounded-full border border-white bg-red-500"
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
            {loading && (
              <div className="absolute inset-0 z-30 flex items-center justify-center rounded-md bg-black/70">
                <span className="loading loading-spinner loading-xl"></span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploaderSAM;
