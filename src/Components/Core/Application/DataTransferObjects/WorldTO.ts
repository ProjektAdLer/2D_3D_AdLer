import { ComponentID } from "../../Domain/Types/EntityTypes";
import SpaceTO from "./SpaceTO";

export default class WorldTO {
  id: ComponentID;
  name: string;
  spaces: SpaceTO[];
  goal: string;
  description: string;
}
