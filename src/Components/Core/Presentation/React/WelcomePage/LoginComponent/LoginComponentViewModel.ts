import Observable from "../../../../../../Lib/Observable";

export default class LoginComponentViewModel {
  userLoggedIn = new Observable<boolean>(false);
  modalVisible = new Observable<boolean>(true);
}
