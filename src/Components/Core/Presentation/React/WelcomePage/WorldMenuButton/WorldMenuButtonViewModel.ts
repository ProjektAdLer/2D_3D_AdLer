import Observable from "../../../../../../Lib/Observable";

export default class WorldMenuButtonViewModel {
  userLoggedIn = new Observable<boolean>(false, true);
}
