export enum OverallTimeSpentAdaptivityNotificationBreakType {
  None = 0,
  Short = 30,
  Medium = 60,
  Long = 90,
}

export enum OverallTimeSpentAdaptivityNotificationWaitingType {
  Short = 5,
  Medium = 15,
  Long = 30,
}

export default class OverallTimeSpentAdaptivityNotificationEntity {
  notificationType: OverallTimeSpentAdaptivityNotificationBreakType;
}
