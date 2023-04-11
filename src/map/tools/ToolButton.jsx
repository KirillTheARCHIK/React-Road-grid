import { AddRoadOutlined } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { ROAD } from "tools";

export const ToolButton = ({toolInfo, isSelected=false, setSelectedTool}) => {
  const iconStyle = {
    fontSize: 70,
    color: 'black',
    // backgroundColor: isSelected ? '#00000020' : null,
  };

  return <div className="tool-button f-c" style={{
    borderRadius: 10,
    alignContent: 'center',
    overflow: 'hidden',
    padding: '0 0 5px 0',
  }} onClick={()=>{
    setSelectedTool(toolInfo);
  }}>
    {toolInfo.name == ROAD.name ? <AddRoadOutlined style={iconStyle} /> : null}
    <p>{toolInfo.label}</p>
    {<hr style={{
      margin: 0,
      height: 2,
      backgroundColor: isSelected ? iconStyle.color: '#00000000',
    }} /> }
  </div>;
};
