import AbstractLearningElement from "../../Domain/Entities/SpecificLearningElements/AbstractLearningElement";
import { LearningComponentID } from "../../Domain/Types/EntityTypes";

export default class LearningElementTO {
  id: LearningComponentID;
  name: string;
  value?: number;
  // TODO: make this not optional sometime
  requirements?: { type: string; value: number }[];
  learningElementData: AbstractLearningElement;
}
