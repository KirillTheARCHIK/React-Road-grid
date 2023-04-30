import React, { useState, useEffect, useContext } from "react";
import { BuildingProps, RoadNodeBuilding } from "../../buildings";
import { CELL_SIZE } from "../../const";
import { ToolContext } from "../../context/ToolContext";
import { GlobalPointConnect } from "../../coords";
import { TOOLS } from "../../tools/tools";

export const RoadNode = (props: BuildingProps) => {
  const { toolContext } = useContext(ToolContext);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div style={{
      width: CELL_SIZE,
      height: CELL_SIZE,
      position: "absolute",
      ...props.style,
    }}>
      <div
        style={{
          width: CELL_SIZE * 1,
          height: CELL_SIZE * 1,
          borderRadius: 1000,
          zIndex: 1000,
          backgroundColor: "#3A3935",
          // translate: `${CELL_SIZE * 0.1}px ${CELL_SIZE * 0.1}px`,
          position: "absolute",
          outline: isSelected || props.isSelected ? `${CELL_SIZE * 0.1}px solid red` : `${CELL_SIZE * 0.1}px white solid`,
        }}
        onMouseEnter={() => {
          if (toolContext.selectedTool) {
            setIsSelected(true);
          }
        }}
        onMouseLeave={() => {
          setIsSelected(false);
        }}
      ></div>
      {(props.info! as RoadNodeBuilding).connects.map((connectBuilding) => {
        const connectInfo = new GlobalPointConnect(
          (props.info! as RoadNodeBuilding).globalPoint,
          connectBuilding.globalPoint
        );
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
                borderLeft: '4px white dashed',
                transform: `translate(${CELL_SIZE * 0.4}px, calc(-100% + ${
                  CELL_SIZE * 0.2
                }px) )`,
              }}
            ></div>
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
      })}
    </div>
  );
};
