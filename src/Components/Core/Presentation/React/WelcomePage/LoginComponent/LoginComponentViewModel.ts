import Observable from "../../../../../../Lib/Observable";

export default class LoginComponentViewModel {
  loginSuccessful = new Observable<boolean>(false);
  modalVisible = new Observable<boolean>(false);
}
