import { ComponentID } from "../../Domain/Types/EntityTypes";
import SpaceTO from "./SpaceTO";

export default class WorldTO {
  worldID: ComponentID;
  worldName: string;
  spaces: SpaceTO[];
  worldGoal: string;
  description: string;
  goals: string;

  //TODO: Remove doubled goals
}
