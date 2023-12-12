import { inject, injectable } from "inversify";
import ISetWorldCompletionModalToShownUseCase from "./ISetWorldCompletionModalToShownUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import LearningWorldEntity from "../../../Domain/Entities/LearningWorldEntity";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";

@injectable()
export default class SetWorldCompletionModalToShownUseCase
  implements ISetWorldCompletionModalToShownUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer
  ) {}

  execute(data: { worldID: number }): void {
    let worldEntity = this.entityContainer.filterEntitiesOfType(
      LearningWorldEntity,
      (WorldEntity) => WorldEntity.id === data.worldID
    )[0];
    worldEntity.completionModalShown = true;
    this.logger.log(
      LogLevelTypes.TRACE,
      `SetWorldCompletionModalToShownUseCase: Set completionModal of World with ID ${worldEntity.id} to shown.`
    );
  }
}
