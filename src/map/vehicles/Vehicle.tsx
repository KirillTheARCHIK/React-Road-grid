import { Route } from "../../tools/pathTool";

export class Vehicle {
  constructor(
    public initialRoute: Route,
    public restRoute: Route,
  ){}
}