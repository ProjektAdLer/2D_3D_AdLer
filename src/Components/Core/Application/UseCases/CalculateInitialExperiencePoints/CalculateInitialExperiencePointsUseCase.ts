import { inject, injectable } from "inversify";
import ICalculateInitialExperiencePointsUseCase from "./ICalculateInitialExperiencePointsUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import LearningWorldEntity from "src/Components/Core/Domain/Entities/LearningWorldEntity";
import ExperiencePointsEntity from "src/Components/Core/Domain/Entities/ExperiencePointsEntity";

@injectable()
export default class CalculateInitialExperiencePointsUseCase
  implements ICalculateInitialExperiencePointsUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
  ) {}
  internalExecute(worldId: ComponentID): void {
    // Check if the world is available (should never not be available since its checked in LoadLearningWorldUseCase)
    const userDataEntity =
      this.entityContainer.getEntitiesOfType(UserDataEntity)[0];
    if (
      userDataEntity.availableWorlds.find(
        (world) => world.worldID === worldId,
      ) === undefined
    ) {
      this.logger.log(
        LogLevelTypes.WARN,
        "CalculateInitialExperiencePointsUseCase: World is not available!",
      );
      return;
    }
    // Check if the world can be found (should never not be found since its checked in LoadLearningWorldUseCase)
    const worldEntity = this.entityContainer.filterEntitiesOfType(
      LearningWorldEntity,
      (WorldEntity) => WorldEntity.id === worldId,
    )[0];
    if (!worldEntity) {
      this.logger.log(
        LogLevelTypes.WARN,
        "CalculateInitialExperiencePointsUseCase: World entity not found!",
      );
      return;
    }

    // Check if the UserDataEntity already has ExperiencePointsEntity for this world
    if (
      userDataEntity.experiencePoints.find(
        (experiencePoints) => experiencePoints.worldID === worldId,
      )
    ) {
      this.logger.log(
        LogLevelTypes.WARN,
        `CalculateInitialExperiencePointsUseCase: Experience points for world ${worldId} already exist!`,
      );
      return;
    }
    //Calculate Experience Points

    let numberOfSpaces = worldEntity.spaces.length;

    let numberOfElementsTotal = 0;
    let numberOfMediumElements = 0;
    let numberOfHardElements = 0;
    worldEntity.spaces.forEach((space) => {
      numberOfElementsTotal += space.elements.filter(
        (element) => element !== null,
      ).length;
      numberOfMediumElements += space.elements.filter(
        (element) => element !== null && element!.difficulty === 100,
      ).length;
      numberOfHardElements += space.elements.filter(
        (element) => element !== null && element!.difficulty === 200,
      ).length;
    });
    let maxLevel = Math.ceil(numberOfElementsTotal / numberOfSpaces);
    let maxExperiencePoints = maxLevel * 100;
    let numberOfCalculationUnits =
      numberOfElementsTotal + // Einfach
      numberOfMediumElements * 0.5 + // 1.5 fach
      numberOfHardElements; // Zweifach
    let baseExperiencePoints = maxExperiencePoints / numberOfCalculationUnits;

    // Create Experience Points Entity
    const experiencePointsEntity =
      this.entityContainer.createEntity<ExperiencePointsEntity>(
        {
          worldID: worldEntity.id,
          maxLevel: maxLevel,
          currentLevel: 0,
          maxExperiencePoints: maxExperiencePoints,
          currentExperiencePoints: 0,
          baseExperiencePoints: baseExperiencePoints, // Points for an easy learningElement
        },
        ExperiencePointsEntity,
      );

    // Add Experience Points Entity to User Data
    userDataEntity.experiencePoints.push(experiencePointsEntity);
    this.logger.log(
      LogLevelTypes.TRACE,
      `CalculateInitialExperiencePointsUseCase: Number of Easy Elements: ${numberOfElementsTotal - numberOfMediumElements - numberOfHardElements}, Number of Medium Elements: ${numberOfMediumElements}, Number of Hard Elements: ${numberOfHardElements}, Base Experience Points: ${baseExperiencePoints}, Max Level: ${maxLevel}, Max Experience Points: ${maxExperiencePoints}. For World: ${worldEntity.name} (${worldEntity.id}).`,
    );
  }
}
