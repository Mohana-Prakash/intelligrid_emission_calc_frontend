export default function ResultCard({ result }) {
  return (
    <div className="mt-4 p-4 bg-white border rounded">
      <p className="text-xl text-center font-semibold">
        {result.emission.toFixed(4)} kg CO₂e
      </p>
      {/* <p className="text-sm text-gray-500">
        Source: {result.source} ({result.year})
      </p> */}
    </div>
  );
}
