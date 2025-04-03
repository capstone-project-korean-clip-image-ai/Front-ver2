import React from "react";

const ImageDisplay = ({ image }) => {
  return (
    <div className="grid justify-items-center">
      <img src={image} alt="Generated" />
    </div>
  );
};

export default ImageDisplay;
