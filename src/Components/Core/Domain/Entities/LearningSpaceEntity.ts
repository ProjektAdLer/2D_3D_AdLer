import { ComponentID } from "../Types/EntityTypes";
import LearningElementEntity from "./LearningElementEntity";

export default class LearningSpaceEntity {
  public id: ComponentID;
  public name: string;
  public elements: LearningElementEntity[];
  public description: string;
  public goals: string[];
  public requirements: string;
  public requiredScore: number;
  public parentWorldID: ComponentID;
}
