import { CancelOutlined } from "@mui/icons-material";
import React from "react";
import { RoadNodeBuilding } from "../buildings";
import {
  chunkPointIsEqual,
  chunkPointToString,
  GlobalPoint,
  globalPointIsEqual,
} from "../coords";
import { ChunkInfo } from "../map/Chunk";
import { Vehicle } from "../map/vehicles/Vehicle";
import { Route } from "./pathTool";
import { Tool } from "./Tool";

var pathToolCache = {} as {
  from?: GlobalPoint;
  to?: GlobalPoint;
};
export class ClearPathTool extends Tool {
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
    >,
    vehicles?: Array<Vehicle>,
    setVehicles?: React.Dispatch<any>
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
      >,
      vehicles?: Array<Vehicle>,
      setVehicles?: React.Dispatch<any>
    ) => {
        setVehicles!([]);
    }
  ) {
    super("clear_paths", "Очистить маршруты", 1, -1, onClick, (iconStyle) => {
      return <CancelOutlined style={iconStyle} />;
    });
    this.onClick = onClick;
  }
}