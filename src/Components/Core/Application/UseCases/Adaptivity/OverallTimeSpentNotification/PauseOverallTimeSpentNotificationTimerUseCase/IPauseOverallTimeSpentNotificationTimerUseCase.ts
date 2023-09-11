import { IInternalSynchronousUsecase } from "src/Components/Core/Application/Abstract/IInternalSynchronousUsecase";
import IStartOverallTimeSpentNotificationTimerUseCase from "../StartOverallTimeSpentNotificationTimerUseCase/IStartOverallTimeSpentNotificationTimerUseCase";

export default interface IPauseOverallTimeSpentNotificationTimerUseCase
  extends IInternalSynchronousUsecase<
    IStartOverallTimeSpentNotificationTimerUseCase,
    void
  > {}
