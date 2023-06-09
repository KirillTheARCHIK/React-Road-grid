import React, { useContext, useEffect, useRef, useState } from "react";
import {Chunk} from "./Chunk";
import { CHUNK_SIZE_IN_PX, CHUNK_SIZE_IN_PX_WITH_ZOOM, ZOOM } from "../const";
import { ViewChunksCoordsContext } from "../context/ViewChunksCoordsContext";
import { FrameSizeContext } from "../context/FrameSizeContext";

const Map = ({ chunks }) => {
  const [currentCoords, setCurrentCoords] = useState({ x: -683, y: 610 });
  const { frameSize, setFrameSize } = useContext(FrameSizeContext);
  const [isDragging, setIsDragging] = useState(false);

  const { viewChunksCoords, setViewChunksCoords } = useContext(
    ViewChunksCoordsContext
  );

  useEffect(() => {
    refreshBounds();
  }, [frameSize]);

  function refreshBounds() {
    // console.log({
    //   currentCoords,
    //   frameSize,
    // });
    const newViewChunksCoords = {
      leftXChunkIndex: Math.floor(currentCoords.x / CHUNK_SIZE_IN_PX_WITH_ZOOM()),
      rightXChunkIndex: Math.floor(
        (currentCoords.x + frameSize.x) / CHUNK_SIZE_IN_PX_WITH_ZOOM()
      ),
      bottonYChunkIndex: Math.floor(
        (currentCoords.y - frameSize.y) / CHUNK_SIZE_IN_PX_WITH_ZOOM()
      ),
      topYChunkIndex: Math.floor(currentCoords.y / CHUNK_SIZE_IN_PX_WITH_ZOOM()),
    };
    if (
      Object.keys(newViewChunksCoords).some(
        (key) => viewChunksCoords[key] != newViewChunksCoords[key]
      )
    ) {
      setViewChunksCoords(newViewChunksCoords);
    }
  }

  return (
    <div
      id="map"
      style={{
        position: "relative",
        overflow: 'hidden',
        cursor: isDragging ? "grabbing" : "grab",
        width: chunks[0]?.length * CHUNK_SIZE_IN_PX_WITH_ZOOM(),
        height: chunks.length * CHUNK_SIZE_IN_PX_WITH_ZOOM(),
        left: -(
          currentCoords.x -
          viewChunksCoords.leftXChunkIndex * CHUNK_SIZE_IN_PX_WITH_ZOOM()
        ),
        top:
          currentCoords.y -
          (viewChunksCoords.topYChunkIndex + 1) * CHUNK_SIZE_IN_PX_WITH_ZOOM(),
      }}
      draggable
      onMouseUp={() => {
        refreshBounds();
        setIsDragging(false);
      }}
      onDragStart={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onMouseMove={(event) => {
        if (isDragging) {
          setCurrentCoords({
            x: currentCoords.x - event.movementX,
            y: currentCoords.y + event.movementY,
          });
        }
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
