import { mock } from "jest-mock-extended";
import UpdateExperiencePointsUseCase from "../../../../Core/Application/UseCases/UpdateExperiencePoints/UpdateExperiencePointsUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import INotificationPort from "../../../../Core/Application/Ports/Interfaces/INotificationPort";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import Logger from "../../../../Core/Adapters/Logger/Logger";
import LearningWorldEntity from "../../../../Core/Domain/Entities/LearningWorldEntity";
import IGetUserLocationUseCase from "../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import UserLocationTO from "../../../../Core/Application/DataTransferObjects/UserLocationTO";
import ExperiencePointsEntity from "../../../../Core/Domain/Entities/ExperiencePointsEntity";
import UserDataEntity from "../../../../Core/Domain/Entities/UserDataEntity";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";

const entityContainerMock = mock<IEntityContainer>();
const notificationPortMock = mock<INotificationPort>();
const loggerMock = mock<Logger>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();

describe("UpdateExperiencePointsUseCase", () => {
  let systemUnderTest: UpdateExperiencePointsUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer,
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind<INotificationPort>(
      PORT_TYPES.INotificationPort,
    ).toConstantValue(notificationPortMock);
    CoreDIContainer.rebind(CORE_TYPES.ILogger).toConstantValue(loggerMock);
    CoreDIContainer.rebind<IGetUserLocationUseCase>(
      USECASE_TYPES.IGetUserLocationUseCase,
    ).toConstantValue(getUserLocationUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.IUpdateExperiencePointsUseCase,
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("calls logger with a warning if user is not in a space", () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: undefined,
      worldID: 1,
    } as UserLocationTO);

    systemUnderTest.internalExecute(0);

    expect(loggerMock.log).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith(
      "WARN",
      "UpdateExperiencePointsUseCase: User is not in a Space.",
    );
  });

  test("calls logger with a warning if world is not found", () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    // @ts-ignore
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([false]);

    systemUnderTest.internalExecute(0);

    expect(loggerMock.log).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith(
      "WARN",
      "UpdateExperiencePointsUseCase: World entity not found!",
    );
  });

  test("calls logger and returns if no learning element has been found", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 42,
    } as UserLocationTO);
    let userDataEntity = {
      isLoggedIn: true,
      availableWorlds: [{ worldID: 42, worldName: "World 1" }],
      experiencePoints: [],
    };

    //entityContainerMock.getEntitiesOfType.mockReturnValueOnce([userDataEntity]);

    const worldEntityMock = {
      id: 42,
      name: "World 1",
      spaces: [{ id: 1, elements: [null] }],
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

    await systemUnderTest.internalExecute(1);
    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      "UpdateExperiencePointsUseCase: No learning element is null or undefined",
    );
  });

  test("filter world function filters correctly", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 42,
    } as UserLocationTO);
    let userDataEntity = {
      isLoggedIn: true,
      availableWorlds: [{ worldID: 42, worldName: "World 1" }],
      experiencePoints: [],
    };

    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([userDataEntity]);

    const worldEntityMock = {
      id: 42,
      name: "World 1",
      spaces: [{ id: 1, elements: [{ id: 1, difficulty: 100 }] }],
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

    await systemUnderTest.internalExecute(1);

    expect(filterResult).toBe(true);
  });

  test("calculates updated experience points correctly", () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 42,
    } as UserLocationTO);
    let userDataEntity = {
      isLoggedIn: true,
      availableWorlds: [{ worldID: 1, worldName: "World 1" }],
      experiencePoints: [
        {
          worldID: 42,
          maxLevel: 4,
          currentLevel: 2,
          maxExperiencePoints: 400,
          currentExperiencePoints: 200,
          baseExperiencePoints: 10,
        },
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
            { id: 1, difficulty: 100 },
            { id: 2, difficulty: 200 },
            { id: 3, difficulty: 0 },
          ],
        },
      ],
    };
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      worldEntityMock,
    ]);

    systemUnderTest.internalExecute(3);

    expect(userDataEntity.experiencePoints[0].worldID).toBe(42);
    expect(userDataEntity.experiencePoints[0].currentExperiencePoints).toBe(
      210,
    );
    expect(userDataEntity.experiencePoints[0].currentLevel).toBe(2);
  });

  test("calculates updated experience points with levelUp correctly", () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 42,
    } as UserLocationTO);
    let userDataEntity = {
      isLoggedIn: true,
      availableWorlds: [{ worldID: 1, worldName: "World 1" }],
      experiencePoints: [
        {
          worldID: 42,
          maxLevel: 2,
          currentLevel: 0,
          maxExperiencePoints: 200,
          currentExperiencePoints: 0,
          baseExperiencePoints: 50,
        },
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
            { id: 1, difficulty: 100 },
            { id: 2, difficulty: 200 },
            { id: 3, difficulty: 0 },
          ],
        },
      ],
    };
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      worldEntityMock,
    ]);

    systemUnderTest.internalExecute(2);

    expect(userDataEntity.experiencePoints[0].worldID).toBe(42);
    expect(userDataEntity.experiencePoints[0].currentExperiencePoints).toBe(
      100,
    );
    expect(userDataEntity.experiencePoints[0].currentLevel).toBe(1);
  });

  test("does not calculates experience points if max level is reached", () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 42,
    } as UserLocationTO);
    let userDataEntity = {
      isLoggedIn: true,
      availableWorlds: [{ worldID: 1, worldName: "World 1" }],
      experiencePoints: [
        {
          worldID: 42,
          maxLevel: 2,
          currentLevel: 2,
          maxExperiencePoints: 200,
          currentExperiencePoints: 200,
          baseExperiencePoints: 50,
        },
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
            { id: 1, difficulty: 100 },
            { id: 2, difficulty: 200 },
            { id: 3, difficulty: 0 },
          ],
        },
      ],
    };
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      worldEntityMock,
    ]);

    systemUnderTest.internalExecute(2);

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.TRACE,
      "UpdateExperiencePointsUseCase: User has reached maximum experience level",
    );
  });
});
