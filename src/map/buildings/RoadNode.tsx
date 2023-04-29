import React, { useState, useEffect } from "react";
import { CELL_SIZE } from "../../const";

export const RoadNode = (props: (React.InputHTMLAttributes<HTMLInputElement> & React.ClassAttributes<HTMLInputElement>)) => {
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
    ></div>
  );
};
