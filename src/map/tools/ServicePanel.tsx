import { CancelOutlined, Save } from "@mui/icons-material";
import React, { useState, useEffect, useContext } from "react";
import { ChunksContext } from "../../context/ChunksContext";
import { VehiclesContext } from "../../context/VehiclesContext";

const ServicePanel = () => {
  const { vehicles, setVehicles } = useContext(VehiclesContext);
  const { chunks, setChunks } = useContext(ChunksContext);

  const iconStyle = {
    fontSize: 70,
    color: "black",
    // backgroundColor: isSelected ? '#00000020' : null,
  };

  return (
    <div
      className="round-gray-border"
      style={{
        position: "relative",
        zIndex: 10000,
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
          setVehicles!([]);
        }}
      >
        <CancelOutlined style={iconStyle} />
        <p>Очистить маршруты</p>
      </div>
      <div
        className="tool-button f-c"
        onClick={() => {
          localStorage.setItem("chunks", JSON.stringify(chunks));
          // localStorage.setItem('chunks', '{}');
        }}
      >
        <Save style={iconStyle} />
        <p>Сохранить</p>
      </div>
    </div>
  );
};

export default ServicePanel;
