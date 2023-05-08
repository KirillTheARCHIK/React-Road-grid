import { CELL_SIZE, CHUNK_SIZE_IN_PX } from "./const";

export interface ChunkPoint {
  x: number;
  y: number;
}

export function chunkPointToString(point: ChunkPoint) {
  return `${point.x};${point.y}`;
}

export function chunkPointIsEqual(p1: ChunkPoint, p2: ChunkPoint) {
  return p1.x == p2.x && p1.y == p2.y;
}

export interface Point {
  x: number;
  y: number;
}

export interface GlobalPoint {
  chunkCoords: ChunkPoint;
  localCoords: ChunkPoint;
}

export function globalPointIsEqual(p1: GlobalPoint, p2: GlobalPoint) {
  return (
    chunkPointIsEqual(p1.chunkCoords, p2.chunkCoords) &&
    chunkPointIsEqual(p1.localCoords, p2.localCoords)
  );
}

export class GlobalPointConnect {
  from: GlobalPoint;
  to: GlobalPoint;
  distancePx: number;
  azimuthDeg: number;

  constructor(from: GlobalPoint, to: GlobalPoint, distancePx: number, azimuthDeg: number) {
    this.from = from;
    this.to = to;
    this.distancePx = distancePx;
    this.azimuthDeg = azimuthDeg;
  }

  public static from2Points(p1: GlobalPoint, p2: GlobalPoint) {
    const p1Px = {
      x: p1.chunkCoords.x * CHUNK_SIZE_IN_PX() + p1.localCoords.x * CELL_SIZE,
      y: p1.chunkCoords.y * CHUNK_SIZE_IN_PX() - p1.localCoords.y * CELL_SIZE,
    } as Point;
    const p2Px = {
      x: p2.chunkCoords.x * CHUNK_SIZE_IN_PX() + p2.localCoords.x * CELL_SIZE,
      y: p2.chunkCoords.y * CHUNK_SIZE_IN_PX() - p2.localCoords.y * CELL_SIZE,
    } as Point;
    // console.log({p1Px, p2Px});

    const distancePx = Math.sqrt(
      Math.pow(p2Px.x - p1Px.x, 2) + Math.pow(p2Px.y - p1Px.y, 2)
    );

    var pathVector = [p2Px.x - p1Px.x, p2Px.y - p1Px.y];
    var northVector = [0, 1];
    const isRight = pathVector[0] > 0;
    let corner =
      (Math.acos(
        (pathVector[0] * northVector[0] + pathVector[1] * northVector[1]) /
          (Math.sqrt(Math.pow(pathVector[0], 2) + Math.pow(pathVector[1], 2)) *
            Math.sqrt(
              Math.pow(northVector[0], 2) + Math.pow(northVector[1], 2)
            ))
      ) /
        Math.PI) *
      180;
    if (isNaN(corner)) {
      corner = 180;
    }
    const azimuthDeg = isRight ? corner : 360 - corner;

    return new GlobalPointConnect(p1, p2, distancePx, azimuthDeg);
  }
}
