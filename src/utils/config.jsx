import {
  Plane,
  Car,
  Bus,
  TrainFront,
  Bike,
  Ship,
  CarTaxiFront,
} from "lucide-react";
import { CalculateFlightDistance } from "../components/flightComp/FlightDistanceCalc";

export const TRANSPORTS = [
  { id: "flight", label: "Flight", icon: Plane },
  { id: "car_by_size", label: "Car (by size)", icon: Car },
  { id: "car_by_market_segment", label: "Car (by market segment)", icon: Car },
  { id: "motorbike", label: "Motorbike", icon: Bike },
  { id: "taxi", label: "Taxi", icon: CarTaxiFront },
  // { id: "bus", label: "Bus", icon: Bus },
  // { id: "rail", label: "Rail", icon: TrainFront },
  // { id: "ferry", label: "Ferry", icon: Ship },
];

export const CALCULATOR_SCHEMA = {
  flight: {
    inputs: ["origin", "destination", "cabin_class", "trip_type"],
    cabinClasses: [
      {
        label: "Average",
        key: "average",
      },
      {
        label: "Economy",
        key: "economy",
      },
      {
        label: "Premium Economy",
        key: "premiumEconomy",
      },
      {
        label: "Business",
        key: "business",
      },
      {
        label: "First Class",
        key: "first",
      },
    ],
    tripTypes: ["one_way", "round_trip"],
  },

  car_by_size: {
    inputs: ["distance", "size"],
    sizes: [
      {
        label: "Small",
        key: "small",
      },
      {
        label: "Medium",
        key: "medium",
      },
      {
        label: "Large",
        key: "large",
      },
      {
        label: "Average",
        key: "average",
      },
    ],
  },

  car_by_market_segment: {
    inputs: ["distance", "segment"],
    segments: [
      {
        label: "Mini",
        key: "mini",
      },
      {
        label: "Supermini",
        key: "supermini",
      },
      {
        label: "Lower Medium",
        key: "lowerMedium",
      },
      {
        label: "Upper Medium",
        key: "upperMedium",
      },
      {
        label: "Executive",
        key: "executive",
      },
      {
        label: "Luxury",
        key: "luxury",
      },
      {
        label: "Sports",
        key: "sports",
      },
      {
        label: "Dual Purpose 4x4",
        key: "dualPurpose4x4",
      },
      {
        label: "MPV",
        key: "mpv",
      },
    ],
  },

  motorbike: {
    inputs: ["distance", "size"],
    sizes: [
      {
        label: "Small",
        key: "small",
      },
      {
        label: "Medium",
        key: "medium",
      },
      {
        label: "Large",
        key: "large",
      },
      {
        label: "Average",
        key: "average",
      },
    ],
  },

  taxi: {
    inputs: ["distance", "type"],
    types: ["regular", "premium"],
  },

  // bus: {
  //   inputs: ["distance", "type"],
  //   types: ["local", "coach"],
  // },

  // rail: {
  //   inputs: ["distance", "type"],
  //   types: ["national", "metro"],
  // },
};

export const FLIGHT_RULES = {
  haul: {
    short: { max: 1500 }, // km
    long: { min: 1500 },
  },

  ukCheck: (origin, destination) =>
    origin === "Great Britain" || destination === "Great Britain",

  cabinClasses: {
    short_haul: ["average", "economy", "business"],
    long_haul: ["average", "economy", "premiumEconomy", "business", "first"],
    non_uk: ["average", "economy", "premiumEconomy", "business", "first"],
  },
};

export function resolveFlightScopeId({
  origin_detail,
  destination_detail,
  cabin_class,
}) {
  const isUK = FLIGHT_RULES.ukCheck(
    origin_detail.country,
    destination_detail.country
  );

  const distance_km = CalculateFlightDistance(
    origin_detail.lat,
    origin_detail.lon,
    destination_detail.lat,
    destination_detail.lon
  );

  // console.log(
  //   origin_detail,
  //   destination_detail,
  //   cabin_class,
  //   distance_km,
  //   isUK
  // );
  // NON-UK flights
  if (!isUK) {
    if (!FLIGHT_RULES.cabinClasses.non_uk.includes(cabin_class)) {
      throw new Error("Invalid cabin class for non-UK flight");
    }
    return `non_uk_${cabin_class}`;
  }

  // UK flights
  if (isUK && distance_km < FLIGHT_RULES.haul.short.max) {
    if (!FLIGHT_RULES.cabinClasses.short_haul.includes(cabin_class)) {
      throw new Error("Invalid cabin class for short haul");
    }
    return `uk_shortHaul_${cabin_class}`;
  }

  if (!FLIGHT_RULES.cabinClasses.long_haul.includes(cabin_class)) {
    throw new Error("Invalid cabin class for long haul");
  }

  return `uk_longHaul_${cabin_class}`;
}
