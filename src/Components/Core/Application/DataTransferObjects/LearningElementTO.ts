import { ComponentID } from "../../Domain/Types/EntityTypes";
import { LearningElementModel } from "../../Domain/LearningElementModels/LearningElementModelTypes";
import { LearningElementTypeStrings } from "../../Domain/Types/LearningElementTypes";
import { ThemeType } from "../../Domain/Types/ThemeTypes";
import { DifficultyInfo } from "../../Domain/Types/LearningElementDifficulty";

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
  theme: ThemeType;
  isScoreable: boolean;
  isRequired: boolean | null;
  difficulty: DifficultyInfo;
  estimatedTimeInMinutes: number | null;
}
