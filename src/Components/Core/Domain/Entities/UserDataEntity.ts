export default class UserDataEntity {
  userToken: string;
  username: string;
  isLoggedIn: boolean;
  availableWorlds: { worldID: number; worldName: string }[] = [];
}
