import React, { useState, useEffect, useContext } from "react";
import { setZoom, ZOOM } from "../../const";
import { ChunksContext } from "../../context/ChunksContext";
import { MapControlButton } from "./MapControlButton";

export const MapControlPanel = (props: {}) => {
  const { chunks, setChunks } = useContext(ChunksContext);
  const zoomCoef = 1.25;

  return (
    <div
      className="f-c"
      style={{
        position: "relative",
        zIndex: 10000,
        // minHeight: 100,
        // minWidth: 100,
        // backgroundColor: "white",
        padding: 10,
      }}
    >
      <MapControlButton onClick={()=>{
        setZoom(ZOOM * zoomCoef)
        setChunks!(chunks);
      }}>+</MapControlButton>
      <MapControlButton onClick={()=>{
        setZoom(ZOOM / zoomCoef)
        setChunks!(chunks);
      }}>–</MapControlButton>
    </div>
  );
};
