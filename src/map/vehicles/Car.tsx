import { Navigation, NavigationOutlined } from "@mui/icons-material";
import React, { useState, useEffect, useRef, useContext } from "react";
import { RoadNodeBuilding } from "../../buildings";
import { ChunksContext } from "../../context/ChunksContext";
import { Route } from "../../tools/pathTool";
import { Vehicle } from "./Vehicle";

export const Car = (props: { info: Vehicle }) => {
  const carRef = useRef<HTMLDivElement>(null);
  const { chunks, setChunks } = useContext(ChunksContext);

  useEffect(() => {
    carRef.current?.animate([{}, { top: "0px" }], {
      duration: 5000,
      iterations: 1,
      
    });
  }, []);

  return (
    <div
      ref={carRef}
      style={{
        position: "absolute",
        top: "100%",
        width: 0,
        height: 0,
        left: "50%",
        zIndex: 1000,
      }}
    >
      <Navigation
        style={{
          position: "absolute",
          fontSize: "30px",
          color: "#0f0",
          translate: "-50% -50%",
        }}
      />
    </div>
  );
};
