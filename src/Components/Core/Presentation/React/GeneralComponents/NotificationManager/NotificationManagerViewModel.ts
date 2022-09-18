import { ErrorMessage } from "./NotificationManagerPresenter";
import Observable from "../../../../../../Lib/Observable";

export default class NotificationManagerViewModel {
  errors = new Observable<ErrorMessage[]>([], true);
}
