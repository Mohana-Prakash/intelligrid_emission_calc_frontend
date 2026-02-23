import AirportAutocomplete from "./flightComp/AirportAutocomplete";
import PortAutocomplete from "./seaComp/seaInput";

const SelectInput = ({ label, value, options, onChange }) => {
  return (
    <select
      className="w-full border p-2 rounded"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>
        {label}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default function DynamicInputs({ schema, values, onChange }) {
  if (!schema) return null;

  const hasInput = (key) => schema.inputs.some((i) => i.key === key);

  return (
    <div className="space-y-3 mt-4">
      {/* ORIGIN */}
      {hasInput("airportOrigin") && (
        <AirportAutocomplete
          placeholder="Origin (City / Airport / IATA)"
          value={values.origin || ""}
          onSelect={(airport) => onChange("origin", airport)}
          label="Origin"
        />
      )}

      {/* DESTINATION */}
      {hasInput("airportDestination") && (
        <AirportAutocomplete
          placeholder="Destination (City / Airport / IATA)"
          value={values.destination || ""}
          onSelect={(airport) => onChange("destination", airport)}
          label="Destination"
        />
      )}

      {hasInput("portOrigin") && (
        <PortAutocomplete
          placeholder="Origin (City / Port)"
          value={values.origin || ""}
          onSelect={(port) => onChange("origin", port)}
          label="Origin"
        />
      )}

      {/* DESTINATION */}
      {hasInput("portDestination") && (
        <PortAutocomplete
          placeholder="Destination (City / Port)"
          value={values.destination || ""}
          onSelect={(port) => onChange("destination", port)}
          label="Destination"
        />
      )}

      {/* DISTANCE */}
      {hasInput("distance") && (
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Distance (km)"
            className="w-full border p-2 rounded"
            value={values.distance || ""}
            onChange={(e) => onChange("distance", e.target.value)}
          />
          <div className="inline-flex rounded border border-gray-300 bg-white p-1">
            <button
              type="button"
              onClick={(e) => onChange("distance_unit", "km")}
              className={`px-4 py-1 text-sm font-medium rounded transition
          ${
            values.distance_unit === "km"
              ? "bg-gray-200 text-gray-900 shadow"
              : "text-gray-500 hover:text-gray-700"
          }`}
            >
              Km
            </button>

            <button
              type="button"
              onClick={(e) => onChange("distance_unit", "miles")}
              className={`px-4 py-1 text-sm font-medium rounded transition
          ${
            values.distance_unit === "miles"
              ? "bg-gray-200 text-gray-900 shadow"
              : "text-gray-500 hover:text-gray-700"
          }`}
            >
              Mile
            </button>
          </div>
        </div>
      )}

      {/* PASSENGER */}
      {hasInput("passengers") && (
        <input
          type="number"
          placeholder="No. of Passengers"
          className="w-full border p-2 rounded"
          value={values.passengers || ""}
          onChange={(e) => onChange("passengers", e.target.value)}
        />
      )}

      {/* CABIN CLASS */}
      {schema.cabinClasses && hasInput("cabin_class") && (
        <SelectInput
          label="Cabin Class"
          value={values.cabin_class}
          onChange={(v) => onChange("cabin_class", v)}
          options={schema.cabinClasses.map((c) => ({
            label: c.label,
            value: c.key,
          }))}
        />
      )}

      {/* FUEL TYPE */}
      {schema.fuelTypes && hasInput("fuel_type") && (
        <SelectInput
          label="Fuel Type"
          value={values.fuel_type}
          onChange={(v) => onChange("fuel_type", v)}
          options={schema.fuelTypes.map((f) => ({
            label: f.label,
            value: f.key,
          }))}
        />
      )}

      {/* CAR SEGMENT */}
      {schema.segments && hasInput("segment") && (
        <SelectInput
          label="Car Segment"
          value={values.segment}
          onChange={(v) => onChange("segment", v)}
          options={schema.segments.map((s) => ({
            label: s.label,
            value: s.key,
          }))}
        />
      )}

      {/* SIZE */}
      {schema.sizes && hasInput("size") && (
        <SelectInput
          label="Size"
          value={values.size}
          onChange={(v) => onChange("size", v)}
          options={schema.sizes.map((s) => ({
            label: s.label,
            value: s.key,
          }))}
        />
      )}

      {/* TYPE */}
      {schema.types && hasInput("type") && (
        <SelectInput
          label="Type"
          value={values.type}
          onChange={(v) => onChange("type", v)}
          options={schema.types.map((t) => ({
            label: t.label,
            value: t.key,
          }))}
        />
      )}

      {/* TRIP TYPE */}
      {schema.tripTypes && hasInput("trip_type") && (
        <SelectInput
          label="Trip Type"
          value={values.trip_type}
          onChange={(v) => onChange("trip_type", v)}
          options={schema.tripTypes.map((t) => ({
            label: t === "one_way" ? "One Way" : "Round Trip",
            value: t,
          }))}
        />
      )}
    </div>
  );
}
