import { CELL_SIZE, CHUNK_SIZE, CHUNK_SIZE_IN_PX } from "../const";
import React from "react";
import { useContext } from "react";
import { ChunkPoint } from "../coords";
import { ToolContext } from "../context/ToolContext";
import { Building } from "../buildings";

export interface ChunkInfo {
  coords: ChunkPoint;
  coordsStr: string;
  buildings: Array<Building>;
}

export const Chunk = (props: { info: ChunkInfo }) => {
  const { toolContext, setSelectedTool, incrementClickIndex } =
    useContext(ToolContext);

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

        console.log(toolContext.selectedTool);
        toolContext.selectedTool?.onClick(
          toolContext.selectedTool?.currentClickIndex + 1,
          { chunkCoords: props.info.coords, localCoords: { x, y } }
        );
        if(toolContext.selectedTool){
          incrementClickIndex!(toolContext.selectedTool);
        }
      }}
      onContextMenu={(e) => {
        if (toolContext.selectedTool && toolContext.selectedTool?.currentClickIndex >= -1) {
          e.preventDefault();
          setSelectedTool!(undefined);
          console.log({ toolContext });
        }
      }}
    >
      {`${props.info.coords.x};${props.info.coords.y}`}
    </div>
  );
};
