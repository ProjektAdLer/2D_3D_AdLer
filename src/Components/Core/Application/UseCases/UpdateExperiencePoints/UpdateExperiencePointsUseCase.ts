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
import LearningSpaceEntity from "src/Components/Core/Domain/Entities/LearningSpaceEntity";
import LearningElementEntity from "src/Components/Core/Domain/Entities/LearningElementEntity";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILearningWorldPort from "../../Ports/Interfaces/ILearningWorldPort";
import ExperiencePointsTO from "../../DataTransferObjects/ExperiencePointsTO";

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
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
  ) {}
  internalExecute(elementID: ComponentID): void {
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
    //Check multiplicator of element in question
    let multiplicator = 1;
    let spaceEntity: LearningSpaceEntity;
    worldEntity.spaces.forEach((space) => {
      if (space.id === userLocation.spaceID) {
        spaceEntity = space;
      }
    });

    let elementEntity: LearningElementEntity | undefined | null =
      spaceEntity!.elements.find((element) => {
        return element?.id === elementID;
      });

    if (elementEntity === null || elementEntity === undefined) {
      this.logger.log(
        LogLevelTypes.WARN,
        "UpdateExperiencePointsUseCase: No learning element is null or undefined",
      );
      return;
    }

    if (elementEntity.difficulty === 100) {
      multiplicator = 1.5;
    }
    if (elementEntity.difficulty === 200) {
      multiplicator = 2;
    }

    // Get correct experiencePointsEntity
    const userData = this.entityContainer.getEntitiesOfType(UserDataEntity);
    const xpEntity = userData[0].experiencePoints.find(
      (xpEntity) => xpEntity.worldID === userLocation.worldID,
    );
    if (!xpEntity) {
      this.logger.log(
        LogLevelTypes.WARN,
        "UpdateExperiencePointsUseCase: ExperiencePointsEntity not found!",
      );
      return;
    }

    if (xpEntity.currentLevel === xpEntity.maxLevel) {
      this.logger.log(
        LogLevelTypes.TRACE,
        "UpdateExperiencePointsUseCase: User has reached maximum experience level",
      );
      return;
    }

    // Update experience points
    xpEntity.currentExperiencePoints +=
      xpEntity.baseExperiencePoints * multiplicator;

    xpEntity.currentLevel = Math.floor(
      (xpEntity.currentExperiencePoints / xpEntity.maxExperiencePoints) * // value between 0 and 1
        xpEntity.maxLevel,
    ); // avoids floating-point errors

    this.worldPort.onExperiencePointsUpdated({
      maxLevel: xpEntity.maxLevel,
      currentLevel: xpEntity.currentLevel,
      currentExperiencePoints: xpEntity.currentExperiencePoints,
    } as ExperiencePointsTO);

    this.logger.log(
      LogLevelTypes.TRACE,
      "UpdateExperiencePointsUseCase: InternalExecute",
    );
  }
}
