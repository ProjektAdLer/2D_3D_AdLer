import { LearningElementType } from "../../Presentation/Babylon/LearningElement/Types/LearningElementTypes";
import AbstractEntity from "./AbstractEntity";

export default class LearningElementEntity extends AbstractEntity {
  learningElementId: number;
  public type: LearningElementType;
  public isOpen: boolean = false;
  public value: number;
  public requirement: number;
}
