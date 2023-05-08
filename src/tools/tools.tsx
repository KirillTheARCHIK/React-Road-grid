import { PathTool } from "./pathTool";
import { RoadTool } from "./roadTool";
import { BuildRoadNodeTool} from "./buildTool";
import { DeleteTool } from "./deleteTool";

export const TOOLS = {
  [new BuildRoadNodeTool().name]: new BuildRoadNodeTool(),
  [new RoadTool().name]: new RoadTool(),
  [new PathTool().name]: new PathTool(),
  [new DeleteTool().name]: new DeleteTool(),
};