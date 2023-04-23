import React, { useState, useEffect } from "react";
import { CELL_SIZE } from "../../const";

export const RoadNode = (props: {}) => {
  return (
    <div
      style={{
        width: CELL_SIZE * 0.8,
        height: CELL_SIZE * 0.8,
        borderRadius: 1000,
        color: "green",
        translate: `${CELL_SIZE * 0.1} ${CELL_SIZE * 0.1}`,
      }}
    ></div>
  );
};

