import React, { useState, useEffect, createContext } from "react";
import Map from "./Map";
import { CHUNK_SIZE_IN_PX } from "../const";
import ToolPanel from "./tools/ToolPanel";
import { TOOLS, Tool } from "../tools";
import { IViewChunksCoordsContext, ViewChunksCoordsContext } from "../context/ViewChunksCoordsContext";
import { FrameSizeContext, IFrameSizeContext } from "../context/FrameSizeContext";
import { IToolContext, ToolContext } from "../context/ToolContext";


export const MapFrame = () => {
  const [viewChunksCoords, setViewChunksCoords] = useState(({} as IViewChunksCoordsContext).viewChunksCoords);
  const [frameSize, setFrameSize] = useState(({} as IFrameSizeContext).frameSize);
  const [chunks, setChunks] = useState({} as any);
  const [viewChunks, setViewChunks] = useState([[]]);
  const [toolContext, setToolContext] = useState(({} as IToolContext).toolContext);

  function setSelectedTool(selectedTool: Tool) {
    setToolContext({
      ...toolContext,
      selectedTool,
    });
  }

  function incrementClickIndex(selectedTool: Tool) {
    if (selectedTool) {
      setSelectedTool({
        ...selectedTool,
        currentClickIndex: selectedTool.currentClickIndex + 1,
      });
    }
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
            coords: {
              x: chunkX,
              y: chunkY,
            },
            coordsStr: `${chunkX};${chunkY}`,
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
            incrementClickIndex,
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
