import { mock } from "jest-mock-extended";
import ScoreAdaptivityElementUseCase from "../../../../../Core/Application/UseCases/Adaptivity/ScoreAdaptivityElementUseCase/ScoreAdaptivityElementUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import IEntityContainer from "../../../../../Core/Domain/EntityContainer/IEntityContainer";
import ILoggerPort from "../../../../../Core/Application/Ports/Interfaces/ILoggerPort";
import IGetUserLocationUseCase from "../../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import { IInternalCalculateLearningWorldScoreUseCase } from "../../../../../Core/Application/UseCases/CalculateLearningWorldScore/ICalculateLearningWorldScoreUseCase";
import { IInternalCalculateLearningSpaceScoreUseCase } from "../../../../../Core/Application/UseCases/CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import UserDataEntity from "../../../../../Core/Domain/Entities/UserDataEntity";
import { LogLevelTypes } from "../../../../../Core/Domain/Types/LogLevelTypes";
import IBeginStoryElementOutroCutSceneUseCase from "../../../../../Core/Application/UseCases/BeginStoryElementOutroCutScene/IBeginStoryElementOutroCutSceneUseCase";

const entityContainerMock = mock<IEntityContainer>();
const loggerMock = mock<ILoggerPort>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();
const calculateWorldScoreUseCaseMock =
  mock<IInternalCalculateLearningWorldScoreUseCase>();
const calculateSpaceScoreUseCaseMock =
  mock<IInternalCalculateLearningSpaceScoreUseCase>();
const worldPortMock = mock<ILearningWorldPort>();
const beginStoryElementOutroCutSceneUseCaseMock =
  mock<IBeginStoryElementOutroCutSceneUseCase>();

describe("ScoreAdaptivityElementUseCase", () => {
  let systemUnderTest: ScoreAdaptivityElementUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
    CoreDIContainer.rebind(CORE_TYPES.ILogger).toConstantValue(loggerMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase
    ).toConstantValue(getUserLocationUseCaseMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.ICalculateLearningWorldScoreUseCase
    ).toConstantValue(calculateWorldScoreUseCaseMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.ICalculateLearningSpaceScoreUseCase
    ).toConstantValue(calculateSpaceScoreUseCaseMock);
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.IBeginStoryElementOutroCutSceneUseCase
    ).toConstantValue(beginStoryElementOutroCutSceneUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(ScoreAdaptivityElementUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("warns and doesn't score if user is not in a world", () => {
    const userEntity = mock<UserDataEntity>();
    userEntity.isLoggedIn = true;
    entityContainerMock.getEntitiesOfType.mockReturnValue([userEntity]);
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: undefined,
      spaceID: undefined,
    });

    systemUnderTest.internalExecute(42);

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      expect.stringContaining("User is not in a world or space!")
    );
    expect(worldPortMock.onLearningElementScored).not.toHaveBeenCalled();
  });

  test("warns and doesn't score if user is not in a space", () => {
    const userEntity = mock<UserDataEntity>();
    userEntity.isLoggedIn = true;
    entityContainerMock.getEntitiesOfType.mockReturnValue([userEntity]);
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 42,
      spaceID: undefined,
    });

    systemUnderTest.internalExecute(42);

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      expect.stringContaining("User is not in a world or space!")
    );
    expect(worldPortMock.onLearningElementScored).not.toHaveBeenCalled();
  });

  test("warns and doesn't score if no matching element is found", () => {
    const userEntity = mock<UserDataEntity>();
    userEntity.isLoggedIn = true;
    entityContainerMock.getEntitiesOfType.mockReturnValue([userEntity]);
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 42,
      spaceID: 24,
    });
    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);

    systemUnderTest.internalExecute(42);

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      expect.stringContaining("No matching element found!")
    );
    expect(worldPortMock.onLearningElementScored).not.toHaveBeenCalled();
  });

  test("warns and doesn't score if more than one matching element is found", () => {
    const userEntity = mock<UserDataEntity>();
    userEntity.isLoggedIn = true;
    entityContainerMock.getEntitiesOfType.mockReturnValue([userEntity]);
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 42,
      spaceID: 24,
    });
    entityContainerMock.filterEntitiesOfType.mockReturnValue([{}, {}]);

    systemUnderTest.internalExecute(42);

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      expect.stringContaining("More than one matching element found!")
    );
    expect(worldPortMock.onLearningElementScored).not.toHaveBeenCalled();
  });

  // ANF-ID: [EWE0003]
  test("scores the element and updates the world and space score", () => {
    const userEntity = mock<UserDataEntity>();
    userEntity.isLoggedIn = true;
    entityContainerMock.getEntitiesOfType.mockReturnValue([userEntity]);
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 42,
      spaceID: 24,
    });
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      { parentWorldID: 42, id: 42 },
    ]);
    const newWorldScore = {
      currentScore: 42,
      maxScore: 42,
      requiredScore: 42,
      worldID: 42,
    };
    calculateWorldScoreUseCaseMock.internalExecute.mockReturnValue(
      newWorldScore
    );
    const newSpaceScore = {
      currentScore: 42,
      maxScore: 42,
      requiredScore: 42,
      spaceID: 24,
    };
    calculateSpaceScoreUseCaseMock.internalExecute.mockReturnValue(
      newSpaceScore
    );

    systemUnderTest.internalExecute(42);

    expect(worldPortMock.onLearningElementScored).toHaveBeenCalledWith(
      true,
      42
    );
    expect(worldPortMock.onLearningSpaceScored).toHaveBeenCalledWith(
      newSpaceScore
    );
    expect(worldPortMock.onLearningWorldScored).toHaveBeenCalledWith(
      newWorldScore
    );
  });

  // ANF-ID: [EWE0042]
  test("internalExecute calls beginStoryElementOutroCutSceneUseCase", () => {
    const userEntity = mock<UserDataEntity>();
    userEntity.isLoggedIn = true;
    entityContainerMock.getEntitiesOfType.mockReturnValue([userEntity]);
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 42,
      spaceID: 24,
    });
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      { parentWorldID: 42, id: 42 },
    ]);

    systemUnderTest.internalExecute(42);

    expect(
      beginStoryElementOutroCutSceneUseCaseMock.execute
    ).toHaveBeenCalledWith({ scoredLearningElementID: 42 });
  });
});
