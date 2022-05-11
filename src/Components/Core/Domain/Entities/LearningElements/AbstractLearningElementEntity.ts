import { LearningElementType } from "../../../Presentation/Babylon/LearningElement/Types/LearningElementTypes";
import { LearningComponentID } from "../../../Types/EnitityTypes";

export abstract class AbstractLearningElementEntity {
  id: LearningComponentID;
  type: LearningElementType;
}
