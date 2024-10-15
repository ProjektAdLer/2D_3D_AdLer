import IBreakTimeNotificationOverviewPresenter from "./IBreakTimeNotificationOverviewPresenter";
import BreakTimeNotificationOverviewViewModel from "./BreakTimeNotificationOverviewViewModel";

export default class BreakTimeNotificationOverviewPresenter
  implements IBreakTimeNotificationOverviewPresenter
{
  constructor(private viewModel: BreakTimeNotificationOverviewViewModel) {}
}
