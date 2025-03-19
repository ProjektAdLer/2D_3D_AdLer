import { toBeOneOf } from "jest-extended";
import ExternalLearningElementEntity from "../../../../Core/Domain/Entities/Adaptivity/ExternalLearningElementEntity";
import {
  LearningElementModel,
  LearningElementModelTypeEnums,
  isValidLearningElementModelType,
} from "../../../../Core/Domain/LearningElementModels/LearningElementModelTypes";
import LoadLearningWorldUseCase from "../../../../Core/Application/UseCases/LoadLearningWorld/LoadLearningWorldUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import UserDataEntity from "../../../../Core/Domain/Entities/UserDataEntity";
import LearningSpaceEntity from "../../../../Core/Domain/Entities/LearningSpaceEntity";
import LearningElementEntity from "../../../../Core/Domain/Entities/LearningElementEntity";
import LearningWorldEntity from "../../../../Core/Domain/Entities/LearningWorldEntity";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import { minimalGetWorldDataResponse } from "../../../Adapters/BackendAdapter/BackendResponses";
import { IInternalCalculateLearningSpaceScoreUseCase } from "../../../../Core/Application/UseCases/CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import LearningSpaceScoreTO from "../../../../Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import LearningWorldStatusTO from "../../../../Core/Application/DataTransferObjects/LearningWorldStatusTO";
import ISetUserLocationUseCase from "../../../../Core/Application/UseCases/SetUserLocation/ISetUserLocationUseCase";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import IBackendPort from "../../../../Core/Application/Ports/Interfaces/IBackendPort";
import ICalculateLearningSpaceAvailabilityUseCase from "../../../../Core/Application/UseCases/CalculateLearningSpaceAvailability/ICalculateLearningSpaceAvailabilityUseCase";
import INotificationPort from "../../../../Core/Application/Ports/Interfaces/INotificationPort";
import BackendWorldTO from "../../../../Core/Application/DataTransferObjects/BackendWorldTO";
import { AdaptivityElementDataTO } from "../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementDataTO";
import { LearningSpaceTemplateType } from "../../../../Core/Domain/Types/LearningSpaceTemplateType";
import { LearningSpaceThemeType } from "../../../../Core/Domain/Types/LearningSpaceThemeTypes";
import AdaptivityElementEntity from "../../../../Core/Domain/Entities/Adaptivity/AdaptivityElementEntity";
import {
  BackendAdaptivityElementTO,
  BackendLearningElementTO,
} from "../../../../Core/Application/DataTransferObjects/BackendElementTO";
import StoryElementEntity from "../../../../Core/Domain/Entities/StoryElementEntity";
import { StoryElementType } from "../../../../Core/Domain/Types/StoryElementType";
import BackendStoryTO from "../../../../Core/Application/DataTransferObjects/BackendStoryTO";
import { LearningElementTypes } from "../../../../Core/Domain/Types/LearningElementTypes";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";
import { EmotionType } from "../../../../Core/Domain/Types/EmotionTypes";

const backendMock = mock<IBackendPort>();
const worldPortMock = mock<ILearningWorldPort>();
const entityContainerMock = mock<IEntityContainer>();
const notificationPortMock = mock<INotificationPort>();
const calculateSpaceScoreUseCaseMock =
  mock<IInternalCalculateLearningSpaceScoreUseCase>();
const setUserLocationUseCaseMock = mock<ISetUserLocationUseCase>();
const calculateSpaceAvailabilityUseCaseMock =
  mock<ICalculateLearningSpaceAvailabilityUseCase>();

const mockedGetEntitiesOfTypeUserDataReturnValue = [
  {
    isLoggedIn: true,
    userToken: "token",
    availableWorlds: [{ worldID: 42, worldName: "world42" }],
  } as UserDataEntity,
];

const backendAdaptivityElementTOMock = new BackendAdaptivityElementTO();
backendAdaptivityElementTOMock.id = 1;
backendAdaptivityElementTOMock.name = "";
backendAdaptivityElementTOMock.value = 1;
backendAdaptivityElementTOMock.type = "adaptivity";
backendAdaptivityElementTOMock.description = "";
backendAdaptivityElementTOMock.goals = [""];
backendAdaptivityElementTOMock.model = "NotAModel" as LearningElementModel;
backendAdaptivityElementTOMock.adaptivity = {
  id: 1,
  elementName: "",
  introText: "",
  model: "a-quizbg-defaultnpc",
  tasks: [],
} as AdaptivityElementDataTO;

const minimalAdaptivityBackendWorldTO: BackendWorldTO = {
  worldName: "TestWorld",
  goals: ["TestGoal"],
  description: "TestDescription",
  evaluationLink: "TestLink",
  spaces: [
    {
      description: "TestDescription",
      goals: ["TestGoals"],
      requirements: "",
      id: 1,
      name: "TestSpace",
      requiredScore: 0,
      elements: [backendAdaptivityElementTOMock],
      template: LearningSpaceTemplateType.L,
      templateStyle: LearningSpaceThemeType.Arcade,
      introStory: null,
      outroStory: null,
    },
  ],
  externalElements: [],
};

const minimalCombinedStoryElementBackendWorldTO: BackendWorldTO = {
  worldName: "TestWorld",
  goals: ["TestGoal"],
  description: "TestDescription",
  evaluationLink: "TestLink",
  spaces: [
    {
      description: "TestDescription",
      goals: ["TestGoals"],
      requirements: "",
      id: 1,
      name: "TestSpace",
      requiredScore: 0,
      elements: [backendAdaptivityElementTOMock],
      template: LearningSpaceTemplateType.L,
      templateStyle: LearningSpaceThemeType.Arcade,
      introStory: {
        storyTexts: ["hello"],
        elementModel:
          LearningElementModelTypeEnums.QuizElementModelTypes.DefaultNPC,
      } as BackendStoryTO,
      outroStory: {
        storyTexts: ["hello"],
        elementModel:
          LearningElementModelTypeEnums.QuizElementModelTypes.DefaultNPC,
      } as BackendStoryTO,
    },
  ],
  externalElements: [],
};

const minimalExternalElementBackendWorldTO: BackendWorldTO = {
  worldName: "TestWorld",
  goals: ["TestGoal"],
  description: "TestDescription",
  evaluationLink: "TestLink",
  spaces: [
    {
      description: "TestDescription",
      goals: ["TestGoals"],
      requirements: "",
      id: 1,
      name: "TestSpace",
      requiredScore: 0,
      elements: [backendAdaptivityElementTOMock],
      template: LearningSpaceTemplateType.L,
      templateStyle: LearningSpaceThemeType.Arcade,
      introStory: null,
      outroStory: null,
    },
  ],
  externalElements: [
    {
      id: 0,
      name: "externalElement",
      type: LearningElementTypes.image,
    },
  ],
};

const minimalSeperateStoryElementBackendWorldTO: BackendWorldTO = {
  worldName: "TestWorld",
  goals: ["TestGoal"],
  description: "TestDescription",
  evaluationLink: "TestLink",
  spaces: [
    {
      description: "TestDescription",
      goals: ["TestGoals"],
      requirements: "",
      id: 1,
      name: "TestSpace",
      requiredScore: 0,
      elements: [backendAdaptivityElementTOMock],
      template: LearningSpaceTemplateType.L,
      templateStyle: LearningSpaceThemeType.Arcade,
      introStory: {
        storyTexts: ["hello"],
        elementModel:
          LearningElementModelTypeEnums.QuizElementModelTypes.ArcadeNPC,
      } as BackendStoryTO,
      outroStory: {
        storyTexts: ["hello"],
        elementModel:
          LearningElementModelTypeEnums.QuizElementModelTypes.RobotNPC,
      } as BackendStoryTO,
    },
  ],
  externalElements: [],
};

describe("LoadLearningWorldUseCase", () => {
  let systemUnderTest: LoadLearningWorldUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IBackendAdapter).toConstantValue(
      backendMock,
    );
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock,
    );
    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock,
    );
    CoreDIContainer.rebind(PORT_TYPES.INotificationPort).toConstantValue(
      notificationPortMock,
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.ICalculateLearningSpaceScoreUseCase,
    ).toConstantValue(calculateSpaceScoreUseCaseMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.ISetUserLocationUseCase,
    ).toConstantValue(setUserLocationUseCaseMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.ICalculateLearningSpaceAvailabilityUseCase,
    ).toConstantValue(calculateSpaceAvailabilityUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LoadLearningWorldUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("Displays error, if User is not logged in", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {
        isLoggedIn: false,
      },
    ]);

    await expect(
      systemUnderTest.executeAsync({ worldID: 42 }),
    ).rejects.not.toBeUndefined();

    expect(entityContainerMock.getEntitiesOfType).toHaveBeenCalledWith(
      UserDataEntity,
    );

    expect(notificationPortMock.onNotificationTriggered).toHaveBeenCalledWith(
      LogLevelTypes.ERROR,
      "InternalGetLoginStatusUseCase: Checked LoginStatus: false. User is not logged in!",
      "User is not logged in!",
    );
  });

  // ANF-ID: [ELG0010]
  test("Displays error, if World is not available", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue(
      mockedGetEntitiesOfTypeUserDataReturnValue,
    );

    await expect(
      systemUnderTest.executeAsync({ worldID: 43 }),
    ).rejects.not.toBeUndefined();

    expect(entityContainerMock.getEntitiesOfType).toHaveBeenCalledWith(
      UserDataEntity,
    );

    expect(notificationPortMock.onNotificationTriggered).toHaveBeenCalledWith(
      LogLevelTypes.ERROR,
      "LoadLearningWorldUseCase: World is not available!",
      "World is not available!",
    );
  });

  test("doesn't load a World, if an entity is available", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue(
      mockedGetEntitiesOfTypeUserDataReturnValue,
    );

    const mockedWorldEntity = new LearningWorldEntity();
    mockedWorldEntity.name = minimalGetWorldDataResponse.worldName;
    mockedWorldEntity.goals = minimalGetWorldDataResponse.goals;
    mockedWorldEntity.id = 42;
    mockedWorldEntity.spaces = [];
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      mockedWorldEntity,
    ]);

    await systemUnderTest.executeAsync({ worldID: 42 });

    expect(entityContainerMock.createEntity).not.toHaveBeenCalled();
  });

  //ANF-ID: [ELG0005]
  test("loads the World and notifies port (executeAsync)", async () => {
    // mock user data response
    entityContainerMock.getEntitiesOfType.mockReturnValue(
      mockedGetEntitiesOfTypeUserDataReturnValue,
    );
    // mock world response
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);

    // mock backend response
    backendMock.getWorldData.mockResolvedValueOnce(minimalGetWorldDataResponse);

    backendMock.getCoursesAvailableForUser.mockResolvedValue({
      courses: [
        {
          courseID: 1,
          courseName: "Testkurs",
        },
      ],
    });

    // mock entity creation
    const mockedWorldEntity = new LearningWorldEntity();
    mockedWorldEntity.name = minimalGetWorldDataResponse.worldName;
    mockedWorldEntity.goals = minimalGetWorldDataResponse.goals;
    mockedWorldEntity.spaces = [];

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningElementEntity>(),
    );
    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningSpaceEntity>(),
    );
    entityContainerMock.createEntity.mockReturnValueOnce(mockedWorldEntity);

    backendMock.getWorldStatus.mockResolvedValue({
      worldID: 1,
      elements: [{}],
    } as LearningWorldStatusTO);

    await systemUnderTest.executeAsync({ worldID: 42 });

    expect(backendMock.getWorldData).toHaveBeenCalledTimes(1);
    expect(entityContainerMock.createEntity).toHaveBeenCalledTimes(3);
    expect(worldPortMock.onLearningWorldLoaded).toHaveBeenCalledTimes(1);
  });

  //ANF-ID: [ELG0005]
  test("loads the World and returns value (internalExecuteAsync)", async () => {
    // mock user data response
    entityContainerMock.getEntitiesOfType.mockReturnValue(
      mockedGetEntitiesOfTypeUserDataReturnValue,
    );
    // mock world response
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);

    // mock backend response
    backendMock.getWorldData.mockResolvedValueOnce(minimalGetWorldDataResponse);

    backendMock.getCoursesAvailableForUser.mockResolvedValue({
      courses: [
        {
          courseID: 1,
          courseName: "Testkurs",
        },
      ],
    });

    // mock entity creation
    const mockedWorldEntity = new LearningWorldEntity();
    mockedWorldEntity.name = minimalGetWorldDataResponse.worldName;
    mockedWorldEntity.goals = minimalGetWorldDataResponse.goals;
    mockedWorldEntity.spaces = [];

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningElementEntity>(),
    );
    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningSpaceEntity>(),
    );
    entityContainerMock.createEntity.mockReturnValueOnce(mockedWorldEntity);

    backendMock.getWorldStatus.mockResolvedValue({
      worldID: 1,
      elements: [{}],
    } as LearningWorldStatusTO);

    await systemUnderTest.internalExecuteAsync({ worldID: 42 });

    expect(backendMock.getWorldData).toHaveBeenCalledTimes(1);
    expect(entityContainerMock.createEntity).toHaveBeenCalledTimes(3);
  });

  //ANF-ID: [ELG0005]
  test("uses worldEntity if one is available", async () => {
    // mock user data response
    entityContainerMock.getEntitiesOfType.mockReturnValue(
      mockedGetEntitiesOfTypeUserDataReturnValue,
    );

    // mock world response
    const mockedWorldEntity = new LearningWorldEntity();
    mockedWorldEntity.name = minimalGetWorldDataResponse.worldName;
    mockedWorldEntity.goals = minimalGetWorldDataResponse.goals;
    mockedWorldEntity.spaces = [];
    mockedWorldEntity.id = 42;
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      mockedWorldEntity,
    ]);

    await systemUnderTest.executeAsync({ worldID: 42 });

    expect(backendMock.getWorldData).toHaveBeenCalledTimes(0);
    expect(worldPortMock.onLearningWorldLoaded).toHaveBeenCalledTimes(1);
  });

  //ANF-ID: [ELG0005]
  test("calls CalculateSpaceScoreUseCase for each space in the loaded world", async () => {
    // mock user data response
    entityContainerMock.getEntitiesOfType.mockReturnValue(
      mockedGetEntitiesOfTypeUserDataReturnValue,
    );

    // mock world response
    const mockedWorldEntity = new LearningWorldEntity();
    mockedWorldEntity.name = minimalGetWorldDataResponse.worldName;
    mockedWorldEntity.goals = minimalGetWorldDataResponse.goals;
    mockedWorldEntity.id = 42;
    const mockedSpaceEntity1 = new LearningSpaceEntity();
    const mockedSpaceEntity2 = new LearningSpaceEntity();
    mockedWorldEntity.spaces = [mockedSpaceEntity1, mockedSpaceEntity2];
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      mockedWorldEntity,
    ]);

    // mock CalculateSpaceScoreUseCase return value
    calculateSpaceScoreUseCaseMock.internalExecute.mockReturnValue({
      currentScore: 0,
      maxScore: 0,
      requiredScore: 0,
      spaceID: 1,
    } as LearningSpaceScoreTO);

    calculateSpaceAvailabilityUseCaseMock.internalExecute.mockReturnValue({
      isAvailable: true,
      requirementsString: "",
      requirementsSyntaxTree: null,
    });

    await systemUnderTest.executeAsync({ worldID: 42 });

    expect(
      calculateSpaceScoreUseCaseMock.internalExecute,
    ).toHaveBeenCalledTimes(2);
  });

  //ANF-ID: [ELG0005]
  test("calls CalculateSpaceAvailabilityUseCase for each space in the loaded world", async () => {
    // mock user data response
    entityContainerMock.getEntitiesOfType.mockReturnValue(
      mockedGetEntitiesOfTypeUserDataReturnValue,
    );

    // mock world response
    const mockedWorldEntity = new LearningWorldEntity();
    mockedWorldEntity.name = minimalGetWorldDataResponse.worldName;
    mockedWorldEntity.goals = minimalGetWorldDataResponse.goals;
    mockedWorldEntity.id = 42;
    const mockedSpaceEntity1 = new LearningSpaceEntity();
    const mockedSpaceEntity2 = new LearningSpaceEntity();
    mockedWorldEntity.spaces = [mockedSpaceEntity1, mockedSpaceEntity2];
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      mockedWorldEntity,
    ]);

    // mock CalculateSpaceScoreUseCase return value
    calculateSpaceScoreUseCaseMock.internalExecute.mockReturnValue({
      currentScore: 0,
      maxScore: 0,
      requiredScore: 0,
      spaceID: 1,
    } as LearningSpaceScoreTO);

    calculateSpaceAvailabilityUseCaseMock.internalExecute.mockReturnValue({
      isAvailable: true,
      requirementsString: "",
      requirementsSyntaxTree: null,
    });

    await systemUnderTest.executeAsync({ worldID: 42 });

    expect(
      calculateSpaceAvailabilityUseCaseMock.internalExecute,
    ).toHaveBeenCalledTimes(2);
  });

  //ANF-ID: [ELG0006, ELG0007]
  test("calls SetUserLocationUseCase", async () => {
    // mock user data response
    entityContainerMock.getEntitiesOfType.mockReturnValue(
      mockedGetEntitiesOfTypeUserDataReturnValue,
    );
    // mock world response
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);

    // mock backend response
    backendMock.getWorldData.mockResolvedValueOnce(minimalGetWorldDataResponse);

    // mock entity creation
    const mockedWorldEntity = new LearningWorldEntity();
    mockedWorldEntity.name = minimalGetWorldDataResponse.worldName;
    mockedWorldEntity.goals = minimalGetWorldDataResponse.goals;
    mockedWorldEntity.spaces = [];

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningElementEntity>(),
    );
    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningSpaceEntity>(),
    );
    entityContainerMock.createEntity.mockReturnValueOnce(mockedWorldEntity);

    backendMock.getWorldStatus.mockResolvedValue({
      worldID: 1,
      elements: [{}],
    } as LearningWorldStatusTO);

    await systemUnderTest.executeAsync({ worldID: 42 });

    expect(setUserLocationUseCaseMock.execute).toHaveBeenCalledWith({
      worldID: 42,
    });
  });

  test("creates adaptivity elements", async () => {
    // mock user data response
    entityContainerMock.getEntitiesOfType.mockReturnValue(
      mockedGetEntitiesOfTypeUserDataReturnValue,
    );

    // mock world response
    const mockedWorldEntity = new LearningWorldEntity();
    mockedWorldEntity.name = minimalAdaptivityBackendWorldTO.worldName;
    mockedWorldEntity.goals = minimalAdaptivityBackendWorldTO.goals;
    mockedWorldEntity.spaces = [];
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);

    // mock backend response
    backendMock.getWorldData.mockResolvedValueOnce(
      minimalAdaptivityBackendWorldTO,
    );

    backendMock.getWorldStatus.mockResolvedValue({
      worldID: 42,
      elements: [{}],
    } as LearningWorldStatusTO);

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningElementEntity>(),
    );

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningSpaceEntity>(),
    );

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<AdaptivityElementEntity>(),
    );

    entityContainerMock.createEntity.mockReturnValueOnce(mockedWorldEntity);

    backendMock.getCoursesAvailableForUser.mockResolvedValue({
      courses: [
        {
          courseID: 42,
          courseName: "Testkurs",
        },
      ],
    });

    await systemUnderTest.executeAsync({ worldID: 42 });
    expect(entityContainerMock.createEntity).toHaveBeenCalledTimes(4);
  });

  // ANF-ID: [EZZ0006]
  test("creates combined intro and outro story element", async () => {
    // mock user data response
    entityContainerMock.getEntitiesOfType.mockReturnValue(
      mockedGetEntitiesOfTypeUserDataReturnValue,
    );

    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);

    backendMock.getWorldData.mockResolvedValue(
      minimalCombinedStoryElementBackendWorldTO,
    );

    backendMock.getWorldStatus.mockResolvedValue({
      worldID: 42,
      elements: [{}],
    } as LearningWorldStatusTO);

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningElementEntity>(),
    );

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<StoryElementEntity>(),
    );

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningSpaceEntity>(),
    );

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<AdaptivityElementEntity>(),
    );

    // mock world response
    const mockedWorldEntity = new LearningWorldEntity();
    mockedWorldEntity.name = minimalAdaptivityBackendWorldTO.worldName;
    mockedWorldEntity.goals = minimalAdaptivityBackendWorldTO.goals;
    mockedWorldEntity.spaces = [];
    mockedWorldEntity.completionModalShown = true;

    entityContainerMock.createEntity.mockReturnValueOnce(mockedWorldEntity);

    await systemUnderTest.executeAsync({ worldID: 42 });
    expect(entityContainerMock.createEntity).toHaveBeenCalledTimes(5);
  });

  // ANF-ID: [EZZ0006]
  test("creates seperate intro and outro story elements", async () => {
    // mock user data response
    entityContainerMock.getEntitiesOfType.mockReturnValue(
      mockedGetEntitiesOfTypeUserDataReturnValue,
    );

    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);

    backendMock.getWorldData.mockResolvedValue(
      minimalSeperateStoryElementBackendWorldTO,
    );

    backendMock.getWorldStatus.mockResolvedValue({
      worldID: 42,
      elements: [{}],
    } as LearningWorldStatusTO);

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningElementEntity>(),
    );

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<StoryElementEntity>(),
    );

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<StoryElementEntity>(),
    );

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningSpaceEntity>(),
    );

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<AdaptivityElementEntity>(),
    );

    // mock world response
    const mockedWorldEntity = new LearningWorldEntity();
    mockedWorldEntity.name = minimalAdaptivityBackendWorldTO.worldName;
    mockedWorldEntity.goals = minimalAdaptivityBackendWorldTO.goals;
    mockedWorldEntity.spaces = [];
    mockedWorldEntity.completionModalShown = true;

    entityContainerMock.createEntity.mockReturnValueOnce(mockedWorldEntity);

    await systemUnderTest.executeAsync({ worldID: 42 });
    expect(entityContainerMock.createEntity).toHaveBeenCalledTimes(6);
  });

  // ANF-ID: [EZZ0006]
  test.skip("applies model to story element if none is assigned in ATF", async () => {
    // mock user data response
    entityContainerMock.getEntitiesOfType.mockReturnValue(
      mockedGetEntitiesOfTypeUserDataReturnValue,
    );

    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);

    backendMock.getWorldData.mockResolvedValue({
      worldName: "TestWorld",
      goals: ["TestGoal"],
      description: "TestDescription",
      evaluationLink: "TestLink",
      spaces: [
        {
          description: "TestDescription",
          goals: ["TestGoals"],
          requirements: "",
          id: 1,
          name: "TestSpace",
          requiredScore: 0,
          elements: [backendAdaptivityElementTOMock],
          template: LearningSpaceTemplateType.L,
          templateStyle: LearningSpaceThemeType.Arcade,
          introStory: {
            storyTexts: ["hello"],
            elementModel: undefined,
            facialExpression: EmotionType.default,
          } as unknown as BackendStoryTO,
          outroStory: {
            storyTexts: ["hello"],
            elementModel:
              LearningElementModelTypeEnums.QuizElementModelTypes.DefaultNPC,
            facialExpression: EmotionType.default,
          } as BackendStoryTO,
        },
      ],
      externalElements: [],
    });

    backendMock.getWorldStatus.mockResolvedValue({
      worldID: 42,
      elements: [{}],
    } as LearningWorldStatusTO);

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningElementEntity>(),
    );

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<StoryElementEntity>(),
    );

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<StoryElementEntity>(),
    );

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningSpaceEntity>(),
    );

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<AdaptivityElementEntity>(),
    );

    // mock world response
    const mockedWorldEntity = new LearningWorldEntity();
    mockedWorldEntity.name = minimalAdaptivityBackendWorldTO.worldName;
    mockedWorldEntity.goals = minimalAdaptivityBackendWorldTO.goals;
    mockedWorldEntity.spaces = [];
    mockedWorldEntity.completionModalShown = true;

    entityContainerMock.createEntity.mockReturnValueOnce(mockedWorldEntity);

    await systemUnderTest.executeAsync({ worldID: 42 });

    expect(entityContainerMock.createEntity.mock.calls).toContainEqual([
      {
        worldID: expect.any(Number),
        spaceID: expect.any(Number),
        introStoryTexts: expect.any(Array),
        modelType:
          LearningElementModelTypeEnums.QuizElementModelTypes.ArcadeNPC,
        storyType: StoryElementType.Intro,
        hasOutroTriggered: expect.toBeOneOf([expect.any(Boolean), null]),
        introEmotion: EmotionType.default,
        outroEmotion: EmotionType.default,
      },
      StoryElementEntity,
    ]);
  });

  test("creates external element", async () => {
    // mock user data response
    entityContainerMock.getEntitiesOfType.mockReturnValue(
      mockedGetEntitiesOfTypeUserDataReturnValue,
    );

    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);

    backendMock.getWorldData.mockResolvedValue(
      minimalExternalElementBackendWorldTO,
    );

    backendMock.getWorldStatus.mockResolvedValue({
      worldID: 42,
      elements: [{}],
    } as LearningWorldStatusTO);

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningElementEntity>(),
    );

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningSpaceEntity>(),
    );

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<AdaptivityElementEntity>(),
    );

    // mock world response
    const mockedWorldEntity = new LearningWorldEntity();
    mockedWorldEntity.name = minimalAdaptivityBackendWorldTO.worldName;
    mockedWorldEntity.goals = minimalAdaptivityBackendWorldTO.goals;
    mockedWorldEntity.spaces = [];
    mockedWorldEntity.completionModalShown = true;

    entityContainerMock.createEntity.mockReturnValueOnce(mockedWorldEntity);

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<ExternalLearningElementEntity>(),
    );

    await systemUnderTest.executeAsync({ worldID: 42 });
    expect(entityContainerMock.createEntity).toHaveBeenCalledTimes(5);
  });

  // ANF-ID: [EZZ0008]
  test("createLearningElementEntities returns null for an empty learning element slot", async () => {
    const result = systemUnderTest["createLearningElementEntities"](
      42,
      [null],
      mock<LearningWorldStatusTO>(),
      LearningSpaceThemeType.Campus,
    );
    expect(result[0]).toBeNull();
  });

  // ANF-ID: [EZZ0008]
  test("createLearningElementEntities creates a LearningElementEntity with correctly assigned model", async () => {
    entityContainerMock.createEntity.mockImplementation((entity) => entity);

    const learningElementTO: BackendLearningElementTO = {
      id: 42,
      name: "testElement",
      value: 1,
      type: "h5p",
      description: "",
      goals: [""],
      model: LearningElementModelTypeEnums.QuizElementModelTypes.DefaultNPC,
    };
    const worldStatusTO: LearningWorldStatusTO = {
      worldID: 1,
      elements: [
        {
          elementID: 42,
          hasScored: false,
        },
      ],
    };

    const result = systemUnderTest["createLearningElementEntities"](
      42,
      [learningElementTO],
      worldStatusTO,
      LearningSpaceThemeType.Campus,
    );

    expect(result[0]!.id).toBe(42);
    expect(result[0]!.name).toBe("testElement");
    expect(result[0]!.model).toBe(
      LearningElementModelTypeEnums.QuizElementModelTypes.DefaultNPC,
    );
  });

  // ANF-ID: [EZZ0008]
  test("createLearningElementEntities assigns a model to learning element without set model", async () => {
    entityContainerMock.createEntity.mockImplementation((entity) => entity);

    const learningElementTO: BackendLearningElementTO = {
      id: 42,
      name: "testElement",
      value: 1,
      type: "h5p",
      description: "",
      // @ts-ignore
      model: undefined,
      goals: [""],
    };
    const worldStatusTO: LearningWorldStatusTO = {
      worldID: 1,
      elements: [
        {
          elementID: 42,
          hasScored: false,
        },
      ],
    };

    const result = systemUnderTest["createLearningElementEntities"](
      42,
      [learningElementTO],
      worldStatusTO,
      LearningSpaceThemeType.Campus,
    );

    expect(result[0]!.id).toBe(42);
    expect(isValidLearningElementModelType(result[0]!.model)).toBe(true);
  });

  test("createLearningElementEntites creates no adaptivity entity if element is of incorrect transport object type", async () => {
    entityContainerMock.createEntity.mockImplementation((entity) => entity);

    const learningElementTO: BackendLearningElementTO = {
      id: 42,
      name: "testElement",
      value: 1,
      type: "h5p",
      description: "",
      model:
        LearningElementModelTypeEnums.ImageElementModelTypes.CardboardCutout,
      goals: [""],
    };
    const worldStatusTO: LearningWorldStatusTO = {
      worldID: 1,
      elements: [
        {
          elementID: 42,
          hasScored: false,
        },
      ],
    };

    systemUnderTest["createLearningElementEntities"](
      1,
      [learningElementTO],
      worldStatusTO,
      LearningSpaceThemeType.Campus,
    );
    expect(entityContainerMock.createEntity).toHaveBeenCalledTimes(1);
  });

  // ANF-ID: [EWE0001]
  test("createLearningElementEntites creates adaptivity entity if element is of correct transport object type", async () => {
    entityContainerMock.createEntity.mockImplementation((entity) => entity);

    const worldStatusTO: LearningWorldStatusTO = {
      worldID: 1,
      elements: [
        {
          elementID: 42,
          hasScored: false,
        },
      ],
    };

    systemUnderTest["createLearningElementEntities"](
      1,
      [backendAdaptivityElementTOMock],
      worldStatusTO,
      LearningSpaceThemeType.Campus,
    );
    expect(entityContainerMock.createEntity).toHaveBeenCalledTimes(2);
  });

  // ANF-ID: [EWE0001]
  test("createAdaptivityElementEntityd creates a adaptivity entity with correctly assigned values", () => {
    entityContainerMock.createEntity.mockImplementation((entity) => {
      return entity;
    });
    const learningElementEntity = {
      id: 1,
      value: 2,
      hasScored: true,
      name: "testName",
      description: "testDescription",
      goals: [],
      type: "h5p",
      model:
        LearningElementModelTypeEnums.ImageElementModelTypes.CardboardCutout,
      parentWorldID: 5,
    } as LearningElementEntity;

    const adapivityTO = {
      id: 4,
      elementName: "name",
      introText: "introText",
      model: learningElementEntity.model,
      tasks: [],
    } as AdaptivityElementDataTO;

    systemUnderTest["createAdaptivityElementEntity"](
      learningElementEntity,
      adapivityTO,
    );

    expect(entityContainerMock.createEntity).toHaveBeenCalledWith(
      {
        element: learningElementEntity,
        introText: adapivityTO.introText,
        tasks: [],
        elementName: adapivityTO.elementName,
        id: adapivityTO.id,
        model: adapivityTO.model,
      },
      AdaptivityElementEntity,
    );
  });
  test("filter world function filters correctly", async () => {
    // mock user data response
    entityContainerMock.getEntitiesOfType.mockReturnValue(
      mockedGetEntitiesOfTypeUserDataReturnValue,
    );

    const worldEntityMock = new LearningWorldEntity();
    worldEntityMock.name = minimalGetWorldDataResponse.worldName;
    worldEntityMock.goals = minimalGetWorldDataResponse.goals;
    worldEntityMock.id = 42;
    worldEntityMock.spaces = [];
    let filterResult;
    entityContainerMock.filterEntitiesOfType.mockImplementationOnce(
      (entityType, callback) => {
        filterResult = callback(worldEntityMock as LearningWorldEntity);
        return [worldEntityMock];
      },
    );
    // mock world response
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);

    // mock backend response
    backendMock.getWorldData.mockResolvedValueOnce(minimalGetWorldDataResponse);

    backendMock.getCoursesAvailableForUser.mockResolvedValue({
      courses: [
        {
          courseID: 1,
          courseName: "Testkurs",
        },
      ],
    });
    // mock entity creation
    const mockedWorldEntity = new LearningWorldEntity();
    mockedWorldEntity.name = minimalGetWorldDataResponse.worldName;
    mockedWorldEntity.goals = minimalGetWorldDataResponse.goals;
    mockedWorldEntity.spaces = [];

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningElementEntity>(),
    );
    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningSpaceEntity>(),
    );
    entityContainerMock.createEntity.mockReturnValueOnce(mockedWorldEntity);

    backendMock.getWorldStatus.mockResolvedValue({
      worldID: 1,
      elements: [{}],
    } as LearningWorldStatusTO);

    await systemUnderTest.executeAsync({ worldID: 42 });

    expect(filterResult).toBe(true);
  });
});
