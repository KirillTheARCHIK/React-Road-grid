import { createContext } from "react";

export interface IViewChunksCoordsContext{
  viewChunksCoords: {
    leftXChunkIndex: number,
    rightXChunkIndex: number,
    bottonYChunkIndex: number,
    topYChunkIndex: number,
  },
  setViewChunksCoords?: React.Dispatch<any>,
}

export const IViewChunksCoordsContextDefaultValues = {
  viewChunksCoords: {
    leftXChunkIndex: 0,
    rightXChunkIndex: 0,
    bottonYChunkIndex: 0,
    topYChunkIndex: 0,
  }
} as IViewChunksCoordsContext;

export const ViewChunksCoordsContext = createContext<IViewChunksCoordsContext>(IViewChunksCoordsContextDefaultValues);