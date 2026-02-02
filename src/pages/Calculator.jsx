import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TransportSelector from "../components/TransportSelector";
import DynamicInputs from "../components/DynamicInputs";
import { CALCULATOR_SCHEMA, emission_obj } from "../utils/config";
import { resolveScopeId } from "../utils/scopeIdResolver";
import { calculateEmission, fetchCalculationHistory } from "../api/emissionApi";
import ResultCard from "../components/ResultCard";
import { CalculateFlightDistance } from "../components/flightComp/FlightDistanceCalc";

export default function Calculator() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("flight");
  const [values, setValues] = useState(emission_obj);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const schema = CALCULATOR_SCHEMA[mode];

  const updateValue = (key, val) => {
    setValues({ ...values, [key]: val });
  };

  const handleCalculate = async () => {
    setLoading(true);

    try {
      const distance =
        mode === "flight"
          ? CalculateFlightDistance(
              values.origin.lat,
              values.origin.lon,
              values.destination.lat,
              values.destination.lon,
            )
          : Number(values.distance);

      if (!distance || distance <= 0) {
        alert("Please enter a valid distance greater than 0.");
        return;
      }

      const scope_id = resolveScopeId(mode, values);
      const res = await calculateEmission({
        user_id: "USER_001",
        leg_type: "single_step",
        travel_steps: [
          {
            step_id: 1,
            calculator_type: "DEFRA",
            scope_id,
            activity: mode,
            attributes: {
              distance: distance,
              distance_unit: values.distance_unit,
              trip_type: values.trip_type,

              cabin_class: values.cabin_class,
              size: values.size,
              fuel_type: values.fuel_type,
              segment: values.segment,
              type: values.type,

              ...(mode === "flight" && {
                origin: `${values.origin.name}, ${values.origin.city}`,
                destination: `${values.destination.name}, ${values.destination.city}`,
                passengers: Number(values.passengers),
              }),
            },
          },
        ],
      });

      setResult(res.data.response);
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

        <div>
          <button
            onClick={() => navigate("/audit")}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-700 transition"
          >
            Go to Audit
          </button>
          <button
            onClick={() => navigate("/activity")}
            className="ml-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-700 transition"
          >
            Activity
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-8xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 1️⃣ Transport Selector */}
          <div className="lg:col-span-1.5 bg-white border rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">
              1. Select Transport Mode
            </h2>

            <TransportSelector selected={mode} onSelect={setMode} />
          </div>

          {/* 2️⃣ Dynamic Inputs */}
          <div className="lg:col-span-2 bg-gray-50 border rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">
              2. Enter Journey Details
            </h2>

            <DynamicInputs
              schema={schema}
              values={values}
              onChange={updateValue}
            />

            {/* Action */}
            <button
              onClick={handleCalculate}
              disabled={!mode || loading}
              className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg text-sm font-medium
                   hover:bg-green-700 transition disabled:opacity-60"
            >
              {loading ? "Calculating..." : "Calculate Emissions"}
            </button>
          </div>

          {/* 3️⃣ Result */}
          <div className="lg:col-span-1 border rounded-xl p-6">
            {!result && (
              <div className="h-full flex items-center justify-center text-center text-gray-500 text-sm">
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
