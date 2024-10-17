import { IInternalSynchronousUsecase } from "src/Components/Core/Application/Abstract/IInternalSynchronousUsecase";
import IBreakTimeNotification from "src/Components/Core/Domain/BreakTimeNotifications/IBreakTimeNotification";
import { BreakTimeNotificationType } from "src/Components/Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";

export default interface IGetUnseenBreakTimeNotificationUseCase
  extends IInternalSynchronousUsecase<
    BreakTimeNotificationType,
    IBreakTimeNotification
  > {}
