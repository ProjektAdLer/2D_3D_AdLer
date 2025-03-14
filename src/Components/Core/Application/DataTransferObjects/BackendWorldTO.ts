import { BackendBaseElementTO } from "./BackendElementTO";
import { LearningSpaceThemeType } from "../../Domain/Types/LearningSpaceThemeTypes";
import BackendNarrativeFrameworkTO from "./BackendNarrativeFrameworkTO";
import BackendSpaceTO from "./BackendSpaceTO";

export default class BackendWorldTO {
  worldName: string;
  spaces: BackendSpaceTO[];
  goals: string[];
  description: string;
  evaluationLink: string;
  externalElements: BackendBaseElementTO[];
  narrativeFramework: BackendNarrativeFrameworkTO | null;
  theme: LearningSpaceThemeType;
}
