import { OverallTimeSpentAdaptivityNotificationBreakType } from "./../../../../../Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
import { inject, injectable } from "inversify";
import IPauseOverallTimeSpentNotificationTimerUseCase from "./IPauseOverallTimeSpentNotificationTimerUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import OverallTimeSpentAdaptivityNotificationEntity from "src/Components/Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
import type IStartOverallTimeSpentNotificationTimerUseCase from "../StartOverallTimeSpentNotificationTimerUseCase/IStartOverallTimeSpentNotificationTimerUseCase";

@injectable()
export default class PauseOverallTimeSpentNotificationTimerUseCase
  implements IPauseOverallTimeSpentNotificationTimerUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer
  ) {}

  internalExecute(
    startTimerUseCase: IStartOverallTimeSpentNotificationTimerUseCase
  ): void {
    const timerEntity = this.container.getEntitiesOfType(
      OverallTimeSpentAdaptivityNotificationEntity
    );

    switch (timerEntity[0].notificationIterator) {
      case 4:
        setTimeout(() => {
          startTimerUseCase.execute();
        }, OverallTimeSpentAdaptivityNotificationBreakType.Medium * 1000 * 60);
        break;

      case 8:
        //Resets the timer (starting from 0 after long break)
        timerEntity[0].notificationIterator = 0;
        setTimeout(() => {
          startTimerUseCase.execute();
        }, OverallTimeSpentAdaptivityNotificationBreakType.Long * 1000 * 60);
        break;

      default:
        setTimeout(() => {
          startTimerUseCase.execute();
        }, OverallTimeSpentAdaptivityNotificationBreakType.Short * 1000 * 60);
        break;
    }
  }
}
