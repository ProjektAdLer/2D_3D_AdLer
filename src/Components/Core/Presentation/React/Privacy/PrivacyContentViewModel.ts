import Observable from "src/Lib/Observable";

export default class PrivacyContentViewModel {
  cookiesAccepted: Observable<boolean> = new Observable<boolean>(false);
}
