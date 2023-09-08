import OverallTimeSpentAdaptivityNotificationEntity from "src/Components/Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
import { inject, injectable } from "inversify";
import IGetOverallTimeSpentNotificationTypeUseCase from "./IGetOverallTimeSpentNotificationTypeUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import { OverallTimeSpentAdaptivityNotificationBreakType } from "../../../Ports/NotificationPort/INotificationAdapter";

@injectable()
export default class GetOverallTimeSpentNotificationTypeUseCase
  implements IGetOverallTimeSpentNotificationTypeUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer
  ) {}

  execute(): OverallTimeSpentAdaptivityNotificationBreakType {
    const timerEntity = this.container.getEntitiesOfType(
      OverallTimeSpentAdaptivityNotificationEntity
    );

    if (timerEntity.length === 1) {
      return timerEntity[0].notificationType;
    } else {
      return OverallTimeSpentAdaptivityNotificationBreakType.None;
    }
  }
}
