import { IAbstractPort } from "./IAbstractPort";
import IUIAdapter, { NotificationType } from "../UIPort/IUIAdapter";

export default interface IUIPort extends IAbstractPort<IUIAdapter> {
  displayNotification(errorMessage: string, type: NotificationType): void;
}
