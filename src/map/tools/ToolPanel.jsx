import React, { useState, useEffect, useContext } from "react";
import { ToolContext } from "../MapFrame";
import { ToolButton } from "./ToolButton";

const ToolPanel = () => {
  const {toolContext, setSelectedTool} = useContext(ToolContext);


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
        const tool = toolContext.tools[key];
        return <ToolButton toolInfo={tool} isSelected={tool?.name == toolContext?.selectedTool?.name} setSelectedTool={setSelectedTool} />;
      })}
    </div>
  ) : null;
};

export default ToolPanel;
