import { IAbstractPort } from "../AbstractPort/IAbstractPort";
import IUIAdapter, { NotificationType } from "./IUIAdapter";

export default interface IUIPort extends IAbstractPort<IUIAdapter> {
  displayNotification(errorMessage: string, type: NotificationType): void;
}
