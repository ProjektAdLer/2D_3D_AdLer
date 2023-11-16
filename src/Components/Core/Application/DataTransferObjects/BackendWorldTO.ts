import { BackendBaseElementTO } from "./BackendElementTO";
import BackendSpaceTO from "./BackendSpaceTO";

export default class BackendWorldTO {
  worldName: string;
  spaces: BackendSpaceTO[];
  goals: string[];
  description: string;
  evaluationLink: string;
  externalElements: BackendBaseElementTO[];
}
