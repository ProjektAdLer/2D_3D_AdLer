import { ComponentID } from "../../Domain/Types/EntityTypes";
import { LearningElementModel } from "../../Domain/LearningElementModels/LearningElementModelTypes";
import { LearningElementTypeStrings } from "../../Domain/Types/LearningElementTypes";
import { LearningSpaceThemeType } from "../../Domain/Types/LearningSpaceThemeTypes";

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
  model: LearningElementModel;
  theme: LearningSpaceThemeType;
  isScoreable: boolean;
  isRequired: boolean | null;
}
