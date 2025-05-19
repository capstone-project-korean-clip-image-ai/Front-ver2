import { useState } from "react";

const ObjectSelection = ({ objects, onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleObjClick = (object, index) => {
    setSelectedIndex(index);
    onSelect?.(object); // 선택 시 바로 상위 전달
  };

  return (
    <div className="border p-4">
      <h3 className="mb-2 font-semibold">수정 영역 선택</h3>

      {objects.length > 0 ? (
        <div className="grid grid-cols-3 gap-2">
          {objects.map((object, index) => (
            <div
              key={index}
              onClick={() => handleObjClick(object, index)}
              className={`cursor-pointer border p-2 hover:border-2 hover:border-gray-700 ${
                selectedIndex === index ? "ring-warning ring-4" : ""
              }`}
            >
              <img
                src={object}
                alt={`객체 ${index + 1}`}
                className="h-auto w-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <p>탐지된 객체가 없습니다.</p>
      )}
    </div>
  );
};

export default ObjectSelection;
