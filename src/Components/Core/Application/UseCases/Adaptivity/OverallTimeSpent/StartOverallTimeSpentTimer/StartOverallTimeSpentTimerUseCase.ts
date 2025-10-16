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
import type IGetUnseenBreakTimeNotificationUseCase from "../GetUnseenBreakTimeNotification/IGetUnseenBreakTimeNotificationUseCase";
import type IGetSettingsConfigUsecase from "../../../GetSettingsConfig/IGetSettingsConfigUseCase";
import { get } from "http";

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
    private pauseOverallTimeSpentTimerUseCase: IPauseOverallTimeSpentTimerUseCase,
    @inject(USECASE_TYPES.IGetUnseenBreakTimeNotificationUseCase)
    private getUnseenStoryElementsUseCase: IGetUnseenBreakTimeNotificationUseCase,
    @inject(USECASE_TYPES.IGetSettingsConfigUseCase)
    private getSettingsConfigUseCase: IGetSettingsConfigUsecase,
  ) {}

  execute() {
    const settings = this.getSettingsConfigUseCase.execute();

    if (settings.breakTimeNotificationsEnabled === false) {
      return;
    }

    const timer = this.container.getEntitiesOfType(BreakTimeNotificationEntity);

    setTimeout(
      () => {
        timer[0].breakTimeIntervalCounter++;
        if (timer[0].breakTimeIntervalCounter === 4) {
          this.notificationPort.displayBreakTimeNotification(
            this.getUnseenStoryElementsUseCase.internalExecute(
              BreakTimeNotificationType.Medium,
            ),
          );
        } else if (timer[0].breakTimeIntervalCounter === 8) {
          this.notificationPort.displayBreakTimeNotification(
            this.getUnseenStoryElementsUseCase.internalExecute(
              BreakTimeNotificationType.Long,
            ),
          );
        } else {
          this.notificationPort.displayBreakTimeNotification(
            this.getUnseenStoryElementsUseCase.internalExecute(
              BreakTimeNotificationType.Short,
            ),
          );
        }
        this.pauseOverallTimeSpentTimerUseCase.internalExecute(this);
      },
      30 * 1000 * 60, // 30 minuten (Lernzeitraum)
    );
  }
}
