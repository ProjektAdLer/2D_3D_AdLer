import AbstractLearningElement from "../../Domain/Entities/SpecificLearningElements/AbstractLearningElement";
import { LearningComponentID } from "../../Domain/Types/EntityTypes";

export default class LearningElementTO {
  id: LearningComponentID;
  name: string;
  learningElementData: AbstractLearningElement;
}
