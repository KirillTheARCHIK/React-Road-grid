import React, { useState, useEffect, createContext } from "react";
import Map from "./Map";
import { CHUNK_SIZE_IN_PX } from "../const";
import ToolPanel from "./tools/ToolPanel";
import { TOOLS, Tool } from "../tools";
import {
  IViewChunksCoordsContext,
  IViewChunksCoordsContextDefaultValues,
  ViewChunksCoordsContext,
} from "../context/ViewChunksCoordsContext";
import {
  FrameSizeContext,
  IFrameSizeContext,
} from "../context/FrameSizeContext";
import {
  IToolContext,
  IToolContextDefaultValues,
  ToolContext,
} from "../context/ToolContext";
import { ChunkInfo } from "./Chunk";
import { ChunksContext } from "../context/ChunksContext";

export const MapFrame = () => {
  const [viewChunksCoords, setViewChunksCoords] = useState(
    IViewChunksCoordsContextDefaultValues.viewChunksCoords
  );
  const [frameSize, setFrameSize] = useState({ x: 0, y: 0 });
  const [chunks, setChunks] = useState(
    {} as {
      [key: string]: ChunkInfo;
    }
  );
  const [viewChunks, setViewChunks] = useState([[]] as Array<Array<ChunkInfo>>);
  const [toolContext, setToolContext] = useState(
    IToolContextDefaultValues.toolContext
  );

  function setSelectedTool(selectedTool: Tool) {
    setToolContext({
      ...toolContext,
      selectedTool,
    });
  }

  useEffect(() => {
    let newChunks = chunks;
    let newViewChunks: typeof viewChunks = [];
    for (
      let chunkY = viewChunksCoords.topYChunkIndex;
      chunkY >= viewChunksCoords.bottonYChunkIndex;
      chunkY--
    ) {
      newViewChunks.push([]);
      for (
        let chunkX = viewChunksCoords.leftXChunkIndex;
        chunkX <= viewChunksCoords.rightXChunkIndex;
        chunkX++
      ) {
        if (newChunks[`${chunkX};${chunkY}`] == undefined) {
          newChunks[`${chunkX};${chunkY}`] = {
            coords: {
              x: chunkX,
              y: chunkY,
            },
            coordsStr: `${chunkX};${chunkY}`,
            buildings: [],
          };
        }
        newViewChunks[viewChunksCoords.topYChunkIndex - chunkY].push(
          newChunks[`${chunkX};${chunkY}`]
        );
      }
    }
    setChunks(newChunks);
    setViewChunks(newViewChunks);
  }, [viewChunksCoords, frameSize]);

  useEffect(() => {
    setFrameSize({
      x: window.innerWidth,
      y: window.innerHeight,
    });
  }, []);  

  return (
    <ViewChunksCoordsContext.Provider
      value={{
        viewChunksCoords,
        setViewChunksCoords,
      }}
    >
      <FrameSizeContext.Provider
        value={{
          frameSize,
          setFrameSize,
        }}
      >
        <ToolContext.Provider
          value={{
            toolContext,
            setToolContext,
            setSelectedTool,
          }}
        >
          <ChunksContext.Provider value={{ chunks, setChunks }}>
            <div
              style={{
                width: frameSize.x,
                height: frameSize.y,
                overflow: "hidden",
              }}
            >
              <Map chunks={viewChunks} />
              <div
                style={{
                  position: "absolute",
                  left: "50px",
                  bottom: "50px",
                }}
              >
                <ToolPanel />
              </div>
            </div>
          </ChunksContext.Provider>
        </ToolContext.Provider>
      </FrameSizeContext.Provider>
    </ViewChunksCoordsContext.Provider>
  );
};
