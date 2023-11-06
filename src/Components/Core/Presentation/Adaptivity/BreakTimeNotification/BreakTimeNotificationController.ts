import bind from "bind-decorator";
import BreakTimeNotificationViewModel from "./BreakTimeNotificationViewModel";
import IBreakTimeNotificationController from "./IBreakTimeNotificationController";

export default class BreakTimeNotificationController
  implements IBreakTimeNotificationController
{
  constructor(private viewModel: BreakTimeNotificationViewModel) {}

  @bind
  closeBreakNotification(): void {
    this.viewModel.showModal.Value = false;
  }

  @bind
  minimizeOrMaximizeBreakNotification(): void {
    this.viewModel.showMinimizedModal.Value =
      !this.viewModel.showMinimizedModal.Value;
  }

  @bind
  setSliderIndex(index: number): void {
    this.viewModel.slideIndex.Value = index;
  }
}
