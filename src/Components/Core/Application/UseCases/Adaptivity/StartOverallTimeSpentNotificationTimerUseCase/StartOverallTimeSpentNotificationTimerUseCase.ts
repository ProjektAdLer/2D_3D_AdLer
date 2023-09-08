import OverallTimeSpentAdaptivityNotificationSettingsTO from "../../../DataTransferObjects/OverallTimeSpentAdaptivityNotificationSettingsTO";
import IStartOverallTimeSpentNotificationTimerUseCase from "./IStartOverallTimeSpentNotificationTimerUseCase";
import { inject, injectable } from "inversify";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import OverallTimeSpentAdaptivityNotificationEntity from "src/Components/Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type INotificationPort from "../../../Ports/Interfaces/INotificationPort";
import { OverallTimeSpentAdaptivityNotificationBreakType } from "../../../Ports/NotificationPort/INotificationAdapter";

@injectable()
export default class StartOverallTimeSpentNotificationTimerUseCase
  implements IStartOverallTimeSpentNotificationTimerUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(PORT_TYPES.INotificationPort)
    private notificationPort: INotificationPort
  ) {}

  execute(data: OverallTimeSpentAdaptivityNotificationSettingsTO) {
    const timerEntity = this.container.getEntitiesOfType(
      OverallTimeSpentAdaptivityNotificationEntity
    );

    if (timerEntity.length === 0) {
      const id = setTimeout(() => {
        const entity = this.container.getEntitiesOfType(
          OverallTimeSpentAdaptivityNotificationEntity
        );
        if (entity.length !== 0) {
          entity[0].notificationType = data.breakType;
          this.notificationPort.displayOverallTimeSpentAdaptivityNotification(
            entity[0].notificationType
          );
          console.log(entity[0].notificationType);
        }
      }, data.delay * 1000 * 60);

      this.container.createEntity<OverallTimeSpentAdaptivityNotificationEntity>(
        {
          id: id,
          delay: data.delay,
          notificationType:
            OverallTimeSpentAdaptivityNotificationBreakType.None,
        },
        OverallTimeSpentAdaptivityNotificationEntity
      );
    }
  }
}
