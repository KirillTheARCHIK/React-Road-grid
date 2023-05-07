import { Route } from "../../tools/pathTool";

export class Vehicle {
  constructor(
    public initialRoute: Route,
    public restRoute: Route,
    public currentPosOnRoadPx: number,
    public speedPx: number
  ) {}
}

export function moveVehicles(
  vehicles: Vehicle[],
  intervalSec: number
): Vehicle[] {
  let newVehicles = [...vehicles];

  for (const vehicle of newVehicles) {
    const deltaPx = vehicle.speedPx * intervalSec;
    const distanceToNextNodePx =
      vehicle.restRoute[0].distancePx - vehicle.currentPosOnRoadPx;

    if (distanceToNextNodePx > deltaPx) {
      vehicle.currentPosOnRoadPx += deltaPx;
    } else {
      //Next node
      if (vehicle.restRoute.length <= 1) {
        newVehicles = newVehicles.filter((v) => v != vehicle);
        continue;
      } else {
        vehicle.restRoute.shift();
        vehicle.currentPosOnRoadPx = deltaPx - distanceToNextNodePx;
      }
    }
  }

  return newVehicles;
}
