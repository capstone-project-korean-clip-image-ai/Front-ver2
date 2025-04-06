import React, { useEffect } from "react";

const ObjectSelection = ({ objects, onSelect }) => {

  return (
    <div className="p-4 border">
      <h3>객체 선택</h3>
      <div className="grid grid-cols-3 gap-2">
        {objects.length > 0 ? (
          objects.map((object, index) => (
            <div 
              key={index} 
              onClick={() => onSelect(object)} 
              className="cursor-pointer p-2 border border-solid hover:border-2 hover:border-gray-700"
            >
              <p className="text-center">객체 {index + 1}</p>
              <img 
                src={object} 
                alt={`객체 ${index + 1}`} 
                className="object-cover" 
              />
            </div>
          ))
        ) : (
          <p>탐지된 객체가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ObjectSelection;
