import { PathTool } from "./pathTool";
import { RoadTool } from "./roadTool";
import { BuildRoadNodeTool} from "./buildTool";

export const TOOLS = {
  roadNode: new BuildRoadNodeTool(),
  road: new RoadTool(),
  path: new PathTool(),
};