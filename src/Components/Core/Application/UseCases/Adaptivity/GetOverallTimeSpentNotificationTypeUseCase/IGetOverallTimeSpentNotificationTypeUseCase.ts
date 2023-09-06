import { OverallTimeSpentAdaptivityNotificationBreakType } from "src/Components/Core/Presentation/Adaptivity/OverallTimeSpentAdaptivityNotification/OverallTimeSpentAdaptivityNotificationViewModel";
import OverallTimeSpentAdaptivityNotificationSettingsTO from "src/Components/Core/Application/DataTransferObjects/OverallTimeSpentAdaptivityNotificationSettingsTO";
import { ISynchronousUsecase } from "../../../Abstract/ISynchronousUsecase";

export default interface IGetOverallTimeSpentNotificationTypeUseCase
  extends ISynchronousUsecase<
    void,
    OverallTimeSpentAdaptivityNotificationBreakType
  > {}
