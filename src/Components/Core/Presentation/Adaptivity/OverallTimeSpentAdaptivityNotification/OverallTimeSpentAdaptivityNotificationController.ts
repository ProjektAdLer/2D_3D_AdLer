import OverallTimeSpentAdaptivityNotificationViewModel from "./OverallTimeSpentAdaptivityNotificationViewModel";
import IOverallTimeSpentAdaptivityNotificationController from "./IOverallTimeSpentAdaptivityNotificationController";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import IStartOverallTimeSpentNotificationTimerUseCase from "../../../Application/UseCases/Adaptivity/StartOverallTimeSpentNotificationTimerUseCase/IStartOverallTimeSpentNotificationTimerUseCase";
import IGetOverallTimeSpentNotificationTypeUseCase from "../../../Application/UseCases/Adaptivity/GetOverallTimeSpentNotificationTypeUseCase/IGetOverallTimeSpentNotificationTypeUseCase";
import { OverallTimeSpentAdaptivityNotificationBreakType } from "../../../Application/Ports/NotificationPort/INotificationAdapter";

export default class OverallTimeSpentAdaptivityNotificationController
  implements IOverallTimeSpentAdaptivityNotificationController
{
  constructor(
    private viewModel: OverallTimeSpentAdaptivityNotificationViewModel
  ) {}

  closedShortBreakNotification(): void {
    this.viewModel.showModal.Value = false;

    CoreDIContainer.get<IStartOverallTimeSpentNotificationTimerUseCase>(
      USECASE_TYPES.IStartOverallTimeSpentNotificationTimerUseCase
    ).execute({
      delay: 60,
      breakType: OverallTimeSpentAdaptivityNotificationBreakType.Medium,
    });
  }

  closedMediumBreakNotification(): void {
    this.viewModel.showModal.Value = false;

    CoreDIContainer.get<IStartOverallTimeSpentNotificationTimerUseCase>(
      USECASE_TYPES.IStartOverallTimeSpentNotificationTimerUseCase
    ).execute({
      delay: 90,
      breakType: OverallTimeSpentAdaptivityNotificationBreakType.Medium,
    });
  }

  setAvailableNotificationType(): void {
    this.viewModel.breakType.Value =
      CoreDIContainer.get<IGetOverallTimeSpentNotificationTypeUseCase>(
        USECASE_TYPES.IGetOverallTimeSpentNotificationTypeUseCase
      ).execute();
  }
}
