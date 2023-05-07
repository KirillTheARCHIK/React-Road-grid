import React, { useState, useEffect, createContext } from "react";
import Map from "./Map";
import { CHUNK_SIZE_IN_PX } from "../const";
import ToolPanel from "./tools/ToolPanel";
import { Tool } from "../tools/Tool";
import {
  IViewChunksCoordsContext,
  IViewChunksCoordsContextDefaultValues,
  ViewChunksCoordsContext,
} from "../context/ViewChunksCoordsContext";
import {
  FrameSizeContext,
  IFrameSizeContext,
} from "../context/FrameSizeContext";
import {
  IToolContext,
  IToolContextDefaultValues,
  ToolContext,
} from "../context/ToolContext";
import { ChunkInfo, ChunkMap } from "./Chunk";
import { ChunksContext } from "../context/ChunksContext";
import {
  IRoutesContextDefaultValues,
  RoutesContext,
} from "../context/RoutesContext";
import ServicePanel from "./tools/ServicePanel";
import { Building, findBuilding, RoadNodeBuilding } from "../buildings";

export const MapFrame = () => {
  const [viewChunksCoords, setViewChunksCoords] = useState(
    IViewChunksCoordsContextDefaultValues.viewChunksCoords
  );
  const [frameSize, setFrameSize] = useState({ x: 0, y: 0 });
  const [chunks, setChunks] = useState({} as ChunkMap);
  const [viewChunks, setViewChunks] = useState([[]] as Array<Array<ChunkInfo>>);
  const [toolContext, setToolContext] = useState(
    IToolContextDefaultValues.toolContext
  );
  const [routes, setRoutes] = useState(IRoutesContextDefaultValues.routes);

  function setSelectedTool(selectedTool: Tool) {
    setToolContext({
      ...toolContext,
      selectedTool,
    });
  }

  useEffect(() => {
    let newChunks = chunks;
    let newViewChunks: typeof viewChunks = [];
    for (
      let chunkY = viewChunksCoords.topYChunkIndex;
      chunkY >= viewChunksCoords.bottonYChunkIndex;
      chunkY--
    ) {
      newViewChunks.push([]);
      for (
        let chunkX = viewChunksCoords.leftXChunkIndex;
        chunkX <= viewChunksCoords.rightXChunkIndex;
        chunkX++
      ) {
        if (newChunks[`${chunkX};${chunkY}`] == undefined) {
          newChunks[`${chunkX};${chunkY}`] = {
            coords: {
              x: chunkX,
              y: chunkY,
            },
            coordsStr: `${chunkX};${chunkY}`,
            buildings: [],
          };
        }
        newViewChunks[viewChunksCoords.topYChunkIndex - chunkY].push(
          newChunks[`${chunkX};${chunkY}`]
        );
      }
    }
    setChunks(newChunks);
    setViewChunks(newViewChunks);
  }, [viewChunksCoords, frameSize]);

  useEffect(() => {
    // localStorage.setItem("chunks", '{}');
    const chunksStr = localStorage.getItem("chunks");
    if (chunksStr) {
      const cachedChunksJSON = JSON.parse(chunksStr) ?? {};
      console.log(cachedChunksJSON);
      const newChunks: ChunkMap = {};
      for (const key in cachedChunksJSON) {
        newChunks[key] = {
          ...cachedChunksJSON[key],
          buildings: cachedChunksJSON[key].buildings.map(
            (buildingJSON: any) => {
              if (buildingJSON.type == RoadNodeBuilding.Name) {
                return new RoadNodeBuilding(
                  buildingJSON.currentClickIndex,
                  buildingJSON.globalPoint,
                  buildingJSON.connects,
                );
              } else {
                throw new TypeError("Необработанный тип постройки");
              }
            }
          ),
        };
      }
      // for (const key in newChunks) {
      //   newChunks[key].buildings.forEach((building, index) => {
      //     if (building instanceof RoadNodeBuilding) {
      //       const buildingJSON = cachedChunksJSON[key].buildings[index];
      //       if (buildingJSON.type == RoadNodeBuilding.Name) {
      //         buildingJSON.connects.forEach((connect: any) => {
      //           const findedBuilding = findBuilding(
      //             newChunks,
      //             connect.globalPoint
      //           ) as RoadNodeBuilding;
      //           if (findedBuilding) {
      //             building.connects.push(findedBuilding);
      //           }
      //         });
      //       }
      //     }
      //   });
      // }
      console.log(newChunks);
      setChunks(newChunks);
    }

    setFrameSize({
      x: window.innerWidth,
      y: window.innerHeight,
    });
  }, []);

  return (
    <RoutesContext.Provider value={{ routes, setRoutes }}>
      <ViewChunksCoordsContext.Provider
        value={{
          viewChunksCoords,
          setViewChunksCoords,
        }}
      >
        <FrameSizeContext.Provider
          value={{
            frameSize,
            setFrameSize,
          }}
        >
          <ToolContext.Provider
            value={{
              toolContext,
              setToolContext,
              setSelectedTool,
            }}
          >
            <ChunksContext.Provider value={{ chunks, setChunks }}>
              <div
                style={{
                  width: frameSize.x,
                  height: frameSize.y,
                  overflow: "hidden",
                }}
              >
                <Map chunks={viewChunks} />
                <div
                  style={{
                    position: "absolute",
                    left: "50px",
                    bottom: "50px",
                  }}
                >
                  <ToolPanel />
                </div>
                <div
                  style={{
                    position: "absolute",
                    right: "50px",
                    bottom: "50px",
                  }}
                >
                  <ServicePanel />
                </div>
              </div>
            </ChunksContext.Provider>
          </ToolContext.Provider>
        </FrameSizeContext.Provider>
      </ViewChunksCoordsContext.Provider>
    </RoutesContext.Provider>
  );
};
