import Observable from "../../../../../../Lib/Observable";

export default class SignInAndOutComponentViewModel {
  userLoggedIn = new Observable<boolean>(false);
  modalVisible = new Observable<boolean>(true);
  loginFailed = new Observable<boolean>(false);
  userName = new Observable<string>("");
  errorMessage = new Observable<string>("");
  errorMessageAdvise = new Observable<string>("");
}
