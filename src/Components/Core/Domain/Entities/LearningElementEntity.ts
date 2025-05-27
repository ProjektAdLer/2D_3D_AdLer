import { LearningElementTypeStrings } from "../Types/LearningElementTypes";
import { ComponentID } from "../Types/EntityTypes";
import { LearningElementModel } from "../LearningElementModels/LearningElementModelTypes";

export default class LearningElementEntity {
  public id: ComponentID;
  public value: number;
  public hasScored: boolean;
  public name: string;
  public description: string;
  public goals: string[];
  public type: LearningElementTypeStrings;
  public model: LearningElementModel;
  public parentWorldID: ComponentID;
  public isRequired: boolean | null;
  public difficulty: number;
}
