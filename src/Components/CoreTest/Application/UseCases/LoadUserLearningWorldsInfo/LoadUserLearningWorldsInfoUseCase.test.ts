import { mock } from "jest-mock-extended";
import LoadUserLearningWorldsInfoUseCase from "../../../../Core/Application/UseCases/LoadUserLearningWorldsInfo/LoadUserLearningWorldsInfoUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import INotificationPort from "../../../../Core/Application/Ports/Interfaces/INotificationPort";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import { IInternalLoadUserInitialLearningWorldsInfoUseCase } from "../../../../Core/Application/UseCases/LoadUserInitialLearningWorldsInfo/ILoadUserInitialLearningWorldsInfoUseCase";
import UserInitialLearningWorldsInfoTO from "../../../../Core/Application/DataTransferObjects/UserInitialLearningWorldsInfoTO";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import LearningWorldEntity from "../../../../Core/Domain/Entities/LearningWorldEntity";
import { IInternalLoadLearningWorldUseCase } from "../../../../Core/Application/UseCases/LoadLearningWorld/ILoadLearningWorldUseCase";
import LearningWorldTO from "../../../../Core/Application/DataTransferObjects/LearningWorldTO";
import { LearningSpaceTemplateType } from "../../../../Core/Domain/Types/LearningSpaceTemplateType";
import { ThemeType } from "../../../../Core/Domain/Types/ThemeTypes";
import { IInternalCalculateLearningSpaceScoreUseCase } from "../../../../Core/Application/UseCases/CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import UserDataEntity from "../../../../Core/Domain/Entities/UserDataEntity";
import ILoggerPort from "../../../../Core/Application/Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";

const entityContainerMock = mock<IEntityContainer>();
const notificationPortMock = mock<INotificationPort>();
const loadUserInitialLearningWorldsInfoUseCaseMock =
  mock<IInternalLoadUserInitialLearningWorldsInfoUseCase>();
const worldPortMock = mock<ILearningWorldPort>();
const loadLearningWorldUseCaseMock = mock<IInternalLoadLearningWorldUseCase>();
const calculateSpaceScoreMock =
  mock<IInternalCalculateLearningSpaceScoreUseCase>();
const loggerMock = mock<ILoggerPort>();

const learningWorldEntity: Partial<LearningWorldEntity> = {
  name: "worldEntity",
  id: 1,
  spaces: [
    {
      id: 1,
      name: "string",
      elements: [],
      description: "string",
      goals: [],
      requirements: "",
      requiredScore: 1,
      template: LearningSpaceTemplateType.None,
      theme: ThemeType.Suburb,
      parentWorldID: 1,
      storyElements: [],
    },
  ],
  goals: [],
  description: "string",
  evaluationLink: "string",
} as Partial<LearningWorldEntity>;

const setupMocks = () => {
  loadUserInitialLearningWorldsInfoUseCaseMock.internalExecuteAsync.mockResolvedValue(
    {
      worldInfo: [{ worldID: 1, worldName: "TestWorld" }],
    } as UserInitialLearningWorldsInfoTO,
  );

  // @ts-ignore
  loadLearningWorldUseCaseMock.internalExecuteAsync.mockResolvedValue({
    name: "worldTO",
    spaces: [
      {
        id: 2,
        name: "string",
        elements: [],
        description: "string",
        goals: [],
        requirementsString: "",
        requirementsSyntaxTree: null,
        isAvailable: true,
        requiredScore: 100000000,
        currentScore: 0,
        maxScore: 0,
        template: LearningSpaceTemplateType.None,
        theme: ThemeType.Suburb,
        storyElements: [],
      },
    ],
    goals: [],
    id: 2,
    description: "string",
    evaluationLink: "string",
    completionModalShown: false,
  } as LearningWorldTO);

  entityContainerMock.filterEntitiesOfType.mockReturnValue([
    learningWorldEntity,
  ]);
  const userDataEntity: Partial<UserDataEntity> = {
    lastVisitedWorldID: 1,
  } as Partial<UserDataEntity>;
  entityContainerMock.getEntitiesOfType.mockReturnValue([userDataEntity]);

  calculateSpaceScoreMock.internalExecute.mockReturnValue({
    currentScore: 10,
    maxScore: 30,
    requiredScore: 20,
    spaceID: 1,
  });
};

describe("LoadUserInitialLearningWorldsInfoUseCase", () => {
  let systemUnderTest: LoadUserLearningWorldsInfoUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer,
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind(PORT_TYPES.INotificationPort).toConstantValue(
      notificationPortMock,
    );
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock,
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.ICalculateLearningSpaceScoreUseCase,
    ).toConstantValue(calculateSpaceScoreMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.ILoadLearningWorldUseCase,
    ).toConstantValue(loadLearningWorldUseCaseMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.ILoadUserInitialLearningWorldsInfoUseCase,
    ).toConstantValue(loadUserInitialLearningWorldsInfoUseCaseMock);
    CoreDIContainer.rebind(CORE_TYPES.ILogger).toConstantValue(loggerMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      LoadUserLearningWorldsInfoUseCase,
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("calls world port twice, once initially, once with all data", async () => {
    setupMocks();

    await systemUnderTest.executeAsync();

    expect(
      worldPortMock.onUserInitialLearningWorldsInfoLoaded,
    ).toHaveBeenCalledTimes(1);
    expect(worldPortMock.onUserLearningWorldsInfoLoaded).toHaveBeenCalledTimes(
      1,
    );
  });

  test("filterEntitiesOfType callback for learning world entity filtering should return true when ids are matching", async () => {
    setupMocks();

    let filterResult;
    entityContainerMock.filterEntitiesOfType.mockImplementation(
      (entityType, callback) => {
        filterResult = callback(learningWorldEntity);
        return [learningWorldEntity];
      },
    );

    await systemUnderTest.executeAsync();

    expect(filterResult).toBe(true);
  });

  test("calls logger with warning if CalculateLearningSpaceScoreUseCase throws error for one space", async () => {
    setupMocks();
    calculateSpaceScoreMock.internalExecute.mockImplementation(() => {
      throw new Error("test");
    });

    await systemUnderTest.executeAsync();

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      expect.any(String),
    );
  });
});
