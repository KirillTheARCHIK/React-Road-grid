import { createContext } from "react";
import { RoadNodeBuilding } from "../buildings";

export interface IRoutesContext{
  routes: Array<Array<RoadNodeBuilding>>,
  setRoutes?: React.Dispatch<any>,
}

export const IRoutesContextDefaultValues = {
  routes: [],
} as IRoutesContext;

export const RoutesContext = createContext<IRoutesContext>(IRoutesContextDefaultValues);