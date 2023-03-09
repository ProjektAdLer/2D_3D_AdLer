import { ComponentID } from "../../Domain/Types/EntityTypes";
export default class BackendWorldStatusTO {
  worldId: ComponentID;
  elements: {
    elementId: ComponentID;
    success: boolean;
  }[];
}
