import { Routes, Route } from "react-router-dom";
import Calculator from "./pages/Calculator";
import Audit from "./pages/Audit";
import ActivitySelector from "./pages/ActivitySelector";
import CalculatorWithMultiStep from "./pages/CalculatorWithMultiStep";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Calculator />} /> */}
      <Route path="/" element={<CalculatorWithMultiStep />} />

      <Route path="/audit" element={<Audit />} />
      {/* <Route path="/activity" element={<ActivitySelector />} /> */}
    </Routes>
  );
}

export default App;
