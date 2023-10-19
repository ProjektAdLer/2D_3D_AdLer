import type IStartOverallTimeSpentNotificationTimerUseCase from "src/Components/Core/Application/UseCases/Adaptivity/OverallTimeSpentNotification/StartOverallTimeSpentNotificationTimerUseCase/IStartOverallTimeSpentNotificationTimerUseCase";
import OverallTimeSpentAdaptivityNotificationEntity from "src/Components/Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
import { inject, injectable } from "inversify";
import ICreateOverallTimeSpentNotificationUseCase from "./ICreateOverallTimeSpentNotificationTimerUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

@injectable()
export default class CreateOverallTimeSpentNotificationUseCase
  implements ICreateOverallTimeSpentNotificationUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(USECASE_TYPES.IStartOverallTimeSpentNotificationTimerUseCase)
    private startTimerUseCase: IStartOverallTimeSpentNotificationTimerUseCase
  ) {}

  execute(): void {
    const timer = this.container.getEntitiesOfType(
      OverallTimeSpentAdaptivityNotificationEntity
    );

    // prevents resetting timer
    if (timer.length !== 0) {
      return;
    }

    this.container.useSingletonEntity<OverallTimeSpentAdaptivityNotificationEntity>(
      {
        notificationIterator: 0,
      } as OverallTimeSpentAdaptivityNotificationEntity,
      OverallTimeSpentAdaptivityNotificationEntity
    );

    this.startTimerUseCase.execute();
  }
}
