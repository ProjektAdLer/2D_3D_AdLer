import { ComponentID } from "../../Domain/Types/EntityTypes";
import { ElementTypeStrings } from "../../Domain/Types/ElementTypes";

export default class BackendElementTO {
  id: ComponentID;
  value: number;
  name: string;
  description: string;
  goals: string[];
  type: ElementTypeStrings;
}
