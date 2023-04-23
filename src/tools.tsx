import { AddRoadOutlined, Traffic } from "@mui/icons-material";
import { GlobalPoint } from "./coords";
import { ReactElement } from "react";
import React from "react";
import { Building, RoadNodeBuilding } from "./buildings";

export abstract class Tool {
  constructor(
    public name: string,
    public label: string,
    public currentClickIndex: number,
    public onClick: (clickIndex: number, cellCoords: GlobalPoint) => void,
    public getIcon: (iconStyle: {
      fontSize: number;
      color: string;
    }) => ReactElement
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
      },
      (iconStyle) => {
        return <AddRoadOutlined style={iconStyle} />;
      }
    );
  }
}

export abstract class BuildTool extends Tool {
  constructor(
    name: string,
    label: string,
    currentClickIndex: number,
    onClick: (clickIndex: number, cellCoords: GlobalPoint) => void,
    getIcon: (iconStyle: { fontSize: number; color: string }) => ReactElement,

    public onHover: (clickIndex: number, cellCoords: GlobalPoint) => void,
    public building: Building
  ) {
    super(name, label, currentClickIndex, onClick, getIcon);
  }
}

export class BuildRoadNodeTool extends BuildTool {
  constructor() {
    const building = new RoadNodeBuilding();

    super(
      building.name,
      building.label,
      -1,
      (clickIndex: number, cellCoords: GlobalPoint) => {},
      (iconStyle) => {
        return <Traffic style={iconStyle} />;
      },
      (clickIndex: number, cellCoords: GlobalPoint) => {},
      building
    );
  }
}

export const TOOLS = {
  roadNode: new BuildRoadNodeTool(),
  road: new RoadTool(),
};
