import { ElementID } from "../Types/EntityTypes";

export default class ElementEntity {
  id: ElementID;
  public value: number;
  public hasScored: boolean;
  public name: string;
  public description: string;
  public goals: string;
  public type: string;
}
