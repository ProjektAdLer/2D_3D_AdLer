import Observable from "../../../../../Lib/Observable";

export default class MoodleLoginFormViewModel {
  test = new Observable<string>("In Moodle einloggen", true);
  userToken = new Observable<string>("");
}
