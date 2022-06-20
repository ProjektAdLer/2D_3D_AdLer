import Observable from "../../../../../Lib/Observable";

export default class MoodleLoginFormViewModel {
  userToken = new Observable<string>("");
  visible = new Observable<boolean>(false);
}
