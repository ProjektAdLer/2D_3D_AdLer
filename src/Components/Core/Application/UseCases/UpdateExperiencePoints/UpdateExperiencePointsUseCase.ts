import { inject, injectable } from "inversify";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import LearningWorldEntity from "src/Components/Core/Domain/Entities/LearningWorldEntity";
import IUpdateExperiencePointsUseCase from "./IUpdateExperiencePointsUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";

@injectable()
export default class UpdateExperiencePointsUseCase
  implements IUpdateExperiencePointsUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase,
  ) {}
  internalExecute(): void {
    // get the current user location
    const userLocation = this.getUserLocationUseCase.execute();
    // Check if the user is in a space (should never not be available since its checked in ScoreLearningElementUseCase)
    if (!userLocation.worldID || !userLocation.spaceID) {
      this.logger.log(
        LogLevelTypes.WARN,
        `UpdateExperiencePointsUseCase: User is not in a Space.`,
      );
      return;
    }

    // Check if the world can be found (should never not be found since its checked in LoadLearningWorldUseCase)
    const worldEntity = this.entityContainer.filterEntitiesOfType(
      LearningWorldEntity,
      (WorldEntity) => WorldEntity.id === userLocation.worldID,
    )[0];
    if (!worldEntity) {
      this.logger.log(
        LogLevelTypes.WARN,
        "UpdateExperiencePointsUseCase: World entity not found!",
      );
      return;
    }

    //Calculate Experience Points

    console.log("reached", userLocation.worldID);
    this.logger.log(
      LogLevelTypes.TRACE,
      "UpdateExperiencePointsUseCase: InternalExecute",
    );
  }
}
