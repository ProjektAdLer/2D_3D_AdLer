import AbstractLearningElement from "../../Domain/Entities/SpecificLearningElements/AbstractLearningElement";
import { LearningComponentID } from "../../Domain/Types/EntityTypes";

export default class LearningElementTO {
  id: LearningComponentID;
  name: string;
  // TODO: make this not optional somtime
  value?: number;
  // TODO: make this not optional somtime
  requirements?: { type: string; value: number }[];
  learningElementData: AbstractLearningElement;
}
