import AdaptivityElementEntity from "../../../../Core/Domain/Entities/Adaptivity/AdaptivityElementEntity";
import { mock } from "jest-mock-extended";
import CalculateInitialExperiencePointsUseCase from "../../../../Core/Application/UseCases/CalculateInitialExperiencePoints/CalculateInitialExperiencePointsUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import INotificationPort from "../../../../Core/Application/Ports/Interfaces/INotificationPort";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import Logger from "../../../../Core/Adapters/Logger/Logger";
import LearningWorldEntity from "../../../../Core/Domain/Entities/LearningWorldEntity";
import ExperiencePointsEntity from "../../../../Core/Domain/Entities/ExperiencePointsEntity";
import { AdaptivityElementQuestionDifficultyTypes } from "../../../../Core/Domain/Types/Adaptivity/AdaptivityElementQuestionDifficultyTypes";
import { LearningElementDifficulty } from "../../../../Core/Domain/Types/LearningElementDifficulty";

const entityContainerMock = mock<IEntityContainer>();
const notificationPortMock = mock<INotificationPort>();
const loggerMock = mock<Logger>();

describe("CalculateInitialExperiencePointsUseCase", () => {
  let systemUnderTest: CalculateInitialExperiencePointsUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer,
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind<INotificationPort>(
      PORT_TYPES.INotificationPort,
    ).toConstantValue(notificationPortMock);
    CoreDIContainer.rebind(CORE_TYPES.ILogger).toConstantValue(loggerMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.ICalculateInitialExperiencePointsUseCase,
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("calls logger with a warning if world is not available", () => {
    let userDataEntity = {
      isLoggedIn: true,
      availableWorlds: [{ worldID: 2, worldName: "World 1" }],
    };

    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([userDataEntity]);

    systemUnderTest.internalExecute(1);

    expect(loggerMock.log).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith(
      "WARN",
      "CalculateInitialExperiencePointsUseCase: World is not available!",
    );
  });

  test("calls logger with a warning if world is not found", () => {
    let userDataEntity = {
      isLoggedIn: true,
      availableWorlds: [{ worldID: 1, worldName: "World 1" }],
    };

    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([userDataEntity]);
    //@ts-ignore
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([false]);

    systemUnderTest.internalExecute(1);

    expect(loggerMock.log).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith(
      "WARN",
      "CalculateInitialExperiencePointsUseCase: World entity not found!",
    );
  });

  test("filter world function filters correctly", async () => {
    let userDataEntity = {
      isLoggedIn: true,
      availableWorlds: [{ worldID: 42, worldName: "World 1" }],
      experiencePoints: [],
    };

    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([userDataEntity]);

    const worldEntityMock = {
      id: 42,
      name: "World 1",
      spaces: [
        {
          id: 1,
          elements: [
            { id: 1, difficulty: { difficultyType: 100, multiplicator: 1.5 } },
          ],
        },
      ],
    };
    let filterResult;
    entityContainerMock.filterEntitiesOfType.mockImplementationOnce(
      (entityType, callback) => {
        filterResult = callback(worldEntityMock as LearningWorldEntity);
        return [worldEntityMock];
      },
    );
    // mock world response
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);

    await systemUnderTest.internalExecute(42);

    expect(filterResult).toBe(true);
  });

  test("calls logger with warning if experience points already exist for the world", () => {
    let userDataEntity = {
      isLoggedIn: true,
      availableWorlds: [{ worldID: 1, worldName: "World 1" }],
      experiencePoints: [
        { worldID: 1, baseExperiencePoints: 100, currentExperiencePoints: 0 },
      ],
    };

    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([userDataEntity]);

    const worldEntityMock = {
      id: 42,
      name: "World 1",
      spaces: [
        {
          id: 1,
          elements: [
            { id: 1, difficulty: { difficultyType: 100, multiplicator: 1.5 } },
          ],
        },
      ],
    };
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      worldEntityMock,
    ]);

    systemUnderTest.internalExecute(1);

    expect(loggerMock.log).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith(
      "WARN",
      "CalculateInitialExperiencePointsUseCase: Experience points for world 1 already exist!",
    );
  });

  test("calculates initial experience points of adaptivity elements correctt", () => {
    let userDataEntity = {
      isLoggedIn: true,
      availableWorlds: [{ worldID: 1, worldName: "World 1" }],
      experiencePoints: [],
    };

    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([userDataEntity]);

    const worldEntityMock = {
      id: 1,
      name: "World 1",
      spaces: [
        {
          id: 1,
          elements: [
            { id: 3, difficulty: { difficultyType: 0 }, parentWorldID: 1 },
            null,
          ],
        },
        {
          id: 2,
          elements: [
            { id: 4, difficulty: { difficultyType: 0 }, parentWorldID: 1 },
            { id: 5, difficulty: { difficultyType: 0 }, parentWorldID: 1 },
          ],
        },
      ],
    };
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      worldEntityMock,
    ]);

    const adaptivityElementMock = {
      element: {
        id: 5,
        parentWorldID: 1,
      },
      tasks: [
        {
          questions: [
            {
              questionDifficulty: AdaptivityElementQuestionDifficultyTypes.hard,
            },
          ],
        },
      ],
    };

    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      adaptivityElementMock,
    ]);

    systemUnderTest.internalExecute(1);

    const entityArg = entityContainerMock.createEntity.mock
      .calls[0][0] as ExperiencePointsEntity;
    expect(entityContainerMock.createEntity).toHaveBeenCalled();
    expect(entityArg.worldID).toBe(1);
    expect(entityArg.currentLevel).toBe(0);
    expect(entityArg.maxLevel).toBe(2);
    expect(entityArg.currentExperiencePoints).toBe(0);
    expect(entityArg.maxExperiencePoints).toBe(200);
    expect(entityArg.baseExperiencePoints).toBe(50);
  });

  test("calculates initial experience points correctly", () => {
    let userDataEntity = {
      isLoggedIn: true,
      availableWorlds: [{ worldID: 1, worldName: "World 1" }],
      experiencePoints: [],
    };

    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([userDataEntity]);

    const worldEntityMock = {
      id: 1,
      name: "World 1",
      spaces: [
        {
          id: 1,
          elements: [
            { id: 1, difficulty: { difficultyType: 100, multiplicator: 1.5 } },
            { id: 2, difficulty: { difficultyType: 200, multiplicator: 2 } },
            { id: 3, difficulty: { difficultyType: 0, multiplicator: 1 } },
            null,
          ],
        },
        {
          id: 2,
          elements: [
            { id: 4, difficulty: { difficultyType: 100, multiplicator: 1.5 } },
            { id: 5, difficulty: { difficultyType: 100, multiplicator: 1.5 } },
          ],
        },
      ],
    };
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      worldEntityMock,
    ]);
    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);

    systemUnderTest.internalExecute(1);

    const entityArg = entityContainerMock.createEntity.mock
      .calls[0][0] as ExperiencePointsEntity;
    expect(entityContainerMock.createEntity).toHaveBeenCalled();
    expect(entityArg.worldID).toBe(1);
    expect(entityArg.baseExperiencePoints).toBe(40);
    expect(entityArg.currentExperiencePoints).toBe(0);
    expect(entityArg.maxExperiencePoints).toBe(300);
    expect(entityArg.maxLevel).toBe(3);
    expect(entityArg.currentLevel).toBe(0);
  });

  test("mapAdaptivityDifficultyToLearningElementDifficulty maps difficulty correct", () => {
    expect(
      systemUnderTest["mapAdaptivityDifficultyToLearningElementDifficulty"](
        AdaptivityElementQuestionDifficultyTypes.easy,
      ),
    ).toEqual(LearningElementDifficulty.easy);
    expect(
      systemUnderTest["mapAdaptivityDifficultyToLearningElementDifficulty"](
        AdaptivityElementQuestionDifficultyTypes.medium,
      ),
    ).toEqual(LearningElementDifficulty.medium);
    expect(
      systemUnderTest["mapAdaptivityDifficultyToLearningElementDifficulty"](
        AdaptivityElementQuestionDifficultyTypes.hard,
      ),
    ).toEqual(LearningElementDifficulty.hard);
    expect(
      systemUnderTest["mapAdaptivityDifficultyToLearningElementDifficulty"](
        300,
      ),
    ).toEqual(LearningElementDifficulty.easy);
  });
});
