import { CELL_SIZE, CHUNK_SIZE, CHUNK_SIZE_IN_PX } from "../const";
import React from "react";
import { useContext } from "react";
import { ChunkPoint } from "../coords";
import { ToolContext } from "../context/ToolContext";
import { Building } from "../buildings";
import { BuildTool, RoadTool } from "../tools";
import { ChunksContext } from "../context/ChunksContext";

export interface ChunkInfo {
  coords: ChunkPoint;
  coordsStr: string;
  buildings: Array<Building>;
}

export const Chunk = (props: { info: ChunkInfo }) => {
  const { toolContext, setSelectedTool, incrementClickIndex } =
    useContext(ToolContext);
  const { chunks, setChunks } = useContext(ChunksContext);

  return (
    <div
      className="background-cell"
      style={{
        width: CHUNK_SIZE_IN_PX,
        height: CHUNK_SIZE_IN_PX,
        outline: "red solid 1px",
        fontSize: "40px",
      }}
      onClick={(e) => {
        var rect = e.currentTarget.getBoundingClientRect();
        var xPx = e.clientX - rect.left; //x position within the element.
        var yPx = e.clientY - rect.top; //y position within the element.
        var x = Math.floor(xPx / CELL_SIZE);
        var y = Math.floor(yPx / CELL_SIZE);
        // console.log({ x: x, y: y });

        if (toolContext.selectedTool) {
          if (
            toolContext.selectedTool?.currentClickIndex + 1 <
            toolContext.selectedTool?.maxClicks
          ) {
            ////////////////////////////////////////////////////////////////////////////////////////
            if (toolContext.selectedTool instanceof BuildTool) {
              toolContext.selectedTool?.onClick(
                toolContext.selectedTool?.currentClickIndex + 1,
                { chunkCoords: props.info.coords, localCoords: { x, y } },
                chunks,
                setChunks
              );
            } else if (toolContext.selectedTool instanceof RoadTool) {
              // console.log(chunks);

              toolContext.selectedTool?.onClick(
                toolContext.selectedTool?.currentClickIndex + 1,
                { chunkCoords: props.info.coords, localCoords: { x, y } },
                chunks,
                setChunks
              );
            }
            // console.log(toolContext.selectedTool);
            // else {
            //   toolContext.selectedTool?.onClick(
            //     toolContext.selectedTool?.currentClickIndex,
            //     { chunkCoords: props.info.coords, localCoords: { x, y } }
            //   );
            // }
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

              setSelectedTool!(undefined);
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
          info: building,
          style: {
            left: building.globalPoint.localCoords.x * CELL_SIZE,
            top: building.globalPoint.localCoords.y * CELL_SIZE,
          },
        })
      )}
    </div>
  );
};
