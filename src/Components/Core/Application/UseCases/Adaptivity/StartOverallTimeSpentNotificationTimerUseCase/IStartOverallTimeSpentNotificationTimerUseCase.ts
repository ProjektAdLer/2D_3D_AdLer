import OverallTimeSpentAdaptivityNotificationSettingsTO from "src/Components/Core/Application/DataTransferObjects/OverallTimeSpentAdaptivityNotificationSettingsTO";
import { IAsyncUsecase } from "../../../Abstract/IAsyncUsecase";
import { ISynchronousUsecase } from "../../../Abstract/ISynchronousUsecase";

export default interface IStartOverallTimeSpentNotificationTimerUseCase
  extends ISynchronousUsecase<
    OverallTimeSpentAdaptivityNotificationSettingsTO,
    void
  > {}
