import Observable from "../../../../../Lib/Observable";

export default class MoodleLoginButtonViewModel {
  loginSuccessful = new Observable<boolean>(false, true);
}
