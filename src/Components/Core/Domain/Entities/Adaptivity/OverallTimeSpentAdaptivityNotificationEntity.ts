import { OverallTimeSpentAdaptivityNotificationBreakType } from "../../../Application/Ports/NotificationPort/INotificationAdapter";

export default class OverallTimeSpentAdaptivityNotificationEntity {
  id: NodeJS.Timeout;
  delay: number;
  notificationType: OverallTimeSpentAdaptivityNotificationBreakType;
}
