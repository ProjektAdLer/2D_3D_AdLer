import { ElementID } from "../../Domain/Types/EntityTypes";

export default class ElementTO {
  id: ElementID;
  value: number;
  parentSpaceId: ElementID;
  name: string;
  description: string;
  goals: string;
  type: string;
}
