import React, { useState, useEffect, useContext } from "react";
import { BuildingProps, RoadNodeBuilding } from "../../buildings";
import { CELL_SIZE } from "../../const";
import { ToolContext } from "../../context/ToolContext";
import { VehiclesContext } from "../../context/VehiclesContext";
import { GlobalPointConnect, globalPointIsEqual } from "../../coords";
import { TOOLS } from "../../tools/tools";
import { RoadLine } from "./RoadLine";

export const RoadNode = (props: BuildingProps) => {
  const { toolContext } = useContext(ToolContext);
  const { vehicles, setVehicles } = useContext(VehiclesContext);
  const [isSelected, setIsSelected] = useState(false);
  const info = props.info as RoadNodeBuilding;

  return (
    <div
      style={{
        width: CELL_SIZE,
        height: CELL_SIZE,
        position: "absolute",
        ...props.style,
      }}
    >
      <div
        style={{
          width: CELL_SIZE * 1,
          height: CELL_SIZE * 1,
          borderRadius: 1000,
          zIndex: 1000,
          backgroundColor: "#3A3935",
          // translate: `${CELL_SIZE * 0.1}px ${CELL_SIZE * 0.1}px`,
          position: "absolute",
          outline:
            isSelected || props.isSelected
              ? `${CELL_SIZE * 0.1}px solid red`
              : `${CELL_SIZE * 0.1}px white solid`,
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
      {(props.info! as RoadNodeBuilding).connects.map(
        (connectBuildingPoint) => {
          return (
            <RoadLine
              connection={connectBuildingPoint}
              vehicles={vehicles.filter(
                (vehicle) =>
                  vehicle.restRoute.length >= 1 &&
                  globalPointIsEqual(
                    vehicle.restRoute[0].to,
                    connectBuildingPoint.to
                  )&&
                  globalPointIsEqual(
                    vehicle.restRoute[0].from,
                    connectBuildingPoint.from
                  )
              )}
            />
          );
        }
      )}
    </div>
  );
};
