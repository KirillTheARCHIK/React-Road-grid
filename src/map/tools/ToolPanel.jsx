import { ToolContext } from "map/MapFrame";
import React, { useState, useEffect, useContext } from "react";
import { ToolButton } from "./ToolButton";

const ToolPanel = () => {
  const {toolContext} = useContext(ToolContext);

  console.log(toolContext);

  return toolContext.tools ? (
    <div
      className="round-gray-border"
      style={{
        display: "flex",
        flexDirection: "row",
        // minHeight: 100,
        // minWidth: 100,
        backgroundColor: "white",
        padding: 10,
      }}
    >
      {Object.keys(toolContext.tools).map((key) => {
        return <ToolButton toolInfo={toolContext.tools[key]} />;
      })}
    </div>
  ) : (
    <></>
  );
};

export default ToolPanel;
