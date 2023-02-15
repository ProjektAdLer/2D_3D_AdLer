import { ComponentID } from "../../Domain/Types/EntityTypes";

export default class UserLocationTO {
  worldID: ComponentID;
  spaceID: ComponentID | undefined;
}
