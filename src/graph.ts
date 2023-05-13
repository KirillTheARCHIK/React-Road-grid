import { Building, findBuilding, RoadNodeBuilding } from "./buildings";
import {  globalPointIsEqual } from "./coords";
import { GlobalPointConnect } from "./connects/globalPointConnect";
import { ChunkMap } from "./map/Chunk";

export function buildPath(
  chunks: ChunkMap,
  from: RoadNodeBuilding,
  to: RoadNodeBuilding,
  previous: GlobalPointConnect[] = []
): GlobalPointConnect[] | undefined {
  const findFinish = from.connects.find((b) =>
    globalPointIsEqual(b.to, to.globalPoint)
  );
  if (findFinish) {
    // const findedBuilding = findBuilding(chunks, findFinish.to);
    // if (findedBuilding) {
      return [findFinish];
    // }
  }

  const nextConnections = from.connects.filter((nodePoint) =>
    previous.every((prConnects) => prConnects.to != nodePoint.to)
  );
  nextConnections.sort((a, b) => {
    const aLessThanb =
      GlobalPointConnect.from2Points(a.to, to.globalPoint).distancePx <
      GlobalPointConnect.from2Points(b.to, to.globalPoint).distancePx;
    return aLessThanb ? -1 : 1;
  });
  for (const nextRoadNode of nextConnections) {
    const nextPath = buildPath(
      chunks,
      findBuilding(chunks, nextRoadNode.to)! as RoadNodeBuilding,
      to,
      previous
    );
    if (nextPath) {
      return [nextRoadNode, ...nextPath];
    }
  }

  return undefined;
}
