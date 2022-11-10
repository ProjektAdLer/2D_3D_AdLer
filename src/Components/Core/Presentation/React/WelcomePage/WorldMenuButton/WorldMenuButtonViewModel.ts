import Observable from "../../../../../../Lib/Observable";

export default class WorldMenuButtonViewModel {
  loggedInMoodle = new Observable<boolean>(false, true);
}
