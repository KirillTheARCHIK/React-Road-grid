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
    routes?: Array<Route>,
    setRoutes?: React.Dispatch<any>
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
      routes?: Array<Route>,
      setRoutes?: React.Dispatch<any>
    ) => {
        setRoutes!([]);
    }
  ) {
    super("clear_paths", "Очистить маршруты", 1, -1, onClick, (iconStyle) => {
      return <CancelOutlined style={iconStyle} />;
    });
    this.onClick = onClick;
  }
}