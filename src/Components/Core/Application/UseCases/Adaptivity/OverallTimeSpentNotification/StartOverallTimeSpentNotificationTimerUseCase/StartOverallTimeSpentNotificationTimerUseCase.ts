import { OverallTimeSpentAdaptivityNotificationBreakType } from "./../../../../../Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
import OverallTimeSpentAdaptivityNotificationSettingsTO from "../../../../DataTransferObjects/OverallTimeSpentAdaptivityNotificationSettingsTO";
import IStartOverallTimeSpentNotificationTimerUseCase from "./IStartOverallTimeSpentNotificationTimerUseCase";
import { inject, injectable } from "inversify";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import OverallTimeSpentAdaptivityNotificationEntity from "src/Components/Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type INotificationPort from "../../../../Ports/Interfaces/INotificationPort";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IPauseOverallTimeSpentNotificationTimerUseCase from "../PauseOverallTimeSpentNotificationTimerUseCase/IPauseOverallTimeSpentNotificationTimerUseCase";

@injectable()
export default class StartOverallTimeSpentNotificationTimerUseCase
  implements IStartOverallTimeSpentNotificationTimerUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(PORT_TYPES.INotificationPort)
    private notificationPort: INotificationPort,
    @inject(USECASE_TYPES.IPauseOverallTimeSpentNotificationTimerUseCase)
    private pauseOverallTimeSpentNotificationTimerUseCase: IPauseOverallTimeSpentNotificationTimerUseCase
  ) {}

  execute() {
    const timer = this.container.getEntitiesOfType(
      OverallTimeSpentAdaptivityNotificationEntity
    );

    setTimeout(() => {
      this.notificationPort.displayOverallTimeSpentAdaptivityNotification(
        timer[0].notificationType
      );
      this.pauseOverallTimeSpentNotificationTimerUseCase.internalExecute(this);
    }, timer[0].notificationType * 1000 * 60);
  }
}
