import { createContext } from "react";
import { Tool } from "../tools/Tool";
import { TOOLS } from "../tools/tools";

// export class IToolContext {
//   constructor(
//     public toolContext: {
//       selectedTool?: Tool;
//       tools: typeof TOOLS;
//     } = {
//       tools: TOOLS,
//     },
//     public setToolContext?: React.Dispatch<any>,
//     public setSelectedTool?: React.Dispatch<any>,
//     public incrementClickIndex?: (selectedTool: Tool) => void,
//   ){}
// }
export interface IToolContext {
  toolContext: {
    selectedTool?: Tool;
    tools: typeof TOOLS;
  };
  setToolContext?: React.Dispatch<any>;
  setSelectedTool?: React.Dispatch<any>;
  incrementClickIndex?: () => void;
}

export const IToolContextDefaultValues = {
  toolContext: {
    selectedTool: undefined,
    tools: TOOLS,
  },
} as IToolContext;

export const ToolContext = createContext<IToolContext>(
  IToolContextDefaultValues
);
