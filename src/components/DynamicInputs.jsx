import AirportAutocomplete from "./flightComp/AirportAutocomplete";

export default function DynamicInputs({ schema, values, onChange }) {
  if (!schema) return null;

  return (
    <div className="space-y-3 mt-4">
      {/* ORIGIN */}
      {schema.inputs.includes("origin") && (
        <AirportAutocomplete
          placeholder="Origin (City / Airport / IATA)"
          value={values.origin || ""}
          onSelect={(airport) => onChange("origin", airport.iata)}
        />
      )}

      {/* DESTINATION */}
      {schema.inputs.includes("destination") && (
        <AirportAutocomplete
          placeholder="Destination (City / Airport / IATA)"
          value={values.destination || ""}
          onSelect={(airport) => onChange("destination", airport.iata)}
        />
      )}

      {/* DISTANCE */}
      {schema.inputs.includes("distance") && (
        <input
          type="number"
          placeholder="Distance (km)"
          className="w-full border p-2 rounded"
          value={values.distance || ""}
          onChange={(e) => onChange("distance", e.target.value)}
        />
      )}

      {/* CABIN CLASS */}
      {schema.cabinClasses && (
        <select
          className="w-full border p-2 rounded"
          value={values.cabinClass || ""}
          onChange={(e) => onChange("cabinClass", e.target.value)}
        >
          <option value="" disabled>
            Cabin Class
          </option>
          {schema.cabinClasses.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>
      )}

      {/* TRIP TYPE */}
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

      {/* CAR SEGMENT */}
      {schema.segments && (
        <select
          className="w-full border p-2 rounded"
          value={values.segment || ""}
          onChange={(e) => onChange("segment", e.target.value)}
        >
          <option value="" disabled>
            Car Segment
          </option>
          {schema.segments.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>
      )}

      {/* SIZE */}
      {schema.sizes && (
        <select
          className="w-full border p-2 rounded"
          value={values.size || ""}
          onChange={(e) => onChange("size", e.target.value)}
        >
          <option value="" disabled>
            Size
          </option>
          {schema.sizes.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>
      )}

      {/* TYPE */}
      {schema.types && (
        <select
          className="w-full border p-2 rounded"
          value={values.type || ""}
          onChange={(e) => onChange("type", e.target.value)}
        >
          <option value="" disabled>
            Type
          </option>
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
