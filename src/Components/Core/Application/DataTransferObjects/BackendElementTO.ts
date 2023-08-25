import { ComponentID } from "../../Domain/Types/EntityTypes";
import { LearningElementModel } from "../../Domain/LearningElementModels/LearningElementModelTypes";
import { LearningElementTypeStrings } from "../../Domain/Types/LearningElementTypes";

export default class BackendElementTO {
  id: ComponentID;
  value: number;
  name: string;
  description: string;
  goals: string[];
  type: LearningElementTypeStrings;
  model: LearningElementModel;
}
