import { useCallback, useRef, useState, useEffect } from "react";
import { Stage, Layer, Image as KonvaImage, Line } from "react-konva";
import useImage from "use-image";
import SingleImageUploadInput from "../common/SingleImageUploadInput";

const ImageUploaderDraw = ({ onUpload, loading, onRefReady }) => {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [image] = useImage(imgUrl);
  const [imageSize, setImageSize] = useState({ width: 512, height: 512 });
  const [originalSize, setOriginalSize] = useState({ width: 512, height: 512 });

  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [lines, setLines] = useState([]);
  const [brushSize, setBrushSize] = useState(40);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const url = URL.createObjectURL(file);
    setImgUrl(url);
    setLines([]);
    onUpload?.(file);
  };

  useEffect(() => {
    if (image) {
      setOriginalSize({ width: image.width, height: image.height });
    }
  }, [image]);

  useEffect(() => {
    const updateSize = () => {
      if (!image || !containerRef.current) return;

      const container = containerRef.current.getBoundingClientRect();
      const containerRatio = container.width / container.height;
      const imageRatio = image.width / image.height;

      let width, height;
      if (imageRatio > containerRatio) {
        width = container.width;
        height = container.width / imageRatio;
      } else {
        height = container.height;
        width = container.height * imageRatio;
      }

      setImageSize({ width, height });
    };

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [image]);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    const percentX = pos.x / imageSize.width;
    const percentY = pos.y / imageSize.height;
    setLines([
      ...lines,
      {
        tool: isErasing ? "eraser" : "brush",
        points: [percentX, percentY],
        strokeWidth: brushSize,
      },
    ]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const percentX = point.x / imageSize.width;
    const percentY = point.y / imageSize.height;
    const lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([percentX, percentY]);
    setLines([...lines.slice(0, -1), lastLine]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleReset = () => {
    setLines([]);
  };

  // 마스킹 데이터를 원본 이미지 크기에 맞춰서 반환
  const getMaskData = useCallback(() => {
    return new Promise((resolve) => {
      const maskLayer = stageRef.current?.findOne("#maskLayer");
      if (!maskLayer) return resolve(null);

      const displayUri = maskLayer.toDataURL({ pixelRatio: 1 });
      const tempImg = new Image();
      tempImg.src = displayUri;

      tempImg.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = originalSize.width;
        canvas.height = originalSize.height;
        const ctx = canvas.getContext("2d");

        // 1. 배경 검정색
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. 하늘색 마스크 확대 후 그리기
        ctx.drawImage(
          tempImg,
          0,
          0,
          imageSize.width,
          imageSize.height,
          0,
          0,
          originalSize.width,
          originalSize.height,
        );

        // 3. 픽셀 데이터 조작: 파란색 -> 흰색
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          const brightness = (r + g + b) / 3;
          const isMask = brightness > 30 && a > 10;

          if (isMask) {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
            data[i + 3] = 255;
          } else {
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;
            data[i + 3] = 255;
          }
        }

        ctx.putImageData(imageData, 0, 0);

        resolve(canvas.toDataURL("image/png"));
      };
    });
  }, [stageRef, originalSize, imageSize]);

  // onRefReady가 있을 경우, getMaskData를 전달, 부모 컴포넌트에서 사용 가능
  // useEffect를 사용하여 컴포넌트가 마운트될 때 onRefReady를 호출
  useEffect(() => {
    if (onRefReady) {
      onRefReady({ getMaskData });
    }
  }, [onRefReady, getMaskData]);

  return (
    <div className="w-full max-w-xl border p-4">
      <SingleImageUploadInput
        label="직접 마스킹할 이미지 선택"
        onChange={handleUpload}
        disabled={loading}
        loading={loading}
      />

      {imgUrl && image && (
        <div className="mt-4 flex flex-col gap-4">
          <p className="text-sm">수정하고 싶은 영역을 그려주세요</p>

          <div
            ref={containerRef}
            className="relative mx-auto flex aspect-square min-h-[512px] w-full items-center justify-center overflow-hidden border bg-transparent"
          >
            <Stage
              width={imageSize.width}
              height={imageSize.height}
              onMouseDown={handleMouseDown}
              onMousemove={handleMouseMove}
              onMouseup={handleMouseUp}
              ref={stageRef}
            >
              <Layer>
                <KonvaImage
                  image={image}
                  width={imageSize.width}
                  height={imageSize.height}
                />
              </Layer>
              <Layer id="maskLayer">
                {lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points.map((p, i) =>
                      i % 2 === 0 ? p * imageSize.width : p * imageSize.height,
                    )}
                    stroke={
                      line.tool === "eraser"
                        ? "rgba(0,0,0,1)"
                        : "rgba(0,128,255,0.5)"
                    }
                    strokeWidth={line.strokeWidth || brushSize}
                    tension={0.5}
                    lineCap="round"
                    globalCompositeOperation={
                      line.tool === "eraser" ? "destination-out" : "source-over"
                    }
                  />
                ))}
              </Layer>
            </Stage>
          </div>

          <div className="flex flex-col gap-6 px-1">
            <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-3">
              <div className="flex items-center gap-2">
                <label htmlFor="brush-range">브러시 크기</label>
                <input
                  id="brush-range"
                  type="range"
                  min="10"
                  max="100"
                  step="10"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="range range-xs"
                />
                <span>{brushSize}px</span>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isErasing}
                  onChange={(e) => setIsErasing(e.target.checked)}
                />
                지우개 모드
              </label>

              <button onClick={handleReset} className="btn btn-sm btn-outline">
                마스킹 초기화
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploaderDraw;
