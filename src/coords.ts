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