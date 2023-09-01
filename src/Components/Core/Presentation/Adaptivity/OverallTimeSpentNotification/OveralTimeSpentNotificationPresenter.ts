import IOveralTimeSpentNotificationPresenter from "./IOveralTimeSpentNotificationPresenter";
import OveralTimeSpentNotificationViewModel from "./OveralTimeSpentNotificationViewModel";

// TODO: connect presenter with port to open modal
export default class OveralTimeSpentNotificationPresenter
  implements IOveralTimeSpentNotificationPresenter
{
  constructor(private viewModel: OveralTimeSpentNotificationViewModel) {}
}
