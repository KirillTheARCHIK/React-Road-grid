import { Route } from "@mui/icons-material";
import React from "react";
import { RoadNodeBuilding } from "../buildings";
import { chunkPointIsEqual, chunkPointToString, GlobalPoint, globalPointIsEqual } from "../coords";
import { ChunkInfo } from "../map/Chunk";
import { Tool } from "./Tool";

var pathToolCache = {} as {
  from?: GlobalPoint;
  to?: GlobalPoint;
};
export class PathTool extends Tool {
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
          pathToolCache.from = cellCoords;
          // console.log(pathToolCache);
        } else if (clickIndex == 1 && pathToolCache.from) {
          // console.log(pathToolCache);
          const chunkFrom =
            newChunks[chunkPointToString(pathToolCache.from.chunkCoords)];
          const buildingFrom = chunkFrom.buildings.find(
            (value) =>
              value instanceof RoadNodeBuilding &&
              chunkPointIsEqual(
                value.globalPoint.localCoords,
                pathToolCache.from!.localCoords
              )
          );
          if (buildingFrom && buildingFrom instanceof RoadNodeBuilding) {
            if (
              globalPointIsEqual(buildingFrom.globalPoint, building.globalPoint)
            ) {
              console.log("Одна и таже точка");
              return;
            }
            if (
              buildingFrom.connects.some((b) =>
                globalPointIsEqual(b.globalPoint, building.globalPoint)
              )
            ) {
              console.log("Такое соединение уже есть");
              return;
            }
            buildingFrom.connects.push(building);
            // console.log(buildingFrom.connects);

            setChunks!(newChunks);
          }
        }
      } else {
        pathToolCache.from = undefined;
      }
    }
  ) {
    super("path", "Маршрут", 2, -1, onClick, (iconStyle) => {
      return <Route style={iconStyle} />;
    });
    this.onClick = onClick;
  }
}