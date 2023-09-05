import { ErrorMessage } from "src/Components/Core/Application/Ports/NotificationPort/INotificationAdapter";
import Observable from "../../../../../../Lib/Observable";

export default class NotificationManagerViewModel {
  errors = new Observable<ErrorMessage[]>([], true);
}
