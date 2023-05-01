import { ReactElement } from "react";
import {
  ChunkPoint,
  chunkPointIsEqual,
  chunkPointToString,
  GlobalPoint,
  GlobalPointConnect,
} from "./coords";
import { RoadNode } from "./map/buildings/RoadNode";
import React from "react";
import { buildPath } from "./graph";
import { ChunkInfo, ChunkMap } from "./map/Chunk";

export type BuildingProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.ClassAttributes<HTMLInputElement> & {
    info: Building;
    isSelected?: Boolean;
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

  public distanceTo(otherBuilding: Building) {
    return new GlobalPointConnect(this.globalPoint, otherBuilding.globalPoint);
  }
}

export function findBuilding(chunks: ChunkMap, coords: GlobalPoint) {
  const chunk = chunks[chunkPointToString(coords.chunkCoords)];
  return chunk.buildings.find(
    (value) =>
      value instanceof RoadNodeBuilding &&
      chunkPointIsEqual(value.globalPoint.localCoords, coords.localCoords)
  );
}

export class RoadNodeBuilding extends Building {
  public static Name = "road_node";
  public type = "road_node";
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
  public buildPathTo(
    chunks: ChunkMap,
    targetNode: RoadNodeBuilding
  ): RoadNodeBuilding[] | undefined {
    console.log("buildPath");

    return buildPath(chunks, this, targetNode);
  }

  constructor(
    currentClickIndex: number = -1,
    globalPoint: GlobalPoint,
    public connects: GlobalPoint[] = []
  ) {
    super(-1, globalPoint);
  }

  // public toString() {
  //   return JSON.stringify({
  //     Name: RoadNodeBuilding.Name,
  //     currentClickIndex: this.currentClickIndex,
  //     globalPoint: this.globalPoint,
  //     connects: this.connects.map((con) => con.globalPoint),
  //   });
  // }
}
