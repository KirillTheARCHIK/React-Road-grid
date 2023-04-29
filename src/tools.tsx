import { AddRoadOutlined, Traffic } from "@mui/icons-material";
import { GlobalPoint, chunkPointToString, chunkPointIsEqual } from "./coords";
import { ReactElement } from "react";
import React from "react";
import { Building, RoadNodeBuilding } from "./buildings";
import { ChunkInfo } from "./map/Chunk";

export abstract class Tool {
  constructor(
    public name: string,
    public label: string,
    public maxClicks: number,
    public currentClickIndex: number,
    public onClick: (clickIndex: number, cellCoords: GlobalPoint) => void,
    public getIcon: (iconStyle: {
      fontSize: number;
      color: string;
    }) => ReactElement
  ) {}
}

var roadToolCache = {} as {
  from?: GlobalPoint;
  to?: GlobalPoint;
};
export class RoadTool extends Tool {
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
      const newChunks = chunks!;
      // console.log(newChunks);
      
      const chunkTo = newChunks[chunkPointToString(cellCoords.chunkCoords)];
      // console.log(chunkTo);
      const building = chunkTo.buildings.find(
        (value) =>
          value instanceof RoadNodeBuilding &&
          chunkPointIsEqual(
            value.globalPoint.localCoords,
            cellCoords.localCoords
          )
      );
      if (building && building instanceof RoadNodeBuilding) {
        if (clickIndex == 0) {
          roadToolCache.from = cellCoords;
          // console.log(roadToolCache);
          
        } else if (clickIndex == 1 && roadToolCache.from) {
          // console.log(roadToolCache);
          const chunkFrom =
            newChunks[chunkPointToString(roadToolCache.from.chunkCoords)];
          const buildingFrom = chunkFrom.buildings.find(
            (value) =>
              value instanceof RoadNodeBuilding &&
              chunkPointIsEqual(
                value.globalPoint.localCoords,
                roadToolCache.from!.localCoords
              )
          );
          if (buildingFrom && buildingFrom instanceof RoadNodeBuilding) {
            buildingFrom.connects.push(building);
            // console.log(buildingFrom.connects);
            
            setChunks!(newChunks);
          }
        }
      } else {
        roadToolCache.from = undefined;
      }
    }
  ) {
    super("road", "Дорога", 2, -1, onClick, (iconStyle) => {
      return <AddRoadOutlined style={iconStyle} />;
    });
    this.onClick = onClick;
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
    maxClicks: number,
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
      buildOnChunk(
        new building(undefined, cellCoords),
        cellCoords,
        chunks!,
        setChunks!
      );
    },
    getIcon: (iconStyle: { fontSize: number; color: string }) => ReactElement,

    public onHover: (clickIndex: number, cellCoords: GlobalPoint) => void = (
      clickIndex: number,
      cellCoords: GlobalPoint
    ) => {},
    public building: typeof Building
  ) {
    super(name, label, maxClicks, currentClickIndex, onClick, getIcon);
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
  const newChunks = chunks;
  const chunk = newChunks[chunkPointToString(cellCoords.chunkCoords)];
  // console.log(chunk);
  if (
    chunk.buildings.every(
      (value) =>
        value.globalPoint.localCoords.x != cellCoords.localCoords.x &&
        value.globalPoint.localCoords.y != cellCoords.localCoords.y
    )
  ) {
    chunk.buildings.push(building);
    setChunks(newChunks);
  }
}

export class BuildRoadNodeTool extends BuildTool {
  constructor() {
    const building = RoadNodeBuilding;

    super(
      building.Name,
      building.label,
      1,
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
