import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  fetchEmissionFactors,
  updateEmissionFactor,
  deleteEmissionFactor,
  addEmissionFactors,
} from "../api/emissionApi";
import { TRANSPORTS } from "../utils/config";
import EditEmissionModal from "../components/EditEmissionModal";
import AddEmissionModal from "../components/AddEmissionModal";

export default function Audit() {
  const navigate = useNavigate();
  const [activity, setActivity] = useState("flight");
  const [data, setData] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchEmissionFactors(activity);
      setData(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [activity]);

  const handleAdd = async (record) => {
    await addEmissionFactors([record]); // bulk API expects array
    setAdding(false);
    loadData();
  };

  const handleSave = async (updated) => {
    await updateEmissionFactor(updated.scope_id, updated);
    setEditing(null);
    loadData();
  };

  const handleDelete = async (scopeId) => {
    if (!window.confirm("Delete this emission factor?")) return;
    await deleteEmissionFactor(scopeId);
    loadData();
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Emission Factors (DEFRA)
        </h1>

        <div className="flex gap-2">
          <button
            onClick={() => setAdding(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
          >
            <Plus size={18} />
            Add Emission Factor
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-700 transition"
          >
            Go to Calculator
          </button>
        </div>
      </div>

      {/* Activity Selector */}
      <div className="mb-6">
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="border p-2 rounded-lg text-sm"
        >
          {TRANSPORTS.map((a) => (
            <option key={a.id} value={a.id}>
              {a.label}
            </option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-500 py-10">
          Loading emission factors...
        </div>
      )}

      {/* Empty State */}
      {!loading && data.length === 0 && (
        <div className="text-center text-gray-500 py-12 border rounded-xl bg-gray-50">
          No emission factors found for this activity.
        </div>
      )}

      {/* Cards */}
      {!loading && data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((row) => (
            <div
              key={row.scope_id}
              className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-gray-500">Scope ID</p>
                  <p className="font-semibold text-gray-900">{row.scope_id}</p>
                </div>

                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                  {activity.toUpperCase()}
                </span>
              </div>

              {/* Main Content */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Unit</span>
                  <span className="font-medium">{row.unit}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Emission Factor</span>
                  <span className="text-xl font-bold text-green-600">
                    {row.value}
                  </span>
                </div>
              </div>

              {/* Raw JSON Toggle */}
              <details className="mb-4">
                <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-700">
                  View raw JSON
                </summary>
                <pre className="mt-2 bg-gray-100 p-3 rounded text-xs overflow-auto">
                  {JSON.stringify(row, null, 2)}
                </pre>
              </details>

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-3 border-t mt-auto">
                <button
                  onClick={() => setEditing(row)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(row.scope_id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {adding && (
        <AddEmissionModal onSave={handleAdd} onClose={() => setAdding(false)} />
      )}

      {editing && (
        <EditEmissionModal
          record={editing}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}
