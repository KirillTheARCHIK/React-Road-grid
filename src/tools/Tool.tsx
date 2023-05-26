import { GlobalPoint } from "../coords";
import { ReactElement } from "react";
import { ChunkInfo } from "../map/Chunk";

export abstract class Tool {
  constructor(
    public name: string,
    public label: string,
    public maxClicks: number,
    public currentClickIndex: number,
    public onClick: (
      clickIndex: number,
      cellCoords: GlobalPoint,
      chunks?: {
        [key: string]: ChunkInfo;
      },
      setChunks?: React.Dispatch<
        React.SetStateAction<{
          [key: string]: ChunkInfo;
        }>
      >
    ) => void,
    public getIcon: (iconStyle: {
      fontSize: number;
      color: string;
    }) => ReactElement,
    public getSettings: () => ReactElement,
    public settings: ToolSettings = new ToolSettings(),
  ) {}
}

export class ToolSettings{}