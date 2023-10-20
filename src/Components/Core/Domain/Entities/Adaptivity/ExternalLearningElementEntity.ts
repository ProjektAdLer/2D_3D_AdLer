import { ComponentID } from "../../Types/EntityTypes";
import { LearningElementTypeStrings } from "../../Types/LearningElementTypes";

export default class ExternalLearningElementEntity {
  id: ComponentID;
  worldID: ComponentID;
  name: string;
  type: LearningElementTypeStrings;
}
