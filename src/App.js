import { Routes, Route } from "react-router-dom";
import Calculator from "./pages/Calculator";
import Audit from "./pages/Audit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Calculator />} />
      <Route path="/audit" element={<Audit />} />
    </Routes>
  );
}

export default App;
