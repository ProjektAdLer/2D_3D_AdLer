import Observable from "src/Lib/Observable";

export default class PrivacyViewModel {
  cookiesAccepted: Observable<boolean> = new Observable<boolean>(false);
}
