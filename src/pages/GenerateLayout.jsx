import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import ImageLog from "../components/layout/ImageLog";

const GenerateLayout = () => {
  const base_img_path = "/sample.jpeg";
  const [imageUrls, setImageUrls] = useState(Array(4).fill(base_img_path));

  return (
    <main className="flex h-screen">
      <Sidebar />

      <div className="flex flex-1">
        <div className="w-1/2 overflow-y-auto bg-gray-900 p-6 text-white">
          <Outlet context={{ imageUrls, setImageUrls }} />
        </div>

        <div className="w-1/2 overflow-y-auto border-l bg-white p-4">
          <ImageLog imageUrls={imageUrls} />
        </div>
      </div>
    </main>
  );
};

export default GenerateLayout;
