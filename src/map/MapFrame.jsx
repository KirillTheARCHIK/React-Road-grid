import React, { useState, useEffect, createContext } from "react";
import Map from "./Map";
import { CHUNK_SIZE_IN_PX } from "const";

export const ViewChunksCoordsContext = createContext({});
export const FrameSizeContext = createContext({
  x: 0,
  y: 0,
});

export const MapFrame = () => {
  const [viewChunksCoords, setViewChunksCoords] = useState({});
  const [frameSize, setFrameSize] = useState({
    x: 0,
    y: 0,
  });
  const [chunks, setChunks] = useState({});
  const [viewChunks, setViewChunks] = useState([[]]);

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
        <div
          style={{
            width: frameSize.x,
            height: frameSize.y,
            overflow: "hidden",
          }}
        >
          <Map chunks={viewChunks} />
        </div>
      </FrameSizeContext.Provider>
    </ViewChunksCoordsContext.Provider>
  );
};
