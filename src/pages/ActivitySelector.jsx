import { useState } from "react";
import { ACTIVITY_TEMPLATES } from "../utils/constant";

export default function ActivitySelector() {
  const [selectedActivity, setSelectedActivity] = useState("flight");

  const requestTemplate = {
    user_id: "USER_001",
    leg_type: "single_step",
    travel_steps: [
      {
        step_id: 1,
        calculator_type: "DEFRA",
        activity: selectedActivity,
        attributes: ACTIVITY_TEMPLATES[selectedActivity],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <h1 className="text-2xl font-semibold mb-6">
        Emission Calculation – Request Payload
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Activity Selector */}
        <div className="space-y-3">
          {Object.keys(ACTIVITY_TEMPLATES).map((activity) => (
            <button
              key={activity}
              onClick={() => setSelectedActivity(activity)}
              className={`w-full rounded-xl px-4 py-3 text-left font-medium transition
                ${
                  selectedActivity === activity
                    ? "bg-black text-white"
                    : "bg-white border hover:bg-slate-100"
                }`}
            >
              {activity.replaceAll("_", " ").toUpperCase()}
            </button>
          ))}
        </div>

        {/* RIGHT: JSON Preview */}
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white border shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-lg">Request Payload</h2>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    JSON.stringify(requestTemplate, null, 2),
                  )
                }
                className="text-sm text-blue-600 hover:underline"
              >
                Copy JSON
              </button>
            </div>

            <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-auto text-sm">
              {JSON.stringify(requestTemplate, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
