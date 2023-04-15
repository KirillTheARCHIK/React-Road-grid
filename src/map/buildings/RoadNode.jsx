import { CELL_SIZE } from 'const';
import React, { useState, useEffect } from 'react';

export const RoadNode = ({info}) => {
    return (
        <div style={{
          width: CELL_SIZE*0.8,
          height: CELL_SIZE*0.8,
          borderRadius: 1000,
          color: 'green',
        }}>
            
        </div>
    )
}