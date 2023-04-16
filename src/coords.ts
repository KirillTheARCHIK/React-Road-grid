export interface ChunkPoint {
  x: number;
  y: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface GlobalPoint {
  chunkCoords: ChunkPoint;
  localCoords: ChunkPoint;
}
