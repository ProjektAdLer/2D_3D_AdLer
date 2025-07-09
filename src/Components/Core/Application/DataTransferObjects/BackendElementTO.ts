import { ComponentID } from "../../Domain/Types/EntityTypes";
import { LearningElementModel } from "../../Domain/LearningElementModels/LearningElementModelTypes";
import { LearningElementTypeStrings } from "../../Domain/Types/LearningElementTypes";
import { AdaptivityElementDataTO } from "./AdaptivityElement/AdaptivityElementDataTO";

export class BackendBaseElementTO {
  id: ComponentID;
  name: string;
  type: LearningElementTypeStrings;
}

export class BackendLearningElementTO extends BackendBaseElementTO {
  description: string;
  value: number;
  goals: string[];
  model: LearningElementModel;
  difficulty: number;
  estimatedTimeInMinutes: number | null;
}

export class BackendAdaptivityElementTO extends BackendLearningElementTO {
  adaptivity: AdaptivityElementDataTO;
}
