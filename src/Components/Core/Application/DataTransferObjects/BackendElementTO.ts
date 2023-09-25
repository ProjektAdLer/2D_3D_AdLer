import { ComponentID } from "../../Domain/Types/EntityTypes";
import { LearningElementModel } from "../../Domain/LearningElementModels/LearningElementModelTypes";
import { LearningElementTypeStrings } from "../../Domain/Types/LearningElementTypes";
import { AdaptivityElementDataTO } from "./AdaptivityElement/AdaptivityElementDataTO";

export default class BackendElementTO {
  id: ComponentID;
  value: number;
  name: string;
  description: string;
  goals: string[];
  type: LearningElementTypeStrings;
  model: LearningElementModel;
  adaptivity?: AdaptivityElementDataTO;
}
