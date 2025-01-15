import IBreakTimeNotification from "src/Components/Core/Domain/BreakTimeNotifications/IBreakTimeNotification";
import { BreakTimeNotificationType } from "src/Components/Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";
import IGetUnseenBreakTimeNotificationUseCase from "./IGetUnseenBreakTimeNotificationUseCase";
import {
  longBreakTimeNotificationContents,
  mediumBreakTimeNotificationContents,
  shortBreakTimeNotificationContents,
} from "src/Components/Core/Domain/BreakTimeNotifications/BreakTimeNotifications";
import { injectable } from "inversify";

@injectable()
export default class GetUnseenBreakTimeNotificationUseCase
  implements IGetUnseenBreakTimeNotificationUseCase
{
  internalExecute(type: BreakTimeNotificationType): IBreakTimeNotification {
    switch (type) {
      default:
      case BreakTimeNotificationType.Short:
        return this.getRandomUnseenBreakTimeNotification(
          shortBreakTimeNotificationContents,
        );

      case BreakTimeNotificationType.Medium:
        return this.getRandomUnseenBreakTimeNotification(
          mediumBreakTimeNotificationContents,
        );

      case BreakTimeNotificationType.Long:
        return this.getRandomUnseenBreakTimeNotification(
          longBreakTimeNotificationContents,
        );
    }
  }

  getRandomUnseenBreakTimeNotification(
    notifications: IBreakTimeNotification[],
  ) {
    const notSeenBeforeNotification = notifications.filter(
      (shortBreaks) => !shortBreaks.seenBefore,
    );
    const notification =
      notSeenBeforeNotification[
        Math.floor(Math.random() * notSeenBeforeNotification.length)
      ];

    notification.seenBefore = true;
    return notification;
  }
}
