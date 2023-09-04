import IOveralTimeSpentAdaptivityNotificationPresenter from "./IOverallTimeSpentAdaptivityNotificationPresenter";
import OveralTimeSpentAdaptivityNotificationViewModel from "./OverallTimeSpentAdaptivityNotificationViewModel";

// TODO: connect presenter with port to open modal
export default class OveralTimeSpentAdaptivityNotificationPresenter
  implements IOveralTimeSpentAdaptivityNotificationPresenter
{
  constructor(
    private viewModel: OveralTimeSpentAdaptivityNotificationViewModel
  ) {}
}
