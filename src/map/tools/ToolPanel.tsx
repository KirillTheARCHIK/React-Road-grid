import React, { useState, useEffect, useContext } from "react";
import { ToolButton } from "./ToolButton";
import { ToolContext } from "../../context/ToolContext";
import { Tool } from "../../tools";

const ToolPanel = () => {
  const { toolContext, setSelectedTool } = useContext(ToolContext);

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
        const tool = (toolContext.tools as { [s: string]: Tool })[key];
        return (
          <ToolButton
            toolInfo={tool}
            isSelected={tool?.name == toolContext?.selectedTool?.name}
            setSelectedTool={setSelectedTool}
          />
        );
      })}
    </div>
  ) : null;
};

export default ToolPanel;
