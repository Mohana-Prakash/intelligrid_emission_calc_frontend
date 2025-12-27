import { useState } from "react";

export default function EditEmissionModal({ record, onSave, onClose }) {
  const [form, setForm] = useState({ ...record });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Edit Emission Factor</h2>

        {Object.keys(form).map((key) =>
          key === "_id" ? null : (
            <div key={key} className="mb-2">
              <label className="text-sm text-gray-600">{key}</label>
              <input
                name={key}
                value={form[key]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                disabled={key === "value" || key === "scope_id"}
              />
            </div>
          )
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
