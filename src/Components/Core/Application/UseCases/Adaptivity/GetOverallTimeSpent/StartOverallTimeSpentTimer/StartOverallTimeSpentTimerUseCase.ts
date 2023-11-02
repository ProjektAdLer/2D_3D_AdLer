import IStartOverallTimeSpentTimerUseCase from "./IStartOverallTimeSpentTimerUseCase";
import { inject, injectable } from "inversify";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import BreakTimeNotificationEntity, {
  BreakTimeNotificationType,
} from "src/Components/Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type INotificationPort from "../../../../Ports/Interfaces/INotificationPort";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IPauseOverallTimeSpentTimerUseCase from "../PauseOverallTimeSpentTimer/IPauseOverallTimeSpentTimerUseCase";

@injectable()
export default class StartOverallTimeSpentTimerUseCase
  implements IStartOverallTimeSpentTimerUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(PORT_TYPES.INotificationPort)
    private notificationPort: INotificationPort,
    @inject(USECASE_TYPES.IPauseOverallTimeSpentTimerUseCase)
    private pauseOverallTimeSpentTimerUseCase: IPauseOverallTimeSpentTimerUseCase
  ) {}

  execute() {
    const timer = this.container.getEntitiesOfType(BreakTimeNotificationEntity);

    setTimeout(() => {
      timer[0].notificationIterator++;
      if (timer[0].notificationIterator === 4) {
        this.notificationPort.displayBreakTimeNotification(
          BreakTimeNotificationType.Medium
        );
      } else if (timer[0].notificationIterator === 8) {
        this.notificationPort.displayBreakTimeNotification(
          BreakTimeNotificationType.Long
        );
      } else {
        this.notificationPort.displayBreakTimeNotification(
          BreakTimeNotificationType.Short
        );
      }
      this.pauseOverallTimeSpentTimerUseCase.internalExecute(this);
    }, 30 * 1000 * 60);
    // 30 minuten (Lernzeitraum)
  }
}
