export const CELL_SIZE = 32;
export let ZOOM = 1;
export function setZoom(zoom) {
  ZOOM = zoom;
}
export const CHUNK_SIZE = 16;
export function CHUNK_SIZE_IN_PX() {
  return CELL_SIZE * CHUNK_SIZE;
}
export function CELL_SIZE_WITH_ZOOM() {
  return CELL_SIZE * ZOOM;
}
export function CHUNK_SIZE_IN_PX_WITH_ZOOM() {
  return CHUNK_SIZE_IN_PX() * ZOOM;
}
