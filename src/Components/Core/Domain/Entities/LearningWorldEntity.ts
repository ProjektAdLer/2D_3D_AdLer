import { ComponentID } from "../Types/EntityTypes";
import LearningSpaceEntity from "./LearningSpaceEntity";

export default class LearningWorldEntity {
  name: string;
  spaces: LearningSpaceEntity[];
  goals: string[];
  id: ComponentID;
  description: string;
  evaluationLink: string;
}
