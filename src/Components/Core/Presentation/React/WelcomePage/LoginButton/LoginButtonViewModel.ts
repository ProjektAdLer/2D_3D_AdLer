import Observable from "../../../../../../Lib/Observable";

export default class LoginButtonViewModel {
  loginSuccessful = new Observable<boolean>(false, true);
}
