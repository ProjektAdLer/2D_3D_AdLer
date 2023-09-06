import { OverallTimeSpentAdaptivityNotificationBreakType } from "./OverallTimeSpentAdaptivityNotificationViewModel";
import IUIAdapter from "src/Components/Core/Application/Ports/UIPort/IUIAdapter";

export default interface IOverallTimeSpentAdaptivityNotificationPresenter
  extends IUIAdapter {
  updateOverallTimeSpentNotification(
    type: OverallTimeSpentAdaptivityNotificationBreakType
  ): void;
}
