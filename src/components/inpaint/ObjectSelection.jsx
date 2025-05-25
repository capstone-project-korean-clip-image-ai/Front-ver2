import { useState } from "react";

const ObjectSelection = ({ objects, selected, onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleObjClick = (object, index) => {
    setSelectedIndex(index);
    onSelect?.(object); // 선택 시 바로 상위 전달
  };

  return (
    <div className="px-4 py-2">
      <div className="flex flex-row gap-x-2">
        <p className="mb-4">수정할 영역을 선택해주세요</p>
        <p className="text-md font-medium text-gray-500">(하얀부분이 수정할 영역)</p>
      </div>

      {objects.length > 0 ? (
        <div className="grid grid-cols-3 gap-2">
          {objects.map((object, index) => (
            <div
              key={index}
              onClick={() => handleObjClick(object, index)}
              className={`cursor-pointer rounded-md border-2 border-transparent hover:border-2 hover:border-gray-500 ${
                selected === object || selectedIndex === index
                  ? "ring-primary ring-4"
                  : ""
              }`}
            >
              <img
                src={object}
                alt={`객체 ${index + 1}`}
                className="h-auto w-full rounded-md border border-gray-600 object-cover shadow-md"
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
