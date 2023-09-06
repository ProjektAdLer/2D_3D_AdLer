import { ISynchronousUsecase } from "../../../Abstract/ISynchronousUsecase";
import { OverallTimeSpentAdaptivityNotificationBreakType } from "../../../Ports/NotificationPort/INotificationAdapter";

export default interface IGetOverallTimeSpentNotificationTypeUseCase
  extends ISynchronousUsecase<
    void,
    OverallTimeSpentAdaptivityNotificationBreakType
  > {}
