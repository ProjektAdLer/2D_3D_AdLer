import { ComponentID } from "../Types/EntityTypes";
import LearningSpaceEntity from "./LearningSpaceEntity";

export default class LearningWorldEntity {
  id: ComponentID;
  name: string;
  spaces: LearningSpaceEntity[];
  goals: string[];
  description: string;
  evaluationLink: string;
  completionModalShown: boolean | undefined;
  lastVisitedSpaceID: ComponentID | undefined;
}
