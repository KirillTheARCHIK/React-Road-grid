import React, { useState, useEffect } from "react";
import Map from "./Map";
import { CHUNK_SIZE_IN_PX } from "const";

const MapFrame = () => {
  const [currentCords, setcurrentCords] = useState({ x: 0, y: 0 });
  const [frameSize, setFrameSize] = useState({
    x: 0,
    y: 0,
  });
  const [chunks, setChunks] = useState({});
  const [viewChunks, setViewChunks] = useState([[]]);

  useEffect(() => {
    const leftXChunkIndex = Math.floor(
      (currentCords.x - frameSize.x / 2) / CHUNK_SIZE_IN_PX
    );
    const rightXChunkIndex = Math.floor(
      (currentCords.x + frameSize.x / 2) / CHUNK_SIZE_IN_PX
    );
    const bottonYChunkIndex = Math.floor(
      (currentCords.y - frameSize.y / 2) / CHUNK_SIZE_IN_PX
    );
    const topYChunkIndex = Math.floor(
      (currentCords.y + frameSize.y / 2) / CHUNK_SIZE_IN_PX
    );
    let newChunks = chunks;
    let newViewChunks = [];
    for (let chunkY = topYChunkIndex; chunkY >= bottonYChunkIndex; chunkY--) {
      newViewChunks.push([]);
      for (let chunkX = leftXChunkIndex; chunkX <= rightXChunkIndex; chunkX++) {
        if (newChunks[`${chunkX};${chunkY}`]==undefined) {
          newChunks[`${chunkX};${chunkY}`]={
            x: chunkX,
            y: chunkY,
            coords: `${chunkX};${chunkY}`,
          }
        }
        newViewChunks[topYChunkIndex-chunkY].push(newChunks[`${chunkX};${chunkY}`]);
      }
    }
    setChunks(newChunks);
    setViewChunks(newViewChunks);
  }, [currentCords, frameSize]);

  useEffect(() => {
    setFrameSize({
      x: window.innerWidth,
      y: window.innerHeight,
    });
  }, []);

  return (
    <div
      style={{
        width: frameSize.x,
        height: frameSize.y,
        overflow: 'hidden',
      }}
    >
      <Map chunks={viewChunks} />
    </div>
  );
};

export default MapFrame;
