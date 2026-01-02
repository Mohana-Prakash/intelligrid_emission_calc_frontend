import { resolveFlightScopeId } from "./config";

export function resolveScopeId(mode, values) {
  console.log(values);

  switch (mode) {
    case "flight":
      return resolveFlightScopeId({
        origin_detail: values.origin,
        destination_detail: values.destination,
        cabin_class: values.cabin_class,
      });

    case "car_by_size":
      return `car_${values.fuel_type}_${values.size}_${values.distance_unit}`;

    case "car_by_market_segment":
      return `car_${values.fuel_type}_${values.segment}_${values.distance_unit}`;

    case "motorbike":
      return `motorbike_${values.size}_${values.distance_unit}`;

    case "taxi":
      return `taxi_${values.type}_passenger_km`;

    // case "bus":
    //   return `bus_${values.type}`;

    // case "rail":
    //   return `rail_${values.type}`;

    default:
      return null;
  }
}
