export default function ResultCard({ result }) {
  return (
    <div className="mt-4 p-4 bg-red-50 border border-red-600 rounded">
      <p className="text-center flex flex-col">
        <span className="text-lg font-medium text-red-600">
          {result}
          <span className="ml-1 text-sm text-red-500">kg CO₂e</span>
        </span>
        <span className="ml-2 text-xs text-gray-500">
          ≈ {result / 1000} t CO₂e
        </span>
      </p>
    </div>
  );
}
