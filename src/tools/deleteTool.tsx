import React from "react";
import { findBuilding, RoadNodeBuilding } from "../buildings";
import { ChunkInfo } from "../map/Chunk";
import { Delete } from "@mui/icons-material";
import { GlobalPoint, chunkPointToString, globalPointIsEqual } from "../coords";
import { Tool } from "./Tool";

export class DeleteTool extends Tool {
  constructor() {
    super(
      "delete_tool",
      "Удалить",
      1,
      -1,
      (
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
        const targetChunk =
          newChunks[chunkPointToString(cellCoords.chunkCoords)];
        const targetBuilding = findBuilding(newChunks, cellCoords);
        if (targetBuilding) {
          if (targetBuilding instanceof RoadNodeBuilding) {
            for (const key in newChunks) {
              newChunks[key].buildings.forEach((building) => {
                if (building && building instanceof RoadNodeBuilding) {
                  building.connects = building.connects.filter(
                    (con) => !globalPointIsEqual(con, cellCoords)
                  );
                }
              });
            }
          }

          targetChunk.buildings = targetChunk.buildings.filter(
            (building) => !globalPointIsEqual(building.globalPoint, cellCoords)
          );
          setChunks!(newChunks);
        }
      },
      (iconStyle) => {
        return <Delete style={iconStyle} />;
      }
    );
  }
}
