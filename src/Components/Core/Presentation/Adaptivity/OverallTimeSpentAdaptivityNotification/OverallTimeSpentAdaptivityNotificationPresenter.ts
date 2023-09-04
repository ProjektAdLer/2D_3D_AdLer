import IOverallTimeSpentAdaptivityNotificationPresenter from "./IOverallTimeSpentAdaptivityNotificationPresenter";
import OverallTimeSpentAdaptivityNotificationViewModel from "./OverallTimeSpentAdaptivityNotificationViewModel";

// TODO: connect presenter with port to open modal
export default class OverallTimeSpentAdaptivityNotificationPresenter
  implements IOverallTimeSpentAdaptivityNotificationPresenter
{
  constructor(
    private viewModel: OverallTimeSpentAdaptivityNotificationViewModel
  ) {}
}
