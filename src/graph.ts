import { Building, findBuilding, RoadNodeBuilding } from "./buildings";
import { GlobalPointConnect, globalPointIsEqual } from "./coords";
import { ChunkMap } from "./map/Chunk";

export function buildPath(
  chunks: ChunkMap,
  from: RoadNodeBuilding,
  to: RoadNodeBuilding,
  previous: RoadNodeBuilding[] = []
): RoadNodeBuilding[] | undefined {
  const findFinish = from.connects.find((b) => globalPointIsEqual(b, to.globalPoint));
  if (findFinish) {
    const findedBuilding = findBuilding(chunks, findFinish);
    if (findedBuilding) {
      return [from, findedBuilding as RoadNodeBuilding];
    }
  }

  const nextConnections = from.connects.filter((nodePoint) =>
    previous.every((prNode) => prNode.globalPoint != nodePoint)
  );
  nextConnections.sort((a, b) => {
    const aLessThanb = new GlobalPointConnect(a, to.globalPoint).distancePx <new GlobalPointConnect(b, to.globalPoint).distancePx;
    return aLessThanb ? -1 : 1;
  });
  for (const nextRoadNode of nextConnections) {
    const nextPath = buildPath(chunks, findBuilding(chunks, nextRoadNode)! as RoadNodeBuilding, to, previous);
    if (nextPath) {
      return [from, ...nextPath];
    }
  }

  return undefined;
}
