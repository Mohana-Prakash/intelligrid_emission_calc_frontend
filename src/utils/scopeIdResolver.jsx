import { resolveFlightScopeId } from "./config";

export function resolveScopeId(mode, values) {
  console.log(values);

  switch (mode) {
    case "flight":
      return resolveFlightScopeId({
        origin_country: values.origin,
        destination_country: values.destination,
        distance_km: Number(values.distance),
        cabin_class: values.cabin_class,
      });

    case "car_by_size":
      return `car_${values.size}`;

    case "car_by_market_segment":
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
