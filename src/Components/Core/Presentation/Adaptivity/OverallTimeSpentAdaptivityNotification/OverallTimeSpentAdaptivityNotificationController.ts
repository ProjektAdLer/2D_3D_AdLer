import OverallTimeSpentAdaptivityNotificationViewModel, {
  OverallTimeSpentAdaptivityNotificationBreakType,
} from "./OverallTimeSpentAdaptivityNotificationViewModel";
import IOverallTimeSpentAdaptivityNotificationController from "./IOverallTimeSpentAdaptivityNotificationController";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import OverallTimeSpentAdaptivityNotificationSettingsTO from "src/Components/Core/Application/DataTransferObjects/OverallTimeSpentAdaptivityNotificationSettingsTO";
import IStartOverallTimeSpentNotificationTimerUseCase from "src/Components/Core/Application/UseCases/Adaptivity/StartOverallTimeSpentNotificationTimerUseCase/IStartOverallTimeSpentNotificationTimerUseCase";
import IGetOverallTimeSpentNotificationTypeUseCase from "src/Components/Core/Application/UseCases/Adaptivity/GetOverallTimeSpentNotificationTypeUseCase/IGetOverallTimeSpentNotificationTypeUseCase";

export default class OverallTimeSpentAdaptivityNotificationController
  implements IOverallTimeSpentAdaptivityNotificationController
{
  constructor(
    private viewModel: OverallTimeSpentAdaptivityNotificationViewModel
  ) {}

  startMediumTimer(): void {
    CoreDIContainer.get<IStartOverallTimeSpentNotificationTimerUseCase>(
      USECASE_TYPES.IStartOverallTimeSpentNotificationTimerUseCase
    ).execute({
      delay: 60,
      breakType: OverallTimeSpentAdaptivityNotificationBreakType.Medium,
    });
  }

  startLongTimer(): void {
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
