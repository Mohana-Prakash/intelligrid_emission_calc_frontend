export default function ResultCard({ result }) {
  return (
    <div className="mt-4 p-4 bg-red-50 border border-red-600 rounded">
      <p className="text-center flex flex-col">
        <span className="text-lg font-medium text-red-600">
          {result.emission.toFixed(4)}
          <span className="ml-1 text-sm text-red-500">kg CO₂e</span>
        </span>
        <span className="ml-2 text-xs text-gray-500">
          ≈ {(result.emission / 1000).toFixed(4)} t CO₂e
        </span>
      </p>

      {/* <p className="text-sm text-gray-500">
        Source: {result.source} ({result.year})
      </p> */}
    </div>
  );
}
