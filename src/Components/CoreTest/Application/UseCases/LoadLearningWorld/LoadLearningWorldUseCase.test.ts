import { LearningElementModelTypeEnums } from "../../../../Core/Domain/LearningElementModels/LearningElementModelTypes";
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
import ILoadAvatarUseCase from "../../../../Core/Application/UseCases/LoadAvatar/ILoadAvatarUseCase";
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
import { BackendAdaptivityElementTO } from "../../../../Core/Application/DataTransferObjects/BackendElementTO";

const backendMock = mock<IBackendPort>();
const worldPortMock = mock<ILearningWorldPort>();
const entityContainerMock = mock<IEntityContainer>();
const notificationPortMock = mock<INotificationPort>();
const loadAvatarUsecaseMock = mock<ILoadAvatarUseCase>();
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
backendAdaptivityElementTOMock.model =
  LearningElementModelTypeEnums.QuizElementModelTypes.ArcadeNPC;
backendAdaptivityElementTOMock.adaptivity = {
  id: 1,
  elementName: "",
  introText: "",
  model: "a_npc_defaultnpc",
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
    },
  ],
  externalElements: [],
};

describe("LoadLearningWorldUseCase", () => {
  let systemUnderTest: LoadLearningWorldUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IBackendAdapter).toConstantValue(
      backendMock
    );
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock
    );
    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
    CoreDIContainer.rebind(PORT_TYPES.INotificationPort).toConstantValue(
      notificationPortMock
    );
    CoreDIContainer.rebind(USECASE_TYPES.ILoadAvatarUseCase).toConstantValue(
      loadAvatarUsecaseMock
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.ICalculateLearningSpaceScoreUseCase
    ).toConstantValue(calculateSpaceScoreUseCaseMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.ISetUserLocationUseCase
    ).toConstantValue(setUserLocationUseCaseMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.ICalculateLearningSpaceAvailabilityUseCase
    ).toConstantValue(calculateSpaceAvailabilityUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LoadLearningWorldUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("Detects, if a User is not logged in", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {
        isLoggedIn: false,
      },
    ]);

    await expect(systemUnderTest.executeAsync({ worldID: 42 })).rejects.toEqual(
      "User is not logged in"
    );

    expect(entityContainerMock.getEntitiesOfType).toHaveBeenCalledWith(
      UserDataEntity
    );

    expect(notificationPortMock.displayNotification).toHaveBeenCalledWith(
      "User is not logged in!",
      "error"
    );
  });

  test("Throws, if no User Entity is present", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([]);

    await expect(systemUnderTest.executeAsync({ worldID: 42 })).rejects.toEqual(
      "User is not logged in"
    );

    expect(entityContainerMock.getEntitiesOfType).toHaveBeenCalledWith(
      UserDataEntity
    );
  });

  test("Displays error, if User is not logged in", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {
        isLoggedIn: false,
      },
    ]);

    await expect(
      systemUnderTest.executeAsync({ worldID: 42 })
    ).rejects.not.toBeUndefined();

    expect(entityContainerMock.getEntitiesOfType).toHaveBeenCalledWith(
      UserDataEntity
    );

    expect(notificationPortMock.displayNotification).toHaveBeenCalledWith(
      "User is not logged in!",
      "error"
    );
  });

  test("Displays error, if World is not available", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce(
      mockedGetEntitiesOfTypeUserDataReturnValue
    );

    await expect(
      systemUnderTest.executeAsync({ worldID: 43 })
    ).rejects.not.toBeUndefined();

    expect(entityContainerMock.getEntitiesOfType).toHaveBeenCalledWith(
      UserDataEntity
    );

    expect(notificationPortMock.displayNotification).toHaveBeenCalledWith(
      "World is not available!",
      "error"
    );
  });

  test("doesn't load a World, if an entity is available", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce(
      mockedGetEntitiesOfTypeUserDataReturnValue
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

  test("loads the World and notifies port", async () => {
    // mock user data response
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce(
      mockedGetEntitiesOfTypeUserDataReturnValue
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
      mock<LearningElementEntity>()
    );
    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningSpaceEntity>()
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

  test("uses worldEntity if one is available", async () => {
    // mock user data response
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce(
      mockedGetEntitiesOfTypeUserDataReturnValue
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

  test("calls CalculateSpaceScoreUseCase for each space in the loaded world", async () => {
    // mock user data response
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce(
      mockedGetEntitiesOfTypeUserDataReturnValue
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
      calculateSpaceScoreUseCaseMock.internalExecute
    ).toHaveBeenCalledTimes(2);
  });

  test("calls CalculateSpaceAvailabilityUseCase for each space in the loaded world", async () => {
    // mock user data response
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce(
      mockedGetEntitiesOfTypeUserDataReturnValue
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
      calculateSpaceAvailabilityUseCaseMock.internalExecute
    ).toHaveBeenCalledTimes(2);
  });

  test("calls SetUserLocationUseCase", async () => {
    // mock user data response
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce(
      mockedGetEntitiesOfTypeUserDataReturnValue
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
      mock<LearningElementEntity>()
    );
    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningSpaceEntity>()
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
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce(
      mockedGetEntitiesOfTypeUserDataReturnValue
    );

    // mock world response
    const mockedWorldEntity = new LearningWorldEntity();
    mockedWorldEntity.name = minimalAdaptivityBackendWorldTO.worldName;
    mockedWorldEntity.goals = minimalAdaptivityBackendWorldTO.goals;
    mockedWorldEntity.spaces = [];
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);

    // mock backend response
    backendMock.getWorldData.mockResolvedValueOnce(
      minimalAdaptivityBackendWorldTO
    );

    backendMock.getWorldStatus.mockResolvedValue({
      worldID: 42,
      elements: [{}],
    } as LearningWorldStatusTO);

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningElementEntity>()
    );

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningSpaceEntity>()
    );

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<AdaptivityElementEntity>()
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
});
