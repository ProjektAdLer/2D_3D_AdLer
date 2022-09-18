import AbstractElement from "../../Domain/Entities/ElementData/AbstractElementData";
import { ElementID } from "../../Domain/Types/EntityTypes";

export default class ElementTO {
  id: ElementID;
  name: string;
  value?: number;
  // TODO: make this not optional sometime
  requirements?: { type: string; value: number }[];
  elementData: AbstractElement;
}
