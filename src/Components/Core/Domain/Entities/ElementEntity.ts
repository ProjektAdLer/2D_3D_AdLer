import { ElementID } from "../Types/EntityTypes";
import AbstractElementData from "./ElementData/AbstractElementData";

export default class ElementEntity {
  id: ElementID;
  parentCourseId: ElementID;
  public value: number;
  public requirements: { type: string; value: number }[];
  public hasScored: boolean;
  public name: string;
  public elementData: AbstractElementData;
}
