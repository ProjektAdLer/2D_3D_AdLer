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
import { LearningElementDifficulty } from "src/Components/Core/Domain/Types/LearningElementDifficulty";
import LearningElementEntity from "src/Components/Core/Domain/Entities/LearningElementEntity";

class DifficultyCounter {
  numberOfElements: number = 0;
  numberOfCompletedElements: number = 0;
}

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
    const numberOfSpaces = worldEntity.spaces.length;
    const easyElementCounter = new DifficultyCounter();
    const mediumElementCounter = new DifficultyCounter();
    const hardElementCounter = new DifficultyCounter();

    worldEntity.spaces.forEach((space) => {
      this.calculateDifficultyMultiplier(space.elements);
      this.calculateNumberOfDifficultyElements(
        space.elements,
        LearningElementDifficulty.easy,
        easyElementCounter,
      );
      this.calculateNumberOfDifficultyElements(
        space.elements,
        LearningElementDifficulty.medium,
        mediumElementCounter,
      );
      this.calculateNumberOfDifficultyElements(
        space.elements,
        LearningElementDifficulty.hard,
        hardElementCounter,
      );
    });

    const numberOfElementsTotal =
      easyElementCounter.numberOfElements +
      mediumElementCounter.numberOfElements +
      hardElementCounter.numberOfElements;
    const maxLevel = Math.ceil(numberOfElementsTotal / numberOfSpaces);
    const maxExperiencePoints = maxLevel * 100;
    const numberOfCalculationUnits =
      easyElementCounter.numberOfElements +
      mediumElementCounter.numberOfElements * 1.5 +
      hardElementCounter.numberOfElements * 2;
    const baseExperiencePoints = maxExperiencePoints / numberOfCalculationUnits;
    const currentExperiencePoints =
      (easyElementCounter.numberOfCompletedElements +
        mediumElementCounter.numberOfCompletedElements * 1.5 +
        hardElementCounter.numberOfCompletedElements * 2) *
      baseExperiencePoints;
    const currentLevel = Math.floor(
      (currentExperiencePoints / maxExperiencePoints) * maxLevel,
    );

    // Create Experience Points Entity
    const experiencePointsEntity =
      this.entityContainer.createEntity<ExperiencePointsEntity>(
        {
          worldID: worldEntity.id,
          maxLevel: maxLevel,
          currentLevel: currentLevel,
          maxExperiencePoints: maxExperiencePoints,
          currentExperiencePoints: currentExperiencePoints,
          baseExperiencePoints: baseExperiencePoints, // Points for an easy learningElement
        },
        ExperiencePointsEntity,
      );

    // Add Experience Points Entity to User Data
    userDataEntity.experiencePoints.push(experiencePointsEntity);
    this.logger.log(
      LogLevelTypes.TRACE,
      `CalculateInitialExperiencePointsUseCase: Setting baseXP for all learning elements in world ${worldEntity.id}.`,
    );
    worldEntity.spaces.forEach((space) => {
      space.elements.forEach((element) => {
        if (element) {
          element.difficulty.baseXP = baseExperiencePoints;
        }
      });
    });
  }

  private calculateNumberOfDifficultyElements(
    elements: (LearningElementEntity | null)[],
    difficulty: LearningElementDifficulty,
    counter: DifficultyCounter,
  ) {
    const difficultyElements = elements.filter(
      (element) =>
        element !== null && element.difficulty.difficultyType === difficulty,
    );
    const numberOfElements = difficultyElements.length;
    const numberOfCompletedElements = difficultyElements.filter(
      (element) => element?.hasScored === true,
    ).length;

    counter.numberOfCompletedElements += numberOfCompletedElements;
    counter.numberOfElements += numberOfElements;
  }

  private calculateDifficultyMultiplier(
    elements: (LearningElementEntity | null)[],
  ) {
    elements.forEach((element) => {
      if (element === null) return;

      // check if element is a adaptivity element
      // const adaptivityElement = this.entityContainer.filterEntitiesOfType(
      //   AdaptivityElementEntity,
      //   (WorldEntity) =>
      //     WorldEntity.element.parentWorldID === element.parentWorldID &&
      //     WorldEntity.element.id === element.id,
      // );

      // if (adaptivityElement.length !== 0 && adaptivityElement.length < 2) {
      //   const ae = adaptivityElement[0];
      // }

      switch (element.difficulty.difficultyType) {
        case LearningElementDifficulty.easy:
          element.difficulty.multiplicator = 1;
          break;
        case LearningElementDifficulty.medium:
          element.difficulty.multiplicator = 1.5;
          break;
        case LearningElementDifficulty.hard:
          element.difficulty.multiplicator = 2;
          break;
        default:
          element.difficulty.multiplicator = 1;
      }
    });
  }
}
