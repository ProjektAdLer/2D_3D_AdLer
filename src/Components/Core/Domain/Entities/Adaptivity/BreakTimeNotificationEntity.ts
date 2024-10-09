export enum BreakTimeNotificationType {
  None = 0,
  Short = 5,
  Medium = 15,
  Long = 30,
}

export default class BreakTimeNotificationEntity {
  breakTimeIntervalCounter: number;
}
