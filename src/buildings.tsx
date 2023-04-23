import { GlobalPoint } from "./coords";

export abstract class Building {
  constructor(
    public name: string,
    public label: string,
    public currentClickIndex: number,
    public onClick: (clickIndex: number, cellCoords: GlobalPoint) => void
  ) {}
}

export class RoadNodeBuilding extends Building {
  constructor() {
    super(
      "road_node",
      "Узел дороги",
      -1,
      (clickIndex: number, cellCoords: GlobalPoint) => {
        console.log({ clickIndex, cellCoords });
        if (clickIndex == 0) {
        }
      }
    );
  }
}