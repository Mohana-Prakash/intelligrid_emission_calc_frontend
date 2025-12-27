export default function DynamicInputs({ schema, values, onChange }) {
  if (!schema) return null;

  return (
    <div className="space-y-3 mt-4">
      {schema.inputs.includes("distance") && (
        <input
          type="number"
          placeholder="Distance (km)"
          className="w-full border p-2 rounded"
          value={values.distance || ""}
          onChange={(e) => onChange("distance", e.target.value)}
        />
      )}

      {schema.inputs.includes("origin") && (
        <input
          placeholder="Origin (City / Airport)"
          className="w-full border p-2 rounded"
          value={values.origin || ""}
          onChange={(e) => onChange("origin", e.target.value)}
        />
      )}

      {schema.inputs.includes("destination") && (
        <input
          placeholder="Destination (City / Airport)"
          className="w-full border p-2 rounded"
          value={values.destination || ""}
          onChange={(e) => onChange("destination", e.target.value)}
        />
      )}

      {schema.cabinClasses && (
        <select
          className="w-full border p-2 rounded"
          value={values.cabin_class || ""}
          onChange={(e) => onChange("cabin_class", e.target.value)}
        >
          <option value="">Cabin Class</option>
          {schema.cabinClasses.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      )}

      {schema.tripTypes && (
        <select
          className="w-full border p-2 rounded"
          value={values.trip_type || ""}
          onChange={(e) => onChange("trip_type", e.target.value)}
        >
          <option value="">Trip Type</option>
          {schema.tripTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      )}

      {schema.segments && (
        <select
          className="w-full border p-2 rounded"
          value={values.segment || ""}
          onChange={(e) => onChange("segment", e.target.value)}
        >
          <option value="">Car Segment</option>
          {schema.segments.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      )}

      {schema.sizes && (
        <select
          className="w-full border p-2 rounded"
          value={values.size || ""}
          onChange={(e) => onChange("size", e.target.value)}
        >
          <option value="">Size</option>
          {schema.sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      )}

      {schema.types && (
        <select
          className="w-full border p-2 rounded"
          value={values.type || ""}
          onChange={(e) => onChange("type", e.target.value)}
        >
          <option value="">Type</option>
          {schema.types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
