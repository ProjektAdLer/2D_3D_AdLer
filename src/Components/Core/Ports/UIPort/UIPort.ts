import { injectable } from "inversify";
import IUIPort from "./IUIPort";
import IUIAdapter, { NotificationType } from "./IUIAdapter";
import AbstractPort from "../AbstractPort/AbstractPort";

@injectable()
export default class UIPort
  extends AbstractPort<IUIAdapter>
  implements IUIPort
{
  displayNotification(errorMessage: string, type: NotificationType): void {
    this.adapters.forEach((adapter) => {
      if (adapter.displayNotification)
        adapter.displayNotification(errorMessage, type);
    });
  }
}
