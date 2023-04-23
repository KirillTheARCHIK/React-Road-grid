import { createContext } from "react";
import { TOOLS, Tool } from "../tools";

export interface IToolContext {
  toolContext: {
    selectedTool?: Tool;
    tools: typeof TOOLS;
  };
  setToolContext: React.Dispatch<any>;
  setSelectedTool: React.Dispatch<any>;
  incrementClickIndex: (selectedTool: Tool) => void;
}

export const ToolContext = createContext({
  toolContext: {
    selectedTool: undefined,
    tools: TOOLS,
  },
} as IToolContext);
