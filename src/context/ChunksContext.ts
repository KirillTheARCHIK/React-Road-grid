import { createContext } from "react";
import { ChunkInfo } from "../map/Chunk";

export interface IChunksContext{
  chunks: {
    [key: string]: ChunkInfo;
  },
  setChunks?: React.Dispatch<any>,
}

export const ChunksContext = createContext<IChunksContext>({} as IChunksContext);