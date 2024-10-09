import {
  BreakTimeNotificationType,
  BreakTimeNotification,
} from "src/Components/Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";
import IGetRandomUnseenBreakTimeNotificationUseCase from "./IGetRandomBreakTimeNotificationUseCase";

export default class IGetRandomBreakTimeNotification
  implements IGetRandomUnseenBreakTimeNotificationUseCase
{
  internalExecute(data: BreakTimeNotificationType): BreakTimeNotification {
    throw new Error("Method not implemented.");
  }
}
