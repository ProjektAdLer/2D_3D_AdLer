import LoadWorldUseCase from "../../../Core/Application/LoadWorld/LoadWorldUseCase";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IEntityContainer from "../../../Core/Domain/EntityContainer/IEntityContainer";
import IUIPort from "../../../Core/Ports/UIPort/IUIPort";
import UserDataEntity from "../../../Core/Domain/Entities/UserDataEntity";
import ILearningWorldPort from "../../../Core/Ports/LearningWorldPort/ILearningWorldPort";
import LearningRoomEntity from "../../../Core/Domain/Entities/LearningRoomEntity";
import LearningElementEntity from "../../../Core/Domain/Entities/LearningElementEntity";
import LearningWorldEntity from "../../../Core/Domain/Entities/LearningWorldEntity";
import ILoadAvatarUseCase from "../../../Core/Application/LoadAvatar/ILoadAvatarUseCase";
import USECASE_TYPES from "../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IBackend from "../../../Core/Adapters/BackendAdapter/IBackendAdapter";
import { minimalGetLearningWorldDataResponse } from "../../Adapters/BackendAdapter/BackendResponses";
import { mapLearningElementInputAndExpected } from "./LoadWorldMockedObjects";
import LearningElementTO from "../../../Core/Application/DataTransportObjects/LearningElementTO";

const backendMock = mock<IBackend>();
const learningWorldPortMock = mock<ILearningWorldPort>();
const entityContainerMock = mock<IEntityContainer>();
const uiPortMock = mock<IUIPort>();
const loadAvatarUsecaseMock = mock<ILoadAvatarUseCase>();

// mock structuredClone
global.structuredClone = jest.fn((val) => JSON.parse(JSON.stringify(val)));

const mockedGetEntitiesOfTypeUserDataReturnValue = [
  {
    isLoggedIn: true,
    userToken: "token",
  } as UserDataEntity,
];

describe("LoadWorldUseCase", () => {
  let systemUnderTest: LoadWorldUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IBackendAdapter).toConstantValue(
      backendMock
    );
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      learningWorldPortMock
    );
    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
    CoreDIContainer.rebind(PORT_TYPES.IUIPort).toConstantValue(uiPortMock);
    CoreDIContainer.rebind(USECASE_TYPES.ILoadAvatarUseCase).toConstantValue(
      loadAvatarUsecaseMock
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LoadWorldUseCase);
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

    await expect(systemUnderTest.executeAsync()).rejects.toEqual(
      "User is not logged in"
    );

    expect(entityContainerMock.getEntitiesOfType).toHaveBeenCalledWith(
      UserDataEntity
    );

    expect(uiPortMock.displayModal).toHaveBeenCalledWith(
      "User is not logged in!",
      "error"
    );
  });

  test("Throws, if no User Entity is present", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([]);

    await expect(systemUnderTest.executeAsync()).rejects.toEqual(
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

    await expect(systemUnderTest.executeAsync()).rejects.not.toBeUndefined();

    expect(entityContainerMock.getEntitiesOfType).toHaveBeenCalledWith(
      UserDataEntity
    );

    expect(uiPortMock.displayModal).toHaveBeenCalledWith(
      "User is not logged in!",
      "error"
    );
  });

  test("doesn't load a Learning World, if a entity is available", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce(
      mockedGetEntitiesOfTypeUserDataReturnValue
    );

    const mockedLearningWorldEntity = new LearningWorldEntity();
    mockedLearningWorldEntity.worldName =
      minimalGetLearningWorldDataResponse.worldName;
    mockedLearningWorldEntity.worldGoal =
      minimalGetLearningWorldDataResponse.worldGoal;
    mockedLearningWorldEntity.learningRooms = [];
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([
      mockedLearningWorldEntity,
    ]);

    await systemUnderTest.executeAsync();

    expect(entityContainerMock.createEntity).not.toHaveBeenCalled();
  });

  test("loads the Learning World and notifies its presenters", async () => {
    // mock user data response
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce(
      mockedGetEntitiesOfTypeUserDataReturnValue
    );
    // mock learning world response
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([]);

    // mock backend response
    backendMock.getLearningWorldData.mockResolvedValueOnce(
      minimalGetLearningWorldDataResponse
    );

    // mock entity creation
    const mockedLearningWorldEntity = new LearningWorldEntity();
    mockedLearningWorldEntity.worldName =
      minimalGetLearningWorldDataResponse.worldName;
    mockedLearningWorldEntity.worldGoal =
      minimalGetLearningWorldDataResponse.worldGoal;
    mockedLearningWorldEntity.learningRooms = [];

    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningElementEntity>()
    );
    entityContainerMock.createEntity.mockReturnValueOnce(
      mock<LearningRoomEntity>()
    );
    entityContainerMock.createEntity.mockReturnValueOnce(
      mockedLearningWorldEntity
    );

    await systemUnderTest.executeAsync();

    expect(backendMock.getLearningWorldData).toHaveBeenCalledTimes(1);
    expect(entityContainerMock.createEntity).toHaveBeenCalledTimes(3);
    expect(learningWorldPortMock.presentLearningWorld).toHaveBeenCalledTimes(1);
  });

  test.each(mapLearningElementInputAndExpected)(
    "mapLearningElement maps LearningElementTO to LearningElementEntity for %s",
    (
      _text: string,
      i: LearningElementTO,
      e: Partial<LearningElementEntity>
    ) => {
      systemUnderTest["mapLearningElement"](i);

      expect(entityContainerMock.createEntity).toHaveBeenCalledWith(
        e,
        LearningElementEntity
      );
    }
  );
});
