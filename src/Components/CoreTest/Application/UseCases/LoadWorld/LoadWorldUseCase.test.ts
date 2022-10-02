import LoadWorldUseCase from "../../../../Core/Application/UseCases/LoadWorld/LoadWorldUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import IUIPort from "../../../../Core/Ports/UIPort/IUIPort";
import UserDataEntity from "../../../../Core/Domain/Entities/UserDataEntity";
import IWorldPort from "../../../../Core/Ports/WorldPort/IWorldPort";
import SpaceEntity from "../../../../Core/Domain/Entities/SpaceEntity";
import ElementEntity from "../../../../Core/Domain/Entities/ElementEntity";
import WorldEntity from "../../../../Core/Domain/Entities/WorldEntity";
import ILoadAvatarUseCase from "../../../../Core/Application/UseCases/LoadAvatar/ILoadAvatarUseCase";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IBackend from "../../../../Core/Adapters/BackendAdapter/IBackendAdapter";
import { minimalGetWorldDataResponse } from "../../../Adapters/BackendAdapter/BackendResponses";
import elementTO from "../../../../Core/Application/DataTransferObjects/ElementTO";

const backendMock = mock<IBackend>();
const worldPortMock = mock<IWorldPort>();
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
    CoreDIContainer.rebind(PORT_TYPES.IWorldPort).toConstantValue(
      worldPortMock
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

    expect(uiPortMock.displayNotification).toHaveBeenCalledWith(
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

    expect(uiPortMock.displayNotification).toHaveBeenCalledWith(
      "User is not logged in!",
      "error"
    );
  });

  test("doesn't load a World, if an entity is available", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce(
      mockedGetEntitiesOfTypeUserDataReturnValue
    );

    const mockedWorldEntity = new WorldEntity();
    mockedWorldEntity.worldName = minimalGetWorldDataResponse.worldName;
    mockedWorldEntity.worldGoal = minimalGetWorldDataResponse.worldGoal;
    mockedWorldEntity.spaces = [];
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([
      mockedWorldEntity,
    ]);

    await systemUnderTest.executeAsync();

    expect(entityContainerMock.createEntity).not.toHaveBeenCalled();
  });

  test("loads the World and notifies its presenters", async () => {
    // mock user data response
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce(
      mockedGetEntitiesOfTypeUserDataReturnValue
    );
    // mock world response
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([]);

    // mock backend response
    backendMock.getWorldData.mockResolvedValueOnce(minimalGetWorldDataResponse);

    backendMock.getCoursesAvailableForUser.mockResolvedValue({
      courses: [
        {
          courseId: 1,
          courseName: "Testkurs",
        },
      ],
    });

    // mock entity creation
    const mockedWorldEntity = new WorldEntity();
    mockedWorldEntity.worldName = minimalGetWorldDataResponse.worldName;
    mockedWorldEntity.worldGoal = minimalGetWorldDataResponse.worldGoal;
    mockedWorldEntity.spaces = [];

    entityContainerMock.createEntity.mockReturnValueOnce(mock<ElementEntity>());
    entityContainerMock.createEntity.mockReturnValueOnce(mock<SpaceEntity>());
    entityContainerMock.createEntity.mockReturnValueOnce(mockedWorldEntity);

    await systemUnderTest.executeAsync();

    expect(backendMock.getWorldData).toHaveBeenCalledTimes(1);
    expect(entityContainerMock.createEntity).toHaveBeenCalledTimes(3);
    expect(worldPortMock.presentWorld).toHaveBeenCalledTimes(1);
  });
});
