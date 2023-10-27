import { BreakTimeNotificationType } from "src/Components/Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";
import IBreakTimeNotificationPresenter from "./IBreakTimeNotificationPresenter";
import BreakTimeNotificationViewModel from "./BreakTimeNotificationViewModel";

export default class BreakTimeNotificationPresenter
  implements IBreakTimeNotificationPresenter
{
  constructor(private viewModel: BreakTimeNotificationViewModel) {}

  displayBreakTimeNotification(type: BreakTimeNotificationType): void {
    this.viewModel.breakType.Value = type;
    this.viewModel.showModal.Value = true;
    this.viewModel.showMinimizedModal.Value = true;
  }
}
