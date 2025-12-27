import {
  Plane,
  Car,
  Bus,
  TrainFront,
  Bike,
  Ship,
  CarTaxiFront,
} from "lucide-react";

export const TRANSPORTS = [
  { id: "flight", label: "Flight", icon: Plane },
  { id: "car_by_size", label: "Car (by size)", icon: Car },
  { id: "car_by_market_segment", label: "Car (by market segment)", icon: Car },
  { id: "motorbike", label: "Motorbike", icon: Bike },
  { id: "taxi", label: "Taxi", icon: CarTaxiFront },
  { id: "bus", label: "Bus", icon: Bus },
  { id: "rail", label: "Rail", icon: TrainFront },
  { id: "ferry", label: "Ferry", icon: Ship },
];

export const ACTIVITIES = [
  { key: "flight", label: "Flight" },
  { key: "car_by_size", label: "Car (by size)" },
  { key: "car_by_market_segment", label: "Car (by market segment)" },
  { key: "motorbike", label: "Motorbike" },
  { key: "taxi", label: "Taxi" },
  { key: "bus", label: "Bus" },
  { key: "rail", label: "Rail" },
  { key: "ferry", label: "Ferry" },
];

export const CALCULATOR_SCHEMA = {
  flight: {
    inputs: ["origin", "destination", "cabin_class", "trip_type"],
    cabinClasses: ["economy", "premiumEconomy", "business", "first"],
    tripTypes: ["one_way", "round_trip"],
  },

  car_by_size: {
    inputs: ["distance", "size"],
    sizes: ["small", "medium", "large", "executive", "luxury"],
  },

  car_by_market_segment: {
    inputs: ["distance", "segment"],
    segments: ["small", "medium", "large", "executive", "luxury"],
  },

  motorbike: {
    inputs: ["distance", "size"],
    sizes: ["small", "medium", "large", "average"],
  },

  taxi: {
    inputs: ["distance", "type"],
    types: ["regular", "premium"],
  },

  bus: {
    inputs: ["distance", "type"],
    types: ["local", "coach"],
  },

  rail: {
    inputs: ["distance", "type"],
    types: ["national", "metro"],
  },

  ferry: {
    inputs: ["distance", "type"],
    types: ["national", "metro"],
  },
};
