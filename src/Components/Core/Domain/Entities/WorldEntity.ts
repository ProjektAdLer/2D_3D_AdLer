import { ComponentID } from "../Types/EntityTypes";
import SpaceEntity from "./SpaceEntity";

export default class WorldEntity {
  name: string;
  spaces: SpaceEntity[];
  goals: string[];
  id: ComponentID;
  description: string;
}
