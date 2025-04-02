import React from "react";

const ImageDisplay = ({ image }) => {
  return (
    <div className="image-display">
      <img src={image} alt="Generated" />
    </div>
  );
};

export default ImageDisplay;
