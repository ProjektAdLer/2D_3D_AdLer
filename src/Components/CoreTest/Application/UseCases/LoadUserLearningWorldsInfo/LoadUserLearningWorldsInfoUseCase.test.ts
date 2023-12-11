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
import { LearningSpaceThemeType } from "../../../../Core/Domain/Types/LearningSpaceThemeTypes";
import { IInternalCalculateLearningSpaceScoreUseCase } from "../../../../Core/Application/UseCases/CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";

const entityContainerMock = mock<IEntityContainer>();
const notificationPortMock = mock<INotificationPort>();
const loadUserInitialLearningWorldsInfoUseCaseMock =
  mock<IInternalLoadUserInitialLearningWorldsInfoUseCase>();
const worldPortMock = mock<ILearningWorldPort>();
const loadLearningWorldUseCaseMock = mock<IInternalLoadLearningWorldUseCase>();
const calculateSpaceScoreMock =
  mock<IInternalCalculateLearningSpaceScoreUseCase>();

describe("LoadUserInitialLearningWorldsInfoUseCase", () => {
  let systemUnderTest: LoadUserLearningWorldsInfoUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind(PORT_TYPES.INotificationPort).toConstantValue(
      notificationPortMock
    );
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.ICalculateLearningSpaceScoreUseCase
    ).toConstantValue(calculateSpaceScoreMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.ILoadLearningWorldUseCase
    ).toConstantValue(loadLearningWorldUseCaseMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.ILoadUserInitialLearningWorldsInfoUseCase
    ).toConstantValue(loadUserInitialLearningWorldsInfoUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      LoadUserLearningWorldsInfoUseCase
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("calls world port twice, once initially, once with all data", async () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
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
            theme: LearningSpaceThemeType.Suburb,
            parentWorldID: 1,
          },
        ],
        goals: [],
        description: "string",
        evaluationLink: "string",
      } as LearningWorldEntity,
      {
        name: "string2",
        id: 2,
        spaces: [
          {
            id: 2,
            name: "string",
            elements: [],
            description: "string",
            goals: [],
            requirements: "",
            requiredScore: 100000000,
            template: LearningSpaceTemplateType.None,
            theme: LearningSpaceThemeType.Suburb,
            parentWorldID: 1,
          },
        ],
        goals: [],
        description: "string2",
        evaluationLink: "string2",
      } as LearningWorldEntity,
    ]);
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
          theme: LearningSpaceThemeType.Suburb,
        },
      ],
      goals: [],
      id: 2,
      description: "string",
      evaluationLink: "string",
    } as LearningWorldTO);
    loadUserInitialLearningWorldsInfoUseCaseMock.internalExecuteAsync.mockResolvedValue(
      {
        worldInfo: [{ worldID: 1, worldName: "TestWorld" }],
      } as UserInitialLearningWorldsInfoTO
    );
    calculateSpaceScoreMock.internalExecute.mockReturnValue({
      currentScore: 10,
      maxScore: 30,
      requiredScore: 20,
      spaceID: 1,
    });

    await systemUnderTest.executeAsync();

    expect(
      worldPortMock.onUserInitialLearningWorldsInfoLoaded
    ).toHaveBeenCalledTimes(1);
    expect(worldPortMock.onUserLearningWorldsInfoLoaded).toHaveBeenCalledTimes(
      1
    );
  });
});
