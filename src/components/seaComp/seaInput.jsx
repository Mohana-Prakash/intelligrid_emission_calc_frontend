import React, { useEffect, useMemo, useState } from "react";
import rawPorts from "./ports.json";
import { useDebounce } from "../useDebounce";

function normalizeText(value) {
  return (value || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function addSearchKeyToPorts(ports) {
  return ports.map((port) => {
    const city = normalizeText(port.CITY);
    const state = normalizeText(port.STATE);
    const country = normalizeText(port.COUNTRY);

    return {
      ...port,
      searchKey: `${city} ${state} ${country}`.replace(/\s+/g, " ").trim(),
    };
  });
}

export default function PortAutocomplete({ value, onSelect, placeholder }) {
  const [ports, setPorts] = useState([]);
  const [query, setQuery] = useState(value || "");

  const debouncedQuery = useDebounce(query, 200);

  useEffect(() => {
    const processed = addSearchKeyToPorts(rawPorts);
    setPorts(processed);
  }, []);

  const results = useMemo(() => {
    if (!debouncedQuery) return [];

    const normalizedQuery = normalizeText(debouncedQuery);

    return ports
      .filter((port) => port.searchKey.includes(normalizedQuery))
      .slice(0, 8);
  }, [debouncedQuery, ports]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        className="w-full border p-2 rounded"
      />

      {results.length > 0 && (
        <ul className="absolute z-20 w-full bg-white border rounded shadow mt-1 max-h-60 overflow-y-auto">
          {results.map((port, index) => (
            <li
              key={index}
              onClick={() => {
                onSelect(port);
                setQuery(`${port.CITY}, ${port.COUNTRY}`);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              <div className="font-medium">{port.CITY}</div>
              <div className="text-xs text-gray-500">
                {port.STATE}, {port.COUNTRY}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
