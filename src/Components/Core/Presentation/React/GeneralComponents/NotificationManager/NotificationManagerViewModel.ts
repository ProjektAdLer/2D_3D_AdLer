import { ErrorMessage } from "src/Components/Core/Application/Ports/UIPort/IUIAdapter";
import Observable from "../../../../../../Lib/Observable";

export default class NotificationManagerViewModel {
  errors = new Observable<ErrorMessage[]>([], true);
}
