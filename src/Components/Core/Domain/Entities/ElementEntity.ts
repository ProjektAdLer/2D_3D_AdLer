import { ElementTypeStrings } from "../Types/ElementTypes";
import { ElementID } from "../Types/EntityTypes";

export default class ElementEntity {
  public id: ElementID;
  public value: number;
  public hasScored: boolean;
  public name: string;
  public description: string;
  public goals: string;
  public type: ElementTypeStrings;
  public parentSpaceId: ElementID;
  public parentCourseId: ElementID;
}
