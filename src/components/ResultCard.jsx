export default function ResultCard({ result }) {
  return (
    <div className="mt-4 p-4 bg-red-50 border border-red-600 rounded">
      <p className="text-red-600 text-xl text-center font-semibold">
        {result.emission.toFixed(4)} <span className="text-sm">kg CO₂e</span>
      </p>
      {/* <p className="text-sm text-gray-500">
        Source: {result.source} ({result.year})
      </p> */}
    </div>
  );
}
