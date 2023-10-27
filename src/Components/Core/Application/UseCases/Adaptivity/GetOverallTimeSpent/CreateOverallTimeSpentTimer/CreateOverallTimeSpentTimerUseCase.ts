import type IStartOverallTimeSpentNotificationTimerUseCase from "src/Components/Core/Application/UseCases/Adaptivity/GetOverallTimeSpent/StartOverallTimeSpentTimer/IStartOverallTimeSpentTimerUseCase";
import BreakTimeNotificationEntity from "src/Components/Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";
import { inject, injectable } from "inversify";
import ICreateOverallTimeSpentUseCase from "./ICreateOverallTimeSpentTimerUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

@injectable()
export default class CreateOverallTimeSpentUseCase
  implements ICreateOverallTimeSpentUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(USECASE_TYPES.IStartOverallTimeSpentTimerUseCase)
    private startTimerUseCase: IStartOverallTimeSpentNotificationTimerUseCase
  ) {}

  execute(): void {
    const timer = this.container.getEntitiesOfType(BreakTimeNotificationEntity);

    // prevents resetting timer
    if (timer.length !== 0) {
      return;
    }

    this.container.useSingletonEntity<BreakTimeNotificationEntity>(
      {
        notificationIterator: 0,
      } as BreakTimeNotificationEntity,
      BreakTimeNotificationEntity
    );

    this.startTimerUseCase.execute();
  }
}
