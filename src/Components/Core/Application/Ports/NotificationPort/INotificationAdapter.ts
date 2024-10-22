import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import IBreakTimeNotification from "../../../Domain/BreakTimeNotifications/IBreakTimeNotification";

export type NotificationType = LogLevelTypes.ERROR | LogLevelTypes.WARN;
export type Message = {
  message: string;
  type: NotificationType;
};

export default interface INotificationAdapter {
  displayNotification?(type: NotificationType, message: string): void;
  displayBreakTimeNotification?(
    notificationToDisplay: IBreakTimeNotification,
  ): void;
}
