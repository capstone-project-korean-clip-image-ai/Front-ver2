import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import GenerateLayout from "./pages/GenerateLayout";
import Txt2ImgMain from "./pages/Txt2ImgMain";
// import Img2ImgMain from "./pages/Img2ImgMain";
import InpaintMain from "./pages/InpaintMain";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<GenerateLayout />}>
        <Route index element={<Navigate to="/txt2img" replace />} />
        <Route path="txt2img" element={<Txt2ImgMain />} />
        {/* <Route path="img2img" element={<Img2ImgMain />} /> */}
        <Route path="inpainting" element={<InpaintMain />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
