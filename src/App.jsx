import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Txt2ImgPage from "./pages/txt2img/Txt2ImgPage";
import Navbar from "./layout/Navbar";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col w-full min-h-screen">
        <Navbar />
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Txt2ImgPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
