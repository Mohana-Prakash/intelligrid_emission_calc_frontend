export function resolveScopeId(mode, values) {
  switch (mode) {
    case "flight":
      return `${
        values.origin === "UK" || values.destination === "UK" ? "uk" : "non_uk"
      }_${values.cabin_class}`;

    case "car":
      return `car_${values.segment}`;

    case "motorbike":
      return `motorbike_${values.size}`;

    case "taxi":
      return `taxi_${values.type}_passenger`;

    case "bus":
      return `bus_${values.type}`;

    case "rail":
      return `rail_${values.type}`;

    default:
      return null;
  }
}
