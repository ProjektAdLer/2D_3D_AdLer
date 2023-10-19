import IStartOverallTimeSpentNotificationTimerUseCase from "./IStartOverallTimeSpentNotificationTimerUseCase";
import { inject, injectable } from "inversify";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import OverallTimeSpentAdaptivityNotificationEntity, {
  OverallTimeSpentAdaptivityNotificationBreakType,
} from "src/Components/Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
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
      timer[0].notificationIterator++;
      if (timer[0].notificationIterator === 4) {
        this.notificationPort.displayOverallTimeSpentAdaptivityNotification(
          OverallTimeSpentAdaptivityNotificationBreakType.Medium
        );
      } else if (timer[0].notificationIterator === 8) {
        this.notificationPort.displayOverallTimeSpentAdaptivityNotification(
          OverallTimeSpentAdaptivityNotificationBreakType.Long
        );
      } else {
        this.notificationPort.displayOverallTimeSpentAdaptivityNotification(
          OverallTimeSpentAdaptivityNotificationBreakType.Short
        );
      }
      this.pauseOverallTimeSpentNotificationTimerUseCase.internalExecute(this);
    }, 0.1 * 1000 * 60);
    // 30 minuten (Lernzeitraum)
  }
}
