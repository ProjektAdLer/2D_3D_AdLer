import { OverallTimeSpentAdaptivityNotificationBreakType } from "../Ports/NotificationPort/INotificationAdapter";

export default class OverallTimeSpentAdaptivityNotificationSettingsTO {
  // timer in minutes
  delay: number;
  breakType: OverallTimeSpentAdaptivityNotificationBreakType;
}
