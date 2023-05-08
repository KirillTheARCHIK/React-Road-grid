import React, { useState, useEffect } from "react";

export const MapControlButton = (
  props: React.HTMLAttributes<HTMLDivElement>
) => {
  return (
    <div className="map-control__button" {...props}>
      <div className="map-control__button__inner">
        {props.children}
      </div>
    </div>
  );
};
