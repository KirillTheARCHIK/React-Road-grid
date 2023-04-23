import { createContext } from "react";

export interface IViewChunksCoordsContext{
  viewChunksCoords: {
    leftXChunkIndex: 0,
    rightXChunkIndex: 0,
    bottonYChunkIndex: 0,
    topYChunkIndex: 0,
  },
  setViewChunksCoords?: React.Dispatch<any>,
}

export const ViewChunksCoordsContext = createContext(
  {} as IViewChunksCoordsContext
);