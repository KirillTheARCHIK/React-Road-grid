import { AddRoadOutlined } from "@mui/icons-material";
import React from "react";
import { RoadNodeBuilding } from "../buildings";
import {
  chunkPointIsEqual,
  chunkPointToString,
  GlobalPoint,
  globalPointIsEqual,
} from "../coords";
import { ChunkInfo } from "../map/Chunk";
import { Tool } from "./Tool";
import { GlobalPointConnect } from "../connects/globalPointConnect";

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
            if (
              globalPointIsEqual(buildingFrom.globalPoint, building.globalPoint)
            ) {
              console.log("Одна и таже точка");
              return;
            }
            if (
              buildingFrom.connects.some((b) =>
                globalPointIsEqual(b.to, building.globalPoint)
              )
            ) {
              console.log("Такое соединение уже есть");
              return;
            }
            buildingFrom.connects.push(
              GlobalPointConnect.from2Points(
                buildingFrom.globalPoint,
                building.globalPoint
              )
            );
            // console.log(buildingFrom.connects);

            setChunks!(newChunks);
          }
        }
      } else {
        roadToolCache.from = undefined;
      }
    }
  ) {
    super(
      "road",
      "Дорога",
      2,
      -1,
      onClick,
      (iconStyle) => {
        return <AddRoadOutlined style={iconStyle} />;
      },
      () => {
        return <></>;
      },
      undefined
    );
    this.onClick = onClick;
  }
}
