import { LearningElementType } from "../../Presentation/Babylon/LearningElement/Types/LearningElementTypes";
import { LearningComponentID } from "../../Types/EnitityTypes";

export default class LearningElementEntity {
  id: LearningComponentID;
  public type: LearningElementType;
  public isOpen: boolean = false;
  public value: number;
  public requirement: number;
  public showModal: boolean = false;
}
