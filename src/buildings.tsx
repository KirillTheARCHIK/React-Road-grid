import { ReactElement } from "react";
import { GlobalPoint } from "./coords";
import { RoadNode } from "./map/buildings/RoadNode";
import React from "react";

export type BuildingProps = React.InputHTMLAttributes<HTMLInputElement> & React.ClassAttributes<HTMLInputElement> & {
  info: Building;
};
export class Building {
  public static Name: string;
  public static label: string;
  public getIcon: (props: BuildingProps) => ReactElement = () => <></>;
  public onClick: (clickIndex: number, cellCoords: GlobalPoint) => void = (
    a,
    b
  ) => {};

  constructor(
    public currentClickIndex: number = -1,
    public globalPoint: GlobalPoint
  ) {}
}

export class RoadNodeBuilding extends Building {
  public static Name = "road_node";
  public static label = "Узел дороги";
  public getIcon: (props: BuildingProps) => ReactElement = (props) => {
    return <RoadNode {...props} />;
  };
  public onClick: (clickIndex: number, cellCoords: GlobalPoint) => void = (
    clickIndex: number,
    cellCoords: GlobalPoint
  ) => {
    console.log({ clickIndex, cellCoords });
    if (clickIndex == 0) {
    }
  };
  public connects: RoadNodeBuilding[] = [];

  constructor(currentClickIndex: number = -1, globalPoint: GlobalPoint) {
    super(-1, globalPoint);
  }
}
