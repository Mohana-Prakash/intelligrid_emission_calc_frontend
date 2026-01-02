import { TRANSPORTS } from "../utils/config";

export default function TransportSelector({ selected, onSelect }) {
  return (
    <div className="">
      {TRANSPORTS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`p-3 mb-2 w-full border rounded flex flex-col items-center
            ${selected === id ? "bg-green-50 border-green-600" : ""}`}
        >
          <Icon className="w-5 h-5 mb-1" />
          <span className="text-sm">{label}</span>
        </button>
      ))}
    </div>
  );
}
