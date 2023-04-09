export const CELL_SIZE = 16;
export const CHUNK_SIZE = 16;
export const CHUNK_SIZE_IN_PX = CELL_SIZE*CHUNK_SIZE;

export function debounce(f, ms) {

  let isCooldown = false;

  return function() {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  };

}