import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Image as KonvaImage, Line } from "react-konva";
import useImage from "use-image";
import SingleImageUploadInput from "../common/SingleImageUploadInput";

const ImageUploaderDraw = ({ onMaskDrawn }) => {
  const containerRef = useRef(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [lines, setLines] = useState([]);
  const [brushSize, setBrushSize] = useState(40);
  const stageRef = useRef(null);
  const [image] = useImage(imgUrl);
  const [imageSize, setImageSize] = useState({ width: 512, height: 512 });

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setImgUrl(url);
    setLines([]);
  };

  useEffect(() => {
    const updateSize = () => {
      if (!image || !containerRef.current) return;

      const container = containerRef.current.getBoundingClientRect();
      const containerWidth = container.width;
      const containerHeight = container.height;

      const imageRatio = image.width / image.height;
      const containerRatio = containerWidth / containerHeight;

      let renderWidth, renderHeight;
      if (imageRatio > containerRatio) {
        renderWidth = containerWidth;
        renderHeight = containerWidth / imageRatio;
      } else {
        renderHeight = containerHeight;
        renderWidth = containerHeight * imageRatio;
      }

      setImageSize({ width: renderWidth, height: renderHeight });
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
    const updatedLines = [...lines.slice(0, -1), lastLine];
    setLines(updatedLines);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleReset = () => {
    setLines([]);
  };

  const handleMaskComplete = () => {
    if (onMaskDrawn && stageRef.current) {
      const uri = stageRef.current
        .findOne("#maskLayer")
        .toDataURL({ pixelRatio: 1 });
      onMaskDrawn(uri);
      alert(
        "마스킹이 완료되었습니다. 이제 영역 지우기나 새로 그리기를 선택하세요.",
      );
    }
  };

  return (
    <div className="w-full max-w-xl border p-4">
      <SingleImageUploadInput
        label="직접 마스킹할 이미지 선택"
        onChange={handleUpload}
        disabled={false}
        loading={false}
      />

      {imgUrl && image && (
        <div className="mt-4 flex flex-col gap-4">
          <p className="text-sm">수정하고 싶은 영역을 그려주세요</p>

          <div
            ref={containerRef}
            className="relative mx-auto flex aspect-square w-full items-center justify-center overflow-hidden border bg-transparent"
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

            <div className="mt-2 self-end">
              <button
                onClick={handleMaskComplete}
                className="btn btn-sm btn-primary"
              >
                마스킹 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploaderDraw;
