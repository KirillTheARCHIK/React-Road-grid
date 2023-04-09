import React, { useContext, useEffect, useState } from "react";
import Chunk from "./Chunk";
import { CHUNK_SIZE_IN_PX } from "const";
import { FrameSizeContext, ViewChunksCoordsContext } from "./MapFrame";

const Map = ({ chunks = [[]] }) => {
  const [currentCords, setCurrentCords] = useState({ x: 0, y: 0 });
  const { frameSize, setFrameSize } = useContext(FrameSizeContext);

  const { viewChunksCoords, setViewChunksCoords } = useContext(
    ViewChunksCoordsContext
  );

  useEffect(() => {

      refreshBounds();
  }, [frameSize]);

  function refreshBounds() {
    console.log({
      currentCords,
      frameSize,
    });
    const newViewChunksCoords = {
      leftXChunkIndex: Math.floor(
        (currentCords.x - frameSize.x / 2) / CHUNK_SIZE_IN_PX
      ),
      rightXChunkIndex: Math.floor(
        (currentCords.x + frameSize.x / 2) / CHUNK_SIZE_IN_PX
      ),
      bottonYChunkIndex: Math.floor(
        (currentCords.y - frameSize.y / 2) / CHUNK_SIZE_IN_PX
      ),
      topYChunkIndex: Math.floor(
        (currentCords.y + frameSize.y / 2) / CHUNK_SIZE_IN_PX
      ),
    };
    if (viewChunksCoords != newViewChunksCoords) {
      setViewChunksCoords(newViewChunksCoords);
    }
  }

  return (
    <div
      style={{
        cursor: "grab",
        width: chunks[0]?.length * CHUNK_SIZE_IN_PX,
        height: chunks.length * CHUNK_SIZE_IN_PX,
      }}
      draggable
      onDragEnd={() => {
        refreshBounds();
      }}
      onDragStart={(event)=>{
        event.preventDefault();
      }}
    >
      {chunks.map((chunkRow) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {chunkRow.map((chunkInfo) => {
              return <Chunk info={chunkInfo} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Map;
