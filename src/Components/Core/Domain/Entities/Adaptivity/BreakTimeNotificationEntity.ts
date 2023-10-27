export enum BreakTimeNotificationType {
  None = 0,
  Short = 30,
  Medium = 60,
  Long = 90,
}

export default class BreakTimeNotificationEntity {
  notificationIterator: number;
}
