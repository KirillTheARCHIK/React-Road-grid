import { GlobalPoint } from "./coords";

export abstract class Tool {
  constructor(
    public name: string,
    public label: string,
    public currentClickIndex: number,
    public onClick: (clickIndex: number, cellCoords: GlobalPoint) => void
  ) {}
}

export class RoadTool extends Tool {
  constructor() {
    super(
      "road",
      "Дорога",
      -1,
      (clickIndex: number, cellCoords: GlobalPoint) => {
        console.log({ clickIndex, cellCoords });
        if (clickIndex == 0) {
        }
      }
    );
  }
}

export const TOOLS = {
  road: new RoadTool(),
};

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

export interface Building {
  name: string;
  label: string;
  currentClickIndex: number;
  onClick(clickIndex: number, cellCoords: GlobalPoint): void;
}

export interface RoadNodeBuilding extends Building {
  name: "road_node";
  label: "Узел дороги";
  currentClickIndex: -1;
}

export const BUILDINGS = {
  roadNode: <RoadNodeBuilding>{
    onClick(clickIndex, cellCoords) {
      console.log({ clickIndex, cellCoords });
      if (clickIndex == 0) {
      }
    },
  },
};
