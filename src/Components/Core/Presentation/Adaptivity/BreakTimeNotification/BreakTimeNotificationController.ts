import BreakTimeNotificationViewModel from "./BreakTimeNotificationViewModel";
import IBreakTimeNotificationController from "./IBreakTimeNotificationController";

export default class BreakTimeNotificationController
  implements IBreakTimeNotificationController
{
  constructor(private viewModel: BreakTimeNotificationViewModel) {}

  closeBreakNotification(): void {
    this.viewModel.showModal.Value = false;
  }
  minimizeOrMaximizeBreakNotification(): void {
    this.viewModel.showMinimizedModal.Value =
      !this.viewModel.showMinimizedModal.Value;
  }
  setSliderIndex(index: number): void {
    this.viewModel.slideIndex.Value = index;
  }
}
