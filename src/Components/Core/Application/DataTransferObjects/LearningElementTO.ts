import { ComponentID } from "../../Domain/Types/EntityTypes";
import { LearningElementTypeStrings } from "../../Domain/Types/LearningElementTypes";

export default class LearningElementTO {
  id: ComponentID;
  value: number;
  parentSpaceID: ComponentID;
  parentWorldID: ComponentID;
  name: string;
  description: string;
  goals: string[];
  type: LearningElementTypeStrings;
  hasScored: boolean;
  filePath?: string;
}
