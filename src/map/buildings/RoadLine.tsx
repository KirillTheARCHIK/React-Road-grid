import React, { useState, useEffect } from "react";
import { RoadNodeBuilding } from "../../buildings";
import { CELL_SIZE } from "../../const";
import { GlobalPoint, GlobalPointConnect } from "../../coords";
import { Car } from "../vehicles/Car";
import { Vehicle } from "../vehicles/Vehicle";

export const RoadLine = (props: {
  from: GlobalPoint;
  to: GlobalPoint;
  vehicles: Vehicle[];
}) => {
  const connectInfo = new GlobalPointConnect(props.from, props.to);

  return (
    <div
      style={{
        width: CELL_SIZE * 1,
        height: CELL_SIZE * 1,
        position: "absolute",
        zIndex: 100,
        transform: `rotate(${connectInfo.azimuthDeg}deg)`,
        // translate: `${CELL_SIZE * 0.1}px ${CELL_SIZE * 0.1}px`,
        transformOrigin: `center`,
      }}
    >
      <div
        className="road_line"
        style={{
          width: `${CELL_SIZE * 0.4}px`,
          height: `${connectInfo.distancePx - CELL_SIZE * 0.5}px`,
          zIndex: "inherit",
          position: "absolute",
          backgroundColor: "#3A3935",
          borderLeft: "4px white dashed",
          transform: `translate(${CELL_SIZE * 0.4}px, calc(-100% + ${
            CELL_SIZE * 0.2
          }px) )`,
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
          height: `${connectInfo.distancePx - CELL_SIZE * 0.5}px`,
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
