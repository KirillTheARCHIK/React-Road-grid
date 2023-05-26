import { createContext } from "react";
import { Tool } from "../tools/Tool";
import { TOOLS } from "../tools/tools";

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
