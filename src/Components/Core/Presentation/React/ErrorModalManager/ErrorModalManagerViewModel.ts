import Observable from "../../../../../Lib/Observable";

export default class ErrorModalManagerViewModel {
  errors = new Observable<string[]>([], true);
}
