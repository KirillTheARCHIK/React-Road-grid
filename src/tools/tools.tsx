import { PathTool } from "./pathTool";
import { RoadTool } from "./roadTool";
import { BuildRoadNodeTool} from "./buildTool";
import { ClearPathTool } from "./clearPathsTool";

export const TOOLS = {
  [new BuildRoadNodeTool().name]: new BuildRoadNodeTool(),
  [new RoadTool().name]: new RoadTool(),
  [new PathTool().name]: new PathTool(),
  [new ClearPathTool().name]: new ClearPathTool(),
};