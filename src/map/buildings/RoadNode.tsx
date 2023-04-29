import React, { useState, useEffect } from "react";
import { BuildingProps, RoadNodeBuilding } from "../../buildings";
import { CELL_SIZE } from "../../const";
import { GlobalPointConnect } from "../../coords";

export const RoadNode = (props: BuildingProps) => {
  return (
    <div
      style={{
        ...props.style,
        width: CELL_SIZE * 0.8,
        height: CELL_SIZE * 0.8,
        borderRadius: 1000,
        backgroundColor: "lightgreen",
        translate: `${CELL_SIZE * 0.1}px ${CELL_SIZE * 0.1}px`,
        position: "absolute",
      }}
    >
      {(props.info! as RoadNodeBuilding).connects.map((connectBuilding) => {
        const connectInfo = new GlobalPointConnect(
          (props.info! as RoadNodeBuilding).globalPoint,
          connectBuilding.globalPoint
        );
        return (
          <div
            style={{
              width: CELL_SIZE * 0.8,
              height: CELL_SIZE * 0.8,
              position: "absolute",
              transform: `rotate(${connectInfo.azimuthDeg}deg)`,
              transformOrigin: `center`,
            }}
          >
            <div
              style={{
                width: `${CELL_SIZE * 0.2}px`,
                height: `${connectInfo.distancePx}px`,
                backgroundColor: "lightgreen",
                transform: `translate(${CELL_SIZE * 0.5}px, calc(-100% + ${CELL_SIZE * 0.2}px) )`,
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};
