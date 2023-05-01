import { CancelOutlined, Save } from "@mui/icons-material";
import React, { useState, useEffect, useContext } from "react";
import { ChunksContext } from "../../context/ChunksContext";
import { RoutesContext } from "../../context/RoutesContext";

const ServicePanel = () => {
  const { routes, setRoutes } = useContext(RoutesContext);
  const { chunks, setChunks } = useContext(ChunksContext);

  const iconStyle = {
    fontSize: 70,
    color: "black",
    // backgroundColor: isSelected ? '#00000020' : null,
  };

  return <div
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
    <div
      className="tool-button f-c"
      onClick={() => {
        setRoutes!([]);
      }}
    >
      <CancelOutlined style={iconStyle} />
      <p>Очистить маршруты</p>
    </div>
    <div
      className="tool-button f-c"
      onClick={() => {
        localStorage.setItem('chunks', JSON.stringify(chunks));
      }}
    >
      <Save style={iconStyle} />
      <p>Сохранить</p>
    </div>
  </div>;
};

export default ServicePanel;
