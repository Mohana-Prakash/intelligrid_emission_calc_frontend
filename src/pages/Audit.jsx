import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  fetchEmissionFactors,
  updateEmissionFactor,
  deleteEmissionFactor,
  addEmissionFactors,
} from "../api/emissionApi";
import { ACTIVITIES } from "../utils/config";
import EditEmissionModal from "../components/EditEmissionModal";
import AddEmissionModal from "../components/AddEmissionModal";

export default function Audit() {
  const navigate = useNavigate();
  const [activity, setActivity] = useState("flight");
  const [data, setData] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);

  const loadData = async () => {
    const res = await fetchEmissionFactors(activity);
    setData(res.data);
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
    if (!window.confirm("Delete this record?")) return;
    await deleteEmissionFactor(scopeId);
    loadData();
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Emission Factors (DEFRA)</h1>
        <div className="flex">
          <button
            onClick={() => setAdding(true)}
            className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Plus /> Add Emission Factor
          </button>
          <button
            onClick={() => navigate("/")}
            className="ml-3 px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition"
          >
            Go to Calculator
          </button>
        </div>
      </div>

      {/* Activity selector */}
      <select
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        className="border p-2 rounded mb-4"
      >
        {ACTIVITIES.map((a) => (
          <option key={a.key} value={a.key}>
            {a.label}
          </option>
        ))}
      </select>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Scope ID</th>
              <th className="p-2">Unit</th>
              <th className="p-2">Value</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.scope_id} className="border-t">
                <td className="p-2 text-center">{row.scope_id}</td>
                <td className="p-2 text-center">{row.unit}</td>
                <td className="p-2 text-center">{row.value}</td>
                <td className="p-2 flex justify-center gap-2">
                  <button
                    onClick={() => setEditing(row)}
                    className="text-blue-600  text-center"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(row.scope_id)}
                    className="text-red-600  text-center"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
