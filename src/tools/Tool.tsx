import {
  GlobalPoint,
} from "../coords";
import { ReactElement } from "react";

export abstract class Tool {
  constructor(
    public name: string,
    public label: string,
    public maxClicks: number,
    public currentClickIndex: number,
    public onClick: (clickIndex: number, cellCoords: GlobalPoint) => void,
    public getIcon: (iconStyle: {
      fontSize: number;
      color: string;
    }) => ReactElement
  ) {}
}
