import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TransportSelector from "../components/TransportSelector";
import DynamicInputs from "../components/DynamicInputs";
import { CALCULATOR_SCHEMA } from "../utils/config";
import { resolveScopeId } from "../utils/scopeIdResolver";
import { calculateEmission } from "../api/emissionApi";
import ResultCard from "../components/ResultCard";

export default function Calculator() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("flight");
  const [values, setValues] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const schema = CALCULATOR_SCHEMA[mode];

  const updateValue = (key, val) => {
    setValues({ ...values, [key]: val });
  };

  const handleCalculate = async () => {
    if (Number(values.distance) <= 0) {
      alert("Please enter a valid distance greater than 0.");
      return;
    }

    setLoading(true);
    try {
      const scope_id = resolveScopeId(mode, values);
      const distance = Number(values.distance || 0);
      const res = await calculateEmission({ scope_id, distance });
      setResult(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResult(null);
    setValues({});
  }, [mode]);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Carbon Footprint Measurement Tool
        </h1>

        <button
          onClick={() => navigate("/audit")}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-700 transition"
        >
          Go to Audit
        </button>
      </div>

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Calculator Card */}
          <div className="lg:col-span-2 bg-white border rounded-xl shadow-sm p-6">
            {/* Step 1 */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">
                1. Select Transport Mode
              </h2>
              <TransportSelector selected={mode} onSelect={setMode} />
            </div>

            {/* Step 2 */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">
                2. Enter Journey Details
              </h2>
              <DynamicInputs
                schema={schema}
                values={values}
                onChange={updateValue}
              />
            </div>

            {/* Action */}
            <button
              onClick={handleCalculate}
              disabled={!mode || loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-green-700 transition disabled:opacity-60"
            >
              {loading ? "Calculating..." : "Calculate Emissions"}
            </button>
          </div>

          {/* Right: Result */}
          <div className="bg-gray-50 border rounded-xl p-6">
            {!result && (
              <div className="text-center text-gray-500 text-sm mt-10">
                Your emission result will appear here after calculation.
              </div>
            )}

            {result && (
              <>
                <h2 className="text-lg font-semibold mb-4">Emission Result</h2>

                <ResultCard result={result} />

                {/* Raw JSON */}
                <details className="mt-4">
                  <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-700">
                    View raw calculation data
                  </summary>
                  <pre className="mt-2 bg-gray-100 p-3 rounded text-xs overflow-auto">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </details>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
