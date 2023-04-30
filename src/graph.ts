import { Building, RoadNodeBuilding } from "./buildings";

export function buildPath(
  from: RoadNodeBuilding,
  to: RoadNodeBuilding,
  previous: RoadNodeBuilding[] = []
): RoadNodeBuilding[] | undefined {
  const findFinish = from.connects.find((b) => b == to);
  if (findFinish) {
    return [from, findFinish];
  }

  const nextConnections = from.connects.filter((node) =>
    previous.every((prNode) => prNode != node)
  );
  nextConnections.sort((a, b) => {
    const aLessThanb = a.distanceTo(to) < b.distanceTo(to);
    return aLessThanb ? -1 : 1;
  });
  for (const nextRoadNode of nextConnections) {
    const nextPath = buildPath(nextRoadNode, to, previous);
    if (nextPath) {
      return [from, ...nextPath];
    }
  }

  return undefined;
}
