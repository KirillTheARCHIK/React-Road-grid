import { ReactElement } from "react";
import { GlobalPoint } from "./coords";
import { RoadNode } from "./map/buildings/RoadNode";
import React from "react";

export abstract class Building {
  constructor(
    public name: string,
    public label: string,
    public currentClickIndex: number,
    public onClick: (clickIndex: number, cellCoords: GlobalPoint) => void,
    public getIcon: () => ReactElement,
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
      },
      ()=>{
        return <RoadNode />
      },
    );
  }
}