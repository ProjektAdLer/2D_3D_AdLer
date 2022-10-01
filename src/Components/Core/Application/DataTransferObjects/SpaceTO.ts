import { ElementID } from "../../Domain/Types/EntityTypes";
import ElementTO from "./ElementTO";

export default class SpaceTO {
  id: ElementID;
  name: string;
  elements: ElementTO[];
  description: string;
  goals: string;
  requirements: ElementID[];
}
