import { createContext } from "react";
import { RoadNodeBuilding } from "../buildings";
import { Route } from "../tools/pathTool";

export interface IRoutesContext{
  routes: Array<Route>,
  setRoutes?: React.Dispatch<any>,
}

export const IRoutesContextDefaultValues = {
  routes: [],
} as IRoutesContext;

export const RoutesContext = createContext<IRoutesContext>(IRoutesContextDefaultValues);