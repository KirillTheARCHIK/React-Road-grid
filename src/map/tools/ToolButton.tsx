import { AddRoadOutlined } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { Tool } from "../../tools/Tool";

export const ToolButton = (props: {
  toolInfo: Tool;
  isSelected: Boolean;
  setSelectedTool?: React.Dispatch<any>;
}) => {
  const iconStyle = {
    fontSize: 70,
    color: "black",
    // backgroundColor: isSelected ? '#00000020' : null,
  };
  return (
    <div
      className="tool-button f-c"
      style={{
        borderRadius: 10,
        alignContent: "center",
        overflow: "hidden",
        padding: "0 0 5px 0",
      }}
      onClick={() => {
        props.toolInfo.currentClickIndex = -1;
        props.setSelectedTool!(props.toolInfo);
      }}
    >
      {props.toolInfo.getIcon(iconStyle) ?? null}
      <p>{props.toolInfo.label}</p>
      <hr
        style={{
          margin: 0,
          height: 2,
          width: '100%',
          backgroundColor: props.isSelected ? iconStyle.color : "#00000000",
        }}
      />
    </div>
  );
};
