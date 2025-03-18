import { inject, injectable } from "inversify";
import ISetNarrativeFrameworkToShownUseCase from "./ISetNarrativeFrameworkToShownUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import LearningWorldEntity from "../../../Domain/Entities/LearningWorldEntity";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";

@injectable()
export default class SetNarrativeFrameworkToShownUseCase
  implements ISetNarrativeFrameworkToShownUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
  ) {}

  execute(): void {
    const data = this.getUserLocationUseCase.execute();

    let worldEntity = this.entityContainer.filterEntitiesOfType(
      LearningWorldEntity,
      (WorldEntity) => WorldEntity.id === data.worldID,
    )[0];
    worldEntity.narrativeFramework!.shownBefore = true;
    this.logger.log(
      LogLevelTypes.TRACE,
      `SetNarrativeFrameworkToShownUseCase: Set Narrative Framework of World with ID ${worldEntity.id} to shown.`,
    );
  }
}
