import { useState, useMemo } from "react";
import airports from "./airports.json";
import { useDebounce } from "./useDebounce";

export default function AirportAutocomplete({
  value,
  onSelect,
  placeholder,
  label,
}) {
  const [query, setQuery] = useState(value || "");
  const debouncedQuery = useDebounce(query, 300);

  const results = useMemo(() => {
    if (!debouncedQuery) return [];

    const q = debouncedQuery.toLowerCase();

    return airports
      .filter(
        (a) =>
          (a.iata?.toLowerCase() || "").includes(q) ||
          (a.name?.toLowerCase() || "").includes(q) ||
          (a.city?.toLowerCase() || "").includes(q) ||
          (a.country?.toLowerCase() || "").includes(q)
      )
      .slice(0, 8);
  }, [debouncedQuery]);

  return (
    <div className="relative">
      {/* <label className="mb-2 text-sm text-gray-500">{label}</label> */}
      <input
        className="w-full border p-2 rounded"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {results.length > 0 && (
        <ul className="absolute z-20 w-full bg-white border rounded shadow mt-1 max-h-60 overflow-y-auto">
          {results.map((a) => (
            <li
              key={a.iata}
              onClick={() => {
                onSelect(a);
                setQuery(`${a.city} (${a.iata})`);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              <div className="font-medium">
                {a.city} ({a.iata})
              </div>
              <div className="text-xs text-gray-500">
                {a.name}, {a.country}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
