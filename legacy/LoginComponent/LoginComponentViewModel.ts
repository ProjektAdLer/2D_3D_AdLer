import Observable from "../../../../../../Lib/Observable";

export default class LoginComponentViewModel {
  userLoggedIn = new Observable<boolean>(false);
  modalVisible = new Observable<boolean>(true);
  loginFailed = new Observable<boolean>(false);
  userName = new Observable<string>("");
}
