import { Routes, Route } from "react-router-dom";
import Calculator from "./pages/Calculator";
import Audit from "./pages/Audit";
import ActivitySelector from "./pages/ActivitySelector";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Calculator />} />
      {/* <Route path="/audit" element={<Audit />} />
      <Route path="/activity" element={<ActivitySelector />} /> */}
    </Routes>
  );
}

export default App;
