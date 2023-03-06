import { ElementTypeStrings } from "../Types/ElementTypes";
import { ComponentID } from "../Types/EntityTypes";

export default class ElementEntity {
  public id: ComponentID;
  public value: number;
  public hasScored: boolean;
  public name: string;
  public description: string;
  public goals: string;
  public type: ElementTypeStrings;
  public parentSpaceID: ComponentID;
  public parentWorldID: ComponentID;
}
