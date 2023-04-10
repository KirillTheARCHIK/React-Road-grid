import { AddRoadOutlined } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { ROAD } from "tools";

export const ToolButton = ({toolInfo}) => {
  const iconStyle = {
    fontSize: 70,
  };

  return <div className="tool-button" style={{
    borderRadius: 10,
  }}>
    {toolInfo.name == ROAD.name ? <AddRoadOutlined style={iconStyle} /> : <></>}
  </div>;
};
