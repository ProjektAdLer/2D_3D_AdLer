import { LearningElementType } from "../../Presentation/LearningElement/Types/LearningElementTypes";
import AbstractEntity from "./AbstractEntity";

export default class LearningElementEntity extends AbstractEntity {
  public type: LearningElementType;
}
