import { ComponentID } from "../Types/EntityTypes";

export default class UserDataEntity {
  userToken: string;
  username: string;
  isLoggedIn: boolean;
  availableWorlds: { worldID: ComponentID; worldName: string }[] = [];
  currentWorldID: ComponentID | undefined = undefined;
  currentSpaceID: ComponentID | undefined = undefined;
  lastVisitedWorldID: ComponentID | undefined = undefined;
}
