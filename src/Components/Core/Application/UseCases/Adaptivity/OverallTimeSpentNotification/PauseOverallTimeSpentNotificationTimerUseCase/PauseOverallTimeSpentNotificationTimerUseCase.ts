import {
  OverallTimeSpentAdaptivityNotificationBreakType,
  OverallTimeSpentAdaptivityNotificationWaitingType,
} from "./../../../../../Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
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

  internalExecute(di: IStartOverallTimeSpentNotificationTimerUseCase): void {
    const timerEntity = this.container.getEntitiesOfType(
      OverallTimeSpentAdaptivityNotificationEntity
    );

    switch (timerEntity[0].notificationType) {
      case OverallTimeSpentAdaptivityNotificationBreakType.Short:
        timerEntity[0].notificationType =
          OverallTimeSpentAdaptivityNotificationBreakType.Medium;
        setTimeout(() => {
          di.execute();
        }, OverallTimeSpentAdaptivityNotificationWaitingType.Short * 1000 * 60);
        break;

      case OverallTimeSpentAdaptivityNotificationBreakType.Medium:
        timerEntity[0].notificationType =
          OverallTimeSpentAdaptivityNotificationBreakType.Long;
        setTimeout(() => {
          di.execute();
        }, OverallTimeSpentAdaptivityNotificationWaitingType.Medium * 1000 * 60);
        break;

      case OverallTimeSpentAdaptivityNotificationBreakType.Long:
        timerEntity[0].notificationType =
          OverallTimeSpentAdaptivityNotificationBreakType.None;
        break;

      default:
        break;
    }
  }
}
