import { createContext } from "react";
import { Vehicle } from "../map/vehicles/Vehicle";

export interface IVehiclesContext{
  vehicles: Array<Vehicle>,
  setVehicles?: React.Dispatch<any>,
}

export const IVehiclesContextDefaultValues = {
  vehicles: [],
} as IVehiclesContext;

export const VehiclesContext = createContext<IVehiclesContext>(IVehiclesContextDefaultValues);