import IOveralTimeSpentNotificationPresenter from "./IOverallTimeSpentAdaptivityNotificationPresenter";
import OveralTimeSpentNotificationViewModel from "./OverallTimeSpentAdaptivityNotificationViewModel";

// TODO: connect presenter with port to open modal
export default class OveralTimeSpentNotificationPresenter
  implements IOveralTimeSpentNotificationPresenter
{
  constructor(private viewModel: OveralTimeSpentNotificationViewModel) {}
}
