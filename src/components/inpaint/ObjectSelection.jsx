import React, { useState } from "react";

const ObjectSelection = ({ objects, onErase }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);

  // 클릭한 사진
  const handleObjClick = (object, index) => {
    setSelectedIndex(index);
    setSelectedObject(object);
  };

  const handleEraseCLick = () => {
    console.log(`${selectedObject}, ${selectedIndex}`);

    if (selectedObject == null || selectedIndex == null) {
      alert("수정할 영역을 선택해주세요!");
      return;
    }

    onErase?.(selectedObject);
  };

  return (
    <div className="border p-4">
      <h3 className="mb-2 font-semibold">수정 영역 선택</h3>

      {objects.length > 0 ? (
        <div className="flex flex-col gap-2">
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
          <button
            className="btn btn-success mt-2 self-end"
            onClick={handleEraseCLick}
          >
            영역 지우기
          </button>
        </div>
      ) : (
        <p>탐지된 객체가 없습니다.</p>
      )}
    </div>
  );
};

export default ObjectSelection;
