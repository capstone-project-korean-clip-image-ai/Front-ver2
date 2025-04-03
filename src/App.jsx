import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Txt2ImgPage from "./pages/Txt2ImgPage";
import Header from "./layout/Header";

const App = () => {
  return (
    <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Txt2ImgPage />} />
        </Routes>
    </Router>
  );
};

export default App;
