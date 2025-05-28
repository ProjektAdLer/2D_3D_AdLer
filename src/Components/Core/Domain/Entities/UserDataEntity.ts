import { ComponentID } from "../Types/EntityTypes";
import AvatarEntity from "./AvatarEntity";
import ExperiencePointsEntity from "./ExperiencePointsEntity";

export default class UserDataEntity {
  userToken: string;
  username: string;
  isLoggedIn: boolean;
  availableWorlds: { worldID: ComponentID; worldName: string }[] = [];
  currentWorldID: ComponentID | undefined = undefined;
  currentSpaceID: ComponentID | undefined = undefined;
  lastVisitedWorldID: ComponentID | undefined = undefined;
  avatar: AvatarEntity;
  experiencePoints: ExperiencePointsEntity[] = [];
}
