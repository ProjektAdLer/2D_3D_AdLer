import { ComponentID } from "../../Domain/Types/EntityTypes";
export default class WorldStatusTO {
  worldID: ComponentID;
  elements: {
    elementID: ComponentID;
    hasScored: boolean;
  }[];
}
