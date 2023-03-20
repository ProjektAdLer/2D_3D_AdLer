import { ComponentID } from "../../Domain/Types/EntityTypes";
import { ElementTypeStrings } from "../../Domain/Types/ElementTypes";

export default class BackendElementTO {
  id: ComponentID;
  value: number;
  deleteme__parentSpaceID: ComponentID;
  deleteme__parentWorldID: ComponentID;
  name: string;
  description: string;
  goals: string;
  type: ElementTypeStrings;
  hasScored: boolean;
  filePath?: string;
}
