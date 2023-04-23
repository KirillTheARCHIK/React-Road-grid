import { createContext } from "react";
import { Point } from "../coords";

export interface IFrameSizeContext{
  frameSize: Point,
  setFrameSize?: React.Dispatch<any>,
}

export const FrameSizeContext = createContext<IFrameSizeContext>({} as IFrameSizeContext);