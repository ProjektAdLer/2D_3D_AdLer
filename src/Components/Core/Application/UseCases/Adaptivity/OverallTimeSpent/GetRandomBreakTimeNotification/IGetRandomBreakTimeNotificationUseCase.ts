import { IInternalSynchronousUsecase } from "src/Components/Core/Application/Abstract/IInternalSynchronousUsecase";
import {
  BreakTimeNotification,
  BreakTimeNotificationType,
} from "src/Components/Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";

export default interface IGetRandomUnseenBreakTimeNotificationUseCase
  extends IInternalSynchronousUsecase<
    BreakTimeNotificationType,
    BreakTimeNotification
  > {}
