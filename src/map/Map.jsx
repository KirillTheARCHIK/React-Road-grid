import React from 'react'
import Chunk from './Chunk'
import { CHUNK_SIZE_IN_PX } from 'const'

const Map = ({chunks = [[]]}) => {
  return (
    <div style={{
      cursor: 'grab',
      width: chunks[0].length*CHUNK_SIZE_IN_PX,
      height: chunks.length*CHUNK_SIZE_IN_PX,
      // display: 'grid',
      // gridColumn: chunks[0].length,
      // gridRow: chunks.length,
    }}>
      {chunks.map((chunkRow)=>{
        return (<div style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          {chunkRow.map((chunkInfo)=>{
            return <Chunk info={chunkInfo} />
          })}
        </div>)
      })}
    </div>
  )
}

export default Map