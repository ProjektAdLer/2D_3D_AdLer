import { ComponentID } from "../../Domain/Types/EntityTypes";
import { ElementTypeStrings } from "../../Domain/Types/ElementTypes";

export default class ElementTO {
  id: ComponentID;
  value: number;
  parentSpaceId: ComponentID;
  parentCourseId: ComponentID;
  name: string;
  description: string;
  goals: string;
  type: ElementTypeStrings;
  hasScored: boolean;
  filePath?: string;
}
