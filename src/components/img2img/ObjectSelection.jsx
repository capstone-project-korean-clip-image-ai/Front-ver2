import React, { useState } from "react";

const ObjectSelection = ({ objects, onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClick = (object, index) => {
    setSelectedIndex(index);
    onSelect(object);
  };

  return (
    <div className="p-4 border">
      <h3 className="mb-2 font-semibold">수정 영역 선택</h3>

      {objects.length > 0 ? (
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-3 gap-2">
            {objects.map((object, index) => (
              <div
                key={index}
                onClick={() => handleClick(object, index)}
                className={`cursor-pointer p-2 border hover:border-2 hover:border-gray-700 ${
                  selectedIndex === index ? "ring-4 ring-warning" : ""
                }`}
              >
                <img
                  src={object}
                  alt={`객체 ${index + 1}`}
                  className="object-cover w-full h-auto"
                />
              </div>
            ))}
          </div>
          <button className="btn btn-success self-end mt-2">영역 지우기</button>
        </div>
      ) : (
        <p>탐지된 객체가 없습니다.</p>
      )}
    </div>
  );
};

export default ObjectSelection;
