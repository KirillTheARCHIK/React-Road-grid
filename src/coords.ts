export interface ChunkPoint {
  x: number;
  y: number;
}

export function chunkPointToString(point: ChunkPoint) {
  return `${point.x};${point.y}`;
}

export interface Point {
  x: number;
  y: number;
}

export interface GlobalPoint {
  chunkCoords: ChunkPoint;
  localCoords: ChunkPoint;
}
