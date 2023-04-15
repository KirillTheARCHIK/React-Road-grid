import { CELL_SIZE, CHUNK_SIZE, CHUNK_SIZE_IN_PX } from "const";
import React from "react";
import { useContext } from "react";
import { ToolContext } from "./MapFrame";

const Chunk = ({ info }) => {
  const { toolContext, setSelectedTool, incrementClickIndex } = useContext(ToolContext);

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
        var rect = e.target.getBoundingClientRect();
        var xPx = e.clientX - rect.left; //x position within the element.
        var yPx = e.clientY - rect.top; //y position within the element.
        var x = Math.floor(xPx / CELL_SIZE);
        var y = Math.floor(yPx / CELL_SIZE);
        // console.log({ x: x, y: y });

        console.log(toolContext.selectedTool);
        toolContext.selectedTool?.onClick({
          clickIndex: toolContext.selectedTool?.currentClickIndex+1,
          cellCoords: { x, y },
        });
        incrementClickIndex(toolContext.selectedTool);
        
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setSelectedTool(null);
        console.log({ toolContext });
      }}
    >
      {info.coords}
    </div>
  );
};

export default Chunk;
