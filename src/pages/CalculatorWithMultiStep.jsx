import { useState } from "react";
import DynamicInputs from "../components/DynamicInputs";
import {
  CALCULATOR_SCHEMA,
  DEFRA_TRANSPORTS,
  CLIMATIQ_TRANSPORTS,
} from "../utils/config";
import { resolveScopeId } from "../utils/scopeIdResolver";
import { calculateEmission } from "../api/emissionApi";
import ResultCard from "../components/ResultCard";
import { CalculateFlightDistance } from "../components/flightComp/FlightDistanceCalc";
import { useNavigate } from "react-router-dom";

const EMPTY_LEG = {
  mode: "flight",
  calculator_type: "DEFRA",
  values: {},
};

const CALCULATOR_TYPES = ["DEFRA", "AI", "CLIMATIQ"];

export default function Calculator() {
  const navigate = useNavigate();
  const [legs, setLegs] = useState([EMPTY_LEG]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transportMode, setTransportMode] = useState(DEFRA_TRANSPORTS);

  /* ---------- helpers ---------- */

  const updateLeg = (index, patch) => {
    if (patch.calculator_type) {
      setTransportMode(
        patch.calculator_type === "DEFRA" || patch.calculator_type === "AI"
          ? DEFRA_TRANSPORTS
          : CLIMATIQ_TRANSPORTS,
      );
    }
    const copy = [...legs];
    copy[index] = { ...copy[index], ...patch };
    setLegs(copy);
  };

  const updateLegValue = (index, key, value) => {
    const copy = [...legs];
    copy[index] = {
      ...copy[index],
      values: { ...copy[index].values, [key]: value },
    };
    setLegs(copy);
  };

  const addLeg = () => setLegs([...legs, EMPTY_LEG]);
  const removeLeg = (index) => setLegs(legs.filter((_, i) => i !== index));

  /* ---------- payload ---------- */

  const buildTravelSteps = () =>
    legs.map((leg, idx) => {
      const { mode, values, calculator_type } = leg;

      const distance =
        mode === "flight"
          ? CalculateFlightDistance(
              values?.origin?.lat,
              values?.origin?.lon,
              values?.destination?.lat,
              values?.destination?.lon,
            )
          : mode === "sea"
            ? CalculateFlightDistance(
                values?.origin?.LATITUDE,
                values?.origin?.LONGITUDE,
                values?.destination?.LATITUDE,
                values?.destination?.LONGITUDE,
              )
            : Number(values?.distance);

      return {
        // step_id: idx + 1,
        calculator_type,
        // scope_id: resolveScopeId(mode, values),
        activity: mode,
        attributes: {
          distance,
          distance_unit: values.distance_unit,
          trip_type: values.trip_type,
          cabin_class: values.cabin_class,
          size: values.size,
          fuel_type: values.fuel_type,
          segment: values.segment,
          type: values.type,
          ...(mode === "flight" && {
            origin: `${values.origin?.iata}, ${values.origin?.name}, ${values.origin?.city}`,
            destination: `${values.destination?.iata}, ${values.destination?.name}, ${values.destination?.city}`,
            passengers: Number(values.passengers),
          }),
        },
      };
    });

  /* ---------- calculate ---------- */

  const handleCalculate = async () => {
    setLoading(true);

    try {
      const res = await calculateEmission({
        user_id: "USER_001",
        leg_type: legs.length > 1 ? "multi_step" : "single_step",
        travel_steps: buildTravelSteps(),
      });
      setResult(res.response.totalEmission);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UI ---------- */

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Carbon Footprint Calculator
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Add one or more journey legs and calculate emissions accurately.
        </p>
      </div> */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Carbon Footprint Calculator
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Add one or more journey legs and calculate emissions accurately.
          </p>
        </div>

        <div>
          <button
            onClick={() => navigate("/audit")}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-700 transition"
          >
            Go to Audit
          </button>
          {/* <button
            onClick={() => navigate("/activity")}
            className="ml-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-700 transition"
          >
            Activity
          </button> */}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-6">
          {legs.map((leg, index) => {
            const schema = CALCULATOR_SCHEMA[leg.mode];

            return (
              <div
                key={index}
                className="bg-white border rounded-2xl shadow-sm p-5"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-gray-800">
                    Journey Leg {index + 1}
                  </h2>
                  {legs.length > 1 && (
                    <button
                      onClick={() => removeLeg(index)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* Calculator tiles */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Calculator Engine
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {CALCULATOR_TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() =>
                          updateLeg(index, { calculator_type: type })
                        }
                        className={`py-2 rounded-lg text-sm font-medium border
                          ${
                            leg.calculator_type === type
                              ? "bg-green-600 text-white border-green-600"
                              : "bg-gray-50 hover:bg-gray-100"
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transport dropdown */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Transport Mode
                  </label>
                  <select
                    value={leg.mode}
                    onChange={(e) =>
                      updateLeg(index, {
                        mode: e.target.value,
                        values: {},
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    {transportMode.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <DynamicInputs
                    schema={schema}
                    values={leg.values}
                    onChange={(key, val) => updateLegValue(index, key, val)}
                  />
                </div>
              </div>
            );
          })}

          <button
            onClick={addLeg}
            className="w-full border border-dashed rounded-xl py-3 text-sm text-gray-600 hover:bg-gray-50"
          >
            + Add another journey leg
          </button>

          <button
            onClick={handleCalculate}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-medium text-sm hover:bg-green-700"
          >
            {loading ? "Calculating…" : "Calculate Total Emissions"}
          </button>
        </div>

        <div className="lg:col-span-2 bg-white border rounded-2xl p-6">
          {!result ? (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
              Emission summary will appear here
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-4">Emission Summary</h2>
              <ResultCard result={result} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
