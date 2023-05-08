import { CELL_SIZE, CELL_SIZE_WITH_ZOOM, CHUNK_SIZE_IN_PX, CHUNK_SIZE_IN_PX_WITH_ZOOM } from "../const";
import React from "react";
import { useContext } from "react";
import { ChunkPoint, globalPointIsEqual } from "../coords";
import { ToolContext } from "../context/ToolContext";
import { Building } from "../buildings";
import { ChunksContext } from "../context/ChunksContext";
import { PathTool } from "../tools/pathTool";
import { VehiclesContext } from "../context/VehiclesContext";

export interface ChunkInfo {
  coords: ChunkPoint;
  coordsStr: string;
  buildings: Building[];
}

export interface ChunkMap {
  [key: string]: ChunkInfo;
}

export const Chunk = (props: { info: ChunkInfo }) => {
  const { toolContext, setSelectedTool, incrementClickIndex } =
    useContext(ToolContext);
  const { chunks, setChunks } = useContext(ChunksContext);
  const { vehicles, setVehicles } = useContext(VehiclesContext);

  return (
    <div
      className="background-cell"
      style={{
        width: CHUNK_SIZE_IN_PX_WITH_ZOOM(),
        height: CHUNK_SIZE_IN_PX_WITH_ZOOM(),
        outline: "red solid 1px",
        fontSize: "40px",
        backgroundSize: `${CELL_SIZE_WITH_ZOOM()}px ${CELL_SIZE_WITH_ZOOM()}px`,
      }}
      onClick={(e) => {
        var rect = e.currentTarget.getBoundingClientRect();
        var xPx = e.clientX - rect.left; //x position within the element.
        var yPx = e.clientY - rect.top; //y position within the element.
        var x = Math.floor(xPx / CELL_SIZE_WITH_ZOOM());
        var y = Math.floor(yPx / CELL_SIZE_WITH_ZOOM());
        // console.log({ x: x, y: y });

        if (toolContext.selectedTool) {
          if (
            toolContext.selectedTool?.currentClickIndex + 1 <
            toolContext.selectedTool?.maxClicks
          ) {
            ////////////////////////////////////////////////////////////////////////////////////////
            // if (toolContext.selectedTool instanceof BuildTool) {
            //   toolContext.selectedTool?.onClick(
            //     toolContext.selectedTool?.currentClickIndex + 1,
            //     { chunkCoords: props.info.coords, localCoords: { x, y } },
            //     chunks,
            //     setChunks
            //   );
            // } else if (toolContext.selectedTool instanceof RoadTool) {
            //   // console.log(chunks);

            //   toolContext.selectedTool?.onClick(
            //     toolContext.selectedTool?.currentClickIndex + 1,
            //     { chunkCoords: props.info.coords, localCoords: { x, y } },
            //     chunks,
            //     setChunks
            //   );
            // }
            // console.log(toolContext.selectedTool);

            if (toolContext.selectedTool instanceof PathTool) {
              toolContext.selectedTool?.onClick(
                toolContext.selectedTool?.currentClickIndex + 1,
                { chunkCoords: props.info.coords, localCoords: { x, y } },
                chunks,
                setChunks,
                vehicles,
                setVehicles
              );
            } else {
              toolContext.selectedTool?.onClick(
                toolContext.selectedTool?.currentClickIndex + 1,
                { chunkCoords: props.info.coords, localCoords: { x, y } },
                chunks,
                setChunks
              );
            }
            ////////////////////////////////////////////////////////////////////////////////////////
            // console.log(
            //   toolContext.selectedTool?.currentClickIndex + 2 >=
            //     toolContext.selectedTool?.maxClicks
            // );

            if (
              toolContext.selectedTool?.currentClickIndex + 2 >=
              toolContext.selectedTool?.maxClicks
            ) {
              // console.log("set undef");
              const newTool = toolContext.selectedTool;
              newTool.currentClickIndex = -1;
              // setSelectedTool!(undefined);
            } else {
              const newTool = toolContext.selectedTool;
              newTool.currentClickIndex++;
              // setSelectedTool!({
              //   selectedTool: newTool,
              // });
              // console.log(toolContext.selectedTool);
            }
            ////////////////////////////////////////////////////////////////////////////////////////
          }
        }
      }}
      onContextMenu={(e) => {
        if (
          toolContext.selectedTool &&
          toolContext.selectedTool?.currentClickIndex >= -1
        ) {
          e.preventDefault();
          setSelectedTool!(undefined);
          console.log({ toolContext });
        }
      }}
    >
      <p
        style={{ position: "absolute", margin: 0 }}
      >{`${props.info.coords.x};${props.info.coords.y}`}</p>
      {props.info.buildings.map((building) =>
        building.getIcon({
          style: {
            left: building.globalPoint.localCoords.x * CELL_SIZE_WITH_ZOOM(),
            top: building.globalPoint.localCoords.y * CELL_SIZE_WITH_ZOOM(),
          },
          info: building,
          isSelected: vehicles.some((vehicle) =>
            vehicle.restRoute.some(
              (connect) =>
                globalPointIsEqual(connect.from, building.globalPoint) ||
                globalPointIsEqual(connect.to, building.globalPoint)
            )
          ),
        })
      )}
    </div>
  );
};
