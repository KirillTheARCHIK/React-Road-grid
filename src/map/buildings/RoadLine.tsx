import React, { useState, useEffect } from "react";
import { RoadNodeBuilding } from "../../buildings";
import { CELL_SIZE, CELL_SIZE_WITH_ZOOM, ZOOM } from "../../const";
import { GlobalPoint } from "../../coords";
import { Car } from "../vehicles/Car";
import { Vehicle } from "../vehicles/Vehicle";
import { GlobalPointConnect } from "../../connects/globalPointConnect";

export const RoadLine = (props: {
  connection: GlobalPointConnect;
  vehicles: Vehicle[];
}) => {
  if (true) {
    
  }
  return (
    <div
      style={{
        width: CELL_SIZE_WITH_ZOOM() * 1,
        height: CELL_SIZE_WITH_ZOOM() * 1,
        position: "absolute",
        zIndex: 100,
        transform: `rotate(${props.connection.azimuthDeg}deg)`,
        // translate: `${CELL_SIZE_WITH_ZOOM() * 0.1}px ${CELL_SIZE_WITH_ZOOM() * 0.1}px`,
        transformOrigin: `center`,
      }}
    >
      <div
        className="road_line"
        style={{
          width: `${CELL_SIZE_WITH_ZOOM() * 0.4}px`,
          height: `${(props.connection.distancePx - CELL_SIZE * 0.5) * ZOOM}px`,
          zIndex: "inherit",
          position: "absolute",
          backgroundColor: "#3A3935",
          borderLeft: `${CELL_SIZE_WITH_ZOOM() / 8}px white dashed`,
          transform: `translate(${
            CELL_SIZE_WITH_ZOOM() * 0.4
          }px, calc(-100% + ${CELL_SIZE_WITH_ZOOM() * 0.2}px) )`,
        }}
      >
        {props.vehicles.map((vehicle) => (
          <Car info={vehicle} />
        ))}
      </div>
      {/* <div
        className="road_line_dash"
        style={{
          width: `${CELL_SIZE * 0.1}px`,
          height: `${(props.connection.distancePx - CELL_SIZE)*ZOOM * 0.5}px`,
          zIndex: "inherit",
          position: "absolute",
          backgroundColor: "#3A3935",
          transform: `translate(${CELL_SIZE * 0.45}px, calc(-100% + ${
            CELL_SIZE * 0.2
          }px) )`,
        }}
      ></div> */}
    </div>
  );
};
