import ILoggerPort from "../../../../Core/Application/Ports/Interfaces/ILoggerPort";
import BeginStoryElementOutroCutSceneUseCase from "../../../../Core/Application/UseCases/BeginStoryElementOutroCutScene/BeginStoryElementOutroCutScene";
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
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";
import LearningSpaceScoreTO from "../../../../Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import ILoadStoryElementUseCase from "../../../../Core/Application/UseCases/LoadStoryElement/ILoadStoryElementUseCase";
import { StoryElementType } from "../../../../Core/Domain/Types/StoryElementType";
import StoryElementEntity from "../../../../Core/Domain/Entities/StoryElementEntity";
import { error } from "console";

const loggerMock = mock<ILoggerPort>();
const entityContainerMock = mock<IEntityContainer>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();
const calculateLearningSpaceScoreUseCaseMock =
  mock<IInternalCalculateLearningSpaceScoreUseCase>();
const learningWorldPortMock = mock<ILearningWorldPort>();
const loadStoryElementUseCaseMock = mock<ILoadStoryElementUseCase>();

describe("BeginStoryElementOutroCutSceneUseCase", () => {
  let systemUnderTest: BeginStoryElementOutroCutSceneUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.ILogger).toConstantValue(loggerMock);
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
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      BeginStoryElementOutroCutSceneUseCase,
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should not trigger cut scene if space has no story elements", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);

    systemUnderTest.execute({ scoredLearningElementID: 0 });

    expect(
      learningWorldPortMock.onStoryElementCutSceneTriggered,
    ).not.toBeCalled();
  });

  test("logs warning when scored learning element can not be found", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {} as StoryElementTO,
    ]);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);

    systemUnderTest.execute({ scoredLearningElementID: 0 });

    expect(loggerMock.log).toBeCalledWith(
      LogLevelTypes.WARN,
      expect.stringContaining("Could not find scored learning element"),
    );
  });

  //ANF-ID: [EWE0042]
  test("does not call loadStoryElementUseCase when requiredScore was already exceeded", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {} as StoryElementTO,
    ]);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      { value: 1 } as LearningElementEntity,
    ]);
    calculateLearningSpaceScoreUseCaseMock.internalExecute.mockReturnValueOnce({
      currentScore: 2,
      requiredScore: 1,
    } as LearningSpaceScoreTO);

    systemUnderTest.execute({ scoredLearningElementID: 0 });

    expect(loadStoryElementUseCaseMock.execute).not.toBeCalled();
  });

  test("calls loadStoryElementUseCase when requiredScore was just exceeded", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {} as StoryElementTO,
    ]);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      { value: 1, hasScored: true } as LearningElementEntity,
    ]);
    calculateLearningSpaceScoreUseCaseMock.internalExecute.mockReturnValueOnce({
      currentScore: 1,
      requiredScore: 1,
    } as LearningSpaceScoreTO);

    systemUnderTest.execute({ scoredLearningElementID: 0 });

    expect(loadStoryElementUseCaseMock.execute).toBeCalledTimes(1);
  });

  test("does not call calculateLearningSpaceScoreUseCase when element has not been scored", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      { hasOutroTriggered: false } as StoryElementEntity,
    ]);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      { value: 1, hasScored: false, id: 0 } as LearningElementEntity,
    ]);

    systemUnderTest.execute({ scoredLearningElementID: 0 });

    expect(
      calculateLearningSpaceScoreUseCaseMock.internalExecute,
    ).not.toHaveBeenCalled();
  });

  test("does not call calculateLearningSpaceScoreUseCase when outro was already triggered", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      { hasOutroTriggered: true } as StoryElementEntity,
    ]);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      { value: 1, hasScored: true, id: 0 } as LearningElementEntity,
    ]);

    systemUnderTest.execute({ scoredLearningElementID: 0 });

    expect(
      calculateLearningSpaceScoreUseCaseMock.internalExecute,
    ).not.toHaveBeenCalled();
  });

  //ANF-ID: [EWE0042]
  test("calls worldPort.onStoryElementCutSceneTriggered when requiredScore was just exceeded", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {} as StoryElementTO,
    ]);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      { value: 1, hasScored: true } as LearningElementEntity,
    ]);
    calculateLearningSpaceScoreUseCaseMock.internalExecute.mockReturnValueOnce({
      currentScore: 1,
      requiredScore: 1,
    } as LearningSpaceScoreTO);

    systemUnderTest.execute({ scoredLearningElementID: 0 });

    expect(
      learningWorldPortMock.onStoryElementCutSceneTriggered,
    ).toBeCalledTimes(1);
    expect(
      learningWorldPortMock.onStoryElementCutSceneTriggered,
    ).toBeCalledWith(StoryElementType.Outro);
  });

  test("filterEntitiesOfType callback for story entity filtering should return true when story element is in the same world and space as the user", () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    });

    const storyElementEntityMock = {
      worldID: 1,
      spaceID: 1,
      storyType: StoryElementType.Outro,
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

    systemUnderTest.execute({ scoredLearningElementID: 1 });

    expect(filterResult).toBe(true);
  });

  test("filterEntitiesOfType callback for learning element filtering should return true when learning element is the scored learning element", () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    });

    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      { value: 1 } as LearningElementEntity,
    ]);

    const learningElementEntityMock = {
      id: 1,
      parentWorldID: 1,
    };
    let filterResult;
    entityContainerMock.filterEntitiesOfType.mockImplementationOnce(
      (entityType, callback) => {
        filterResult = callback(
          learningElementEntityMock as LearningElementEntity,
        );
        return [learningElementEntityMock];
      },
    );

    calculateLearningSpaceScoreUseCaseMock.internalExecute.mockReturnValueOnce({
      currentScore: 1,
      requiredScore: 1,
    } as LearningSpaceScoreTO);

    systemUnderTest.execute({ scoredLearningElementID: 1 });

    expect(filterResult).toBe(true);
  });

  test("throws error if internalexecute of calculate learning space score usecase", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {} as StoryElementTO,
    ]);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      { value: 1, hasScored: true } as LearningElementEntity,
    ]);
    calculateLearningSpaceScoreUseCaseMock.internalExecute.mockImplementation(
      () => {
        throw new Error("Test error");
      },
    );
    systemUnderTest.execute({ scoredLearningElementID: 0 });

    expect(loggerMock.log).toBeCalledWith(
      LogLevelTypes.ERROR,
      expect.stringContaining("Couldn't trigger outro cutscene"),
    );
  });
});
