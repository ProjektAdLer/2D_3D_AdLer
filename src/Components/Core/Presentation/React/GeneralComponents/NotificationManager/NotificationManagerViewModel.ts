import { Message } from "src/Components/Core/Application/Ports/NotificationPort/INotificationAdapter";
import Observable from "../../../../../../Lib/Observable";

export default class NotificationManagerViewModel {
  messages = new Observable<Message[]>([], true);
}
