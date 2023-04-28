import { AddRoadOutlined, Traffic } from "@mui/icons-material";
import { GlobalPoint, chunkPointToString } from "./coords";
import { ReactElement } from "react";
import React from "react";
import { Building, RoadNodeBuilding } from "./buildings";
import { ChunkInfo } from "./map/Chunk";

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
  public onClick: (
    clickIndex: number,
    cellCoords: GlobalPoint,
    chunks?: {
      [key: string]: ChunkInfo;
    },
    setChunks?: React.Dispatch<
      React.SetStateAction<{
        [key: string]: ChunkInfo;
      }>
    >
  ) => void;

  constructor(
    name: string,
    label: string,
    currentClickIndex: number,
    onClick = (
      clickIndex: number,
      cellCoords: GlobalPoint,
      chunks?: {
        [key: string]: ChunkInfo;
      },
      setChunks?: React.Dispatch<
        React.SetStateAction<{
          [key: string]: ChunkInfo;
        }>
      >
    ) => {
      if (clickIndex == 0) {
        buildOnChunk(new building(undefined, cellCoords), cellCoords, chunks!, setChunks!);
      }
    },
    getIcon: (iconStyle: { fontSize: number; color: string }) => ReactElement,

    public onHover: (clickIndex: number, cellCoords: GlobalPoint) => void = (
      clickIndex: number,
      cellCoords: GlobalPoint
    ) => {},
    public building: typeof Building
  ) {
    super(name, label, currentClickIndex, onClick, getIcon);
    this.onClick = onClick;
  }
}

export function buildOnChunk(
  building: Building,
  cellCoords: GlobalPoint,
  chunks: {
    [key: string]: ChunkInfo;
  },
  setChunks: React.Dispatch<
    React.SetStateAction<{
      [key: string]: ChunkInfo;
    }>
  >
) {
  const chunk = chunks[chunkPointToString(cellCoords.chunkCoords)];
  console.log(chunk);
  
}

export class BuildRoadNodeTool extends BuildTool {
  constructor() {
    const building = RoadNodeBuilding;

    super(
      building.Name,
      building.label,
      -1,
      undefined,
      (iconStyle) => {
        return <Traffic style={iconStyle} />;
      },
      undefined,
      building
    );
  }
}

export const TOOLS = {
  roadNode: new BuildRoadNodeTool(),
  road: new RoadTool(),
};
