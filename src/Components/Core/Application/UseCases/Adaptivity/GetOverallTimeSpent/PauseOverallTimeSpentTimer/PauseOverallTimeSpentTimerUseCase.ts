import { BreakTimeNotificationType } from "../../../../../Domain/Entities/Adaptivity/BreakTimeNotificationEntity";
import { inject, injectable } from "inversify";
import IPauseOverallTimeSpentTimerUseCase from "./IPauseOverallTimeSpentTimerUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import BreakTimeNotificationEntity from "src/Components/Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";
import type IStartOverallTimeSpentTimerUseCase from "../StartOverallTimeSpentTimer/IStartOverallTimeSpentTimerUseCase";

@injectable()
export default class PauseOverallTimeSpentTimerUseCase
  implements IPauseOverallTimeSpentTimerUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer
  ) {}

  internalExecute(startTimerUseCase: IStartOverallTimeSpentTimerUseCase): void {
    const timerEntity = this.container.getEntitiesOfType(
      BreakTimeNotificationEntity
    );

    switch (timerEntity[0].notificationIterator) {
      case 4:
        setTimeout(() => {
          startTimerUseCase.execute();
        }, BreakTimeNotificationType.Medium * 1000 * 60);
        break;

      case 8:
        //Resets the timer (starting from 0 after long break)
        timerEntity[0].notificationIterator = 0;
        setTimeout(() => {
          startTimerUseCase.execute();
        }, BreakTimeNotificationType.Long * 1000 * 60);
        break;

      default:
        setTimeout(() => {
          startTimerUseCase.execute();
        }, BreakTimeNotificationType.Short * 1000 * 60);
        break;
    }
  }
}
