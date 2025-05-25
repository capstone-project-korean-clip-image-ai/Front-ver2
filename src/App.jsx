import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import GenerateLayout from "./pages/GenerateLayout";
import GenerateMain from "./pages/GenerateMain";
import InpaintMain from "./pages/InpaintMain";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<GenerateLayout />}>
        <Route index element={<Navigate to="/generate" replace />} />
        <Route path="generate" element={<GenerateMain />} />
        <Route path="inpainting" element={<InpaintMain />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
