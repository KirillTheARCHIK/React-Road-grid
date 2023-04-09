import { CELL_SIZE, CHUNK_SIZE, CHUNK_SIZE_IN_PX } from "const";
import React from "react";

const Chunk = ({info}) => {

  return (
    <div
      className="background-cell"
      style={{
        width: CHUNK_SIZE_IN_PX,
        height: CHUNK_SIZE_IN_PX,
        outline: "red solid 1px",
        display: 'flex center center'
      }}
    >
      {info.coords}
    </div>
  );
};

export default Chunk;
