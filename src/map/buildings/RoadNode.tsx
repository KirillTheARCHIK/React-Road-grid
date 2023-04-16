import React, { useState, useEffect } from 'react';
import { CELL_SIZE } from '../../const';

type Props = {
  info: any;
}

const RoadNode = (props: Props) => {
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

export default RoadNode