import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TransportSelector from "../components/TransportSelector";
import DynamicInputs from "../components/DynamicInputs";
import { CALCULATOR_SCHEMA } from "../utils/config";
import { resolveScopeId } from "../utils/scopeIdResolver";
import { calculateEmission } from "../api/emissionApi";

export default function Calculator() {
  const navigate = useNavigate();
  const [mode, setMode] = useState(null);
  const [values, setValues] = useState({});
  const [result, setResult] = useState(null);

  const schema = CALCULATOR_SCHEMA[mode];
  console.log(mode);

  const updateValue = (key, val) => {
    setValues({ ...values, [key]: val });
  };

  const handleCalculate = async () => {
    const scope_id = resolveScopeId(mode, values);
    const distance = Number(values.distance || 0);

    const res = await calculateEmission({ scope_id, distance });
    setResult(res.data);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/audit")}
          className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition"
        >
          Go to Audit
        </button>
      </div>
      <div className="max-w-md mx-auto">
        <TransportSelector selected={mode} onSelect={setMode} />

        <DynamicInputs schema={schema} values={values} onChange={updateValue} />

        <button
          onClick={handleCalculate}
          disabled={!mode}
          className="w-full mt-4 bg-green-600 text-white py-2 rounded"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            {result.emission.toFixed(2)} kg CO₂e
          </div>
        )}
      </div>
    </>
  );
}
