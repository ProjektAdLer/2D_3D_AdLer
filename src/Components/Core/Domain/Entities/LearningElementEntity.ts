import { LearningComponentID } from "../../Types/EnitityTypes";
import AbstractLearningElement from "./SpecificLearningElements/AbstractLearningElement";

export default class LearningElementEntity {
  id: LearningComponentID;
  public value: number;
  public requirement: number;
  public hasScored: boolean;
  public name: string;
  public learningElementData: AbstractLearningElement;
}
