import { Building, RoadNodeBuilding } from "./buildings";

export function buildPath(from: RoadNodeBuilding, to: RoadNodeBuilding):  RoadNodeBuilding[] | undefined {
  const path: RoadNodeBuilding[] = [];
  const skipped: RoadNodeBuilding[] = [];

  const nextConnections = from.connects;
  nextConnections.sort((a,b)=>{
    const aLessThanb = a.distanceTo(to) < b.distanceTo(to);
    return aLessThanb ? -1 : 1;
  });
  for (const nextRoadNode of nextConnections) {
    const nextPath = buildPath(nextRoadNode, to);
    if (nextPath) {
      return [from, ...nextPath];
    }
  }

  return undefined;
}