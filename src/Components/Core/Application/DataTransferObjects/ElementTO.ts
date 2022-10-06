import { ElementID } from "../../Domain/Types/EntityTypes";
import { ElementTypeStrings } from "../../Domain/Types/ElementTypes";

export default class ElementTO {
  id: ElementID;
  value: number;
  parentSpaceId: ElementID;
  name: string;
  description: string;
  goals: string;
  type: ElementTypeStrings;
}
