import React, { useState, useEffect, createContext } from "react";
import Map from "./Map";
import { CHUNK_SIZE_IN_PX } from "const";
import ToolPanel from "./tools/ToolPanel";
import { TOOLS } from "tools";

export const ViewChunksCoordsContext = createContext({
  leftXChunkIndex: 0,
  rightXChunkIndex: 0,
  bottonYChunkIndex: 0,
  topYChunkIndex: 0,
});
export const FrameSizeContext = createContext({
  x: 0,
  y: 0,
});
export const ToolContext = createContext(null);

export const MapFrame = () => {
  const [viewChunksCoords, setViewChunksCoords] = useState({});
  const [frameSize, setFrameSize] = useState({
    x: 0,
    y: 0,
  });
  const [chunks, setChunks] = useState({});
  const [viewChunks, setViewChunks] = useState([[]]);
  const [toolContext, setToolContext] = useState({
    selectedTool: null,
    tools: TOOLS,
  });

  function setSelectedTool (selectedTool){
    setToolContext({
      ...toolContext,
      selectedTool,
    })
  }

  useEffect(() => {
    let newChunks = chunks;
    let newViewChunks = [];
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
            x: chunkX,
            y: chunkY,
            coords: `${chunkX};${chunkY}`,
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
        </ToolContext.Provider>
      </FrameSizeContext.Provider>
    </ViewChunksCoordsContext.Provider>
  );
};
