import { BreakTimeNotificationType } from "src/Components/Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";

export type NotificationType =
  | LogLevelTypes.ERROR
  | LogLevelTypes.WARN
  | "notification";
export type Message = {
  message: string;
  type: NotificationType;
};

export default interface INotificationAdapter {
  displayNotification?(type: NotificationType, message: string): void;
  displayBreakTimeNotification?(type: BreakTimeNotificationType): void;
}
