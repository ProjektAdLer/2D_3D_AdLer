import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import { mock } from "jest-mock-extended";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import IGetUserLocationUseCase from "../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import { IInternalCalculateLearningSpaceScoreUseCase } from "../../../../Core/Application/UseCases/CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import StoryElementTO from "../../../../Core/Application/DataTransferObjects/StoryElementTO";
import LearningElementEntity from "../../../../Core/Domain/Entities/LearningElementEntity";
import LearningSpaceScoreTO from "../../../../Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import ILoadStoryElementUseCase from "../../../../Core/Application/UseCases/LoadStoryElement/ILoadStoryElementUseCase";
import { StoryElementType } from "../../../../Core/Domain/Types/StoryElementType";
import StoryElementEntity from "../../../../Core/Domain/Entities/StoryElementEntity";
import BeginStoryElementIntroCutSceneUseCase from "../../../../Core/Application/UseCases/BeginStoryElementIntroCutScene/BeginStoryElementIntroCutSceneUseCase";
import ILoggerPort from "../../../../Core/Application/Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";

const entityContainerMock = mock<IEntityContainer>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();
const calculateLearningSpaceScoreUseCaseMock =
  mock<IInternalCalculateLearningSpaceScoreUseCase>();
const learningWorldPortMock = mock<ILearningWorldPort>();
const loadStoryElementUseCaseMock = mock<ILoadStoryElementUseCase>();
const loggerMock = mock<ILoggerPort>();

describe("BeginStoryElementOutroCutSceneUseCase", () => {
  let systemUnderTest: BeginStoryElementIntroCutSceneUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock,
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase,
    ).toConstantValue(getUserLocationUseCaseMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.ICalculateLearningSpaceScoreUseCase,
    ).toConstantValue(calculateLearningSpaceScoreUseCaseMock);
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      learningWorldPortMock,
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.ILoadStoryElementUseCase,
    ).toConstantValue(loadStoryElementUseCaseMock);
    CoreDIContainer.rebind(CORE_TYPES.ILogger).toConstantValue(loggerMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      BeginStoryElementIntroCutSceneUseCase,
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should not trigger cut scene if space has no story elements", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);

    systemUnderTest.execute();

    expect(
      learningWorldPortMock.onStoryElementCutSceneTriggered,
    ).not.toHaveBeenCalled();
  });

  test("does not call loadStoryElementUseCase when currentScore is not 0", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {} as StoryElementTO,
    ]);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      { value: 1 } as LearningElementEntity,
    ]);
    calculateLearningSpaceScoreUseCaseMock.internalExecute.mockReturnValueOnce({
      currentScore: 1,
    } as LearningSpaceScoreTO);

    systemUnderTest.execute();

    expect(loadStoryElementUseCaseMock.execute).not.toHaveBeenCalled();
  });

  test("calls loadStoryElementUseCase when currentScore is 0", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {} as StoryElementTO,
    ]);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      { value: 1 } as LearningElementEntity,
    ]);
    calculateLearningSpaceScoreUseCaseMock.internalExecute.mockReturnValueOnce({
      currentScore: 0,
    } as LearningSpaceScoreTO);

    systemUnderTest.execute();

    expect(loadStoryElementUseCaseMock.execute).toHaveBeenCalledTimes(1);
  });

  test("calls worldPort.onStoryElementCutSceneTriggered when currentScore is 0", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {} as StoryElementTO,
    ]);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      { value: 1 } as LearningElementEntity,
    ]);
    calculateLearningSpaceScoreUseCaseMock.internalExecute.mockReturnValueOnce({
      currentScore: 0,
    } as LearningSpaceScoreTO);

    systemUnderTest.execute();

    expect(
      learningWorldPortMock.onStoryElementCutSceneTriggered,
    ).toHaveBeenCalledTimes(1);
    expect(
      learningWorldPortMock.onStoryElementCutSceneTriggered,
    ).toHaveBeenCalledTimes(StoryElementType.Intro);
  });

  test("filterEntitiesOfType callback for story entity filtering should return true when story element is in the same world and space as the user", () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    });

    const storyElementEntityMock = {
      worldID: 1,
      spaceID: 1,
      storyType: StoryElementType.Intro,
    };
    let filterResult;
    entityContainerMock.filterEntitiesOfType.mockImplementationOnce(
      (entityType, callback) => {
        filterResult = callback(storyElementEntityMock as StoryElementEntity);
        return [storyElementEntityMock];
      },
    );

    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      { value: 1 } as LearningElementEntity,
    ]);

    calculateLearningSpaceScoreUseCaseMock.internalExecute.mockReturnValueOnce({
      currentScore: 1,
      requiredScore: 1,
    } as LearningSpaceScoreTO);

    systemUnderTest.execute();

    expect(filterResult).toBe(true);
  });

  test("calls logger with warning if CalculateLearningSpaceScoreUseCase throws an error", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {} as StoryElementTO,
    ]);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      { value: 1 } as LearningElementEntity,
    ]);
    calculateLearningSpaceScoreUseCaseMock.internalExecute.mockImplementationOnce(
      () => {
        throw new Error();
      },
    );

    systemUnderTest.execute();

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      expect.any(String),
    );
    expect(loadStoryElementUseCaseMock.execute).not.toHaveBeenCalled();
  });
});
