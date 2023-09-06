import { OverallTimeSpentAdaptivityNotificationBreakType } from "./OverallTimeSpentAdaptivityNotificationViewModel";
export default interface IOverallTimeSpentAdaptivityNotificationController {
  startMediumTimer(): void;
  startLongTimer(): void;
  setAvailableNotificationType(): void;
}
