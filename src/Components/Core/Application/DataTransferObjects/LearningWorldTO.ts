import { ComponentID } from "../../Domain/Types/EntityTypes";
import LearningSpaceTO from "./LearningSpaceTO";

export default class LearningWorldTO {
  id: ComponentID;
  name: string;
  spaces: LearningSpaceTO[];
  goals: string[];
  description: string;
  evaluationLink: string;
  completionModalShown: boolean | undefined;
  lastVisitedSpaceID: ComponentID | undefined;
}
