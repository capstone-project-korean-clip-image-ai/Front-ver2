import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Txt2ImgPage from "./pages/Txt2ImgPage";
import Img2ImgPage from "./pages/Img2imgPage";
import Header from "./layout/Header";

const App = () => {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Txt2ImgPage />} />
          <Route path="/img2img" element={<Img2ImgPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
