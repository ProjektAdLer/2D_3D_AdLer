import { ComponentID } from "../Types/EntityTypes";
import { LearningSpaceTemplateType } from "../Types/LearningSpaceTemplateType";
import LearningElementEntity from "./LearningElementEntity";

export default class LearningSpaceEntity {
  public id: ComponentID;
  public name: string;
  public elements: (LearningElementEntity | null)[];
  public description: string;
  public goals: string[];
  public requirements: string;
  public requiredScore: number;
  public template: LearningSpaceTemplateType;
  public parentWorldID: ComponentID;
}
