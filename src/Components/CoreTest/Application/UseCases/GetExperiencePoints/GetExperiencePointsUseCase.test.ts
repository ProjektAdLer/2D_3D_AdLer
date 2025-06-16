import { mock } from "jest-mock-extended";
import GetExperiencePointsUseCase from "../../../../Core/Application/UseCases/GetExperiencePoints/GetExperiencePoints";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import IGetUserLocationUseCase from "../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import Logger from "../../../../Core/Adapters/Logger/Logger";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";

const mockLogger = mock<Logger>();
const entityContainerMock = mock<IEntityContainer>();
const getUserLocationMock = mock<IGetUserLocationUseCase>();
const worldPortMock = mock<ILearningWorldPort>();

describe("GetExperiencePoints UseCase", () => {
  let systemUnderTest: GetExperiencePointsUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<Logger>(CORE_TYPES.ILogger).toConstantValue(
      mockLogger,
    );
    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer,
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind<IGetUserLocationUseCase>(
      USECASE_TYPES.IGetUserLocationUseCase,
    ).toConstantValue(getUserLocationMock);
    CoreDIContainer.rebind<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort,
    ).toConstantValue(worldPortMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(GetExperiencePointsUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("logs and returns if user is not in a world", () => {
    getUserLocationMock.execute.mockReturnValue({
      worldID: undefined,
      spaceID: 1,
    });

    systemUnderTest.execute();

    expect(mockLogger.log).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      "GetExperiencePointsUseCase: User ist not in a world!",
    );
  });

  test("logs and returns if no world is available", () => {
    getUserLocationMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    });

    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {
        availableWorlds: [
          {
            worldID: undefined,
          },
        ],
        experiencePoints: [
          {
            worldID: undefined,
          },
        ],
      },
    ]);

    systemUnderTest.execute();

    expect(mockLogger.log).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      "GetExperiencePointsUseCase: World is not available!",
    );
  });

  test("logs and returns if no world is available", () => {
    getUserLocationMock.execute.mockReturnValueOnce({
      worldID: 1,
      spaceID: 1,
    });

    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([
      {
        availableWorlds: [
          {
            worldID: 1,
          },
        ],
        experiencePoints: [
          {
            worldID: 1,
            maxLevel: 4,
            currentLevel: 2,
            currentExperiencePoints: 240,
          },
        ],
      },
    ]);

    systemUnderTest.execute();

    expect(worldPortMock.onExperiencePointsUpdated).toHaveBeenCalledWith({
      maxLevel: 4,
      currentLevel: 2,
      currentExperiencePoints: 240,
      numberOfLevelUps: 0,
    });
  });
});
