import LoadUserWorldsUseCase from "../../../../Core/Application/UseCases/LoadUserWorlds/LoadUserWorldsUseCase";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import { mock } from "jest-mock-extended";
import IWorldPort from "../../../../Core/Ports/WorldPort/IWorldPort";
import UserDataEntity from "../../../../Core/Domain/Entities/UserDataEntity";
import UserWorldsEntity from "../../../../Core/Domain/Entities/UserWorldsEntity";
import IUIPort from "../../../../Core/Ports/UIPort/IUIPort";
import IBackend from "../../../../Core/Adapters/BackendAdapter/IBackendAdapter";

const backendMock = mock<IBackend>();
const worldPortMock = mock<IWorldPort>();
const uiPortMock = mock<IUIPort>();
const entityContainerMock = mock<IEntityContainer>();
const mockedGetEntitiesOfTypeUserDataReturnValue = [
  {
    isLoggedIn: true,
    userToken: "token",
  } as UserDataEntity,
];

describe("LoadUserWorldsUseCase", () => {
  let systemUnderTest: LoadUserWorldsUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind(PORT_TYPES.IUIPort).toConstantValue(uiPortMock);
    CoreDIContainer.rebind(PORT_TYPES.IWorldPort).toConstantValue(
      worldPortMock
    );
    CoreDIContainer.rebind(CORE_TYPES.IBackendAdapter).toConstantValue(
      backendMock
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LoadUserWorldsUseCase);
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

  test("doesn't load UserWorlds, if an entity is available", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce(
      mockedGetEntitiesOfTypeUserDataReturnValue
    );

    const mockedUserWorldsEntity = new UserWorldsEntity();
    mockedUserWorldsEntity.userToken = "testUserToken";
    mockedUserWorldsEntity.worldInfo = [];
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([
      mockedUserWorldsEntity,
    ]);

    await systemUnderTest.executeAsync();

    expect(entityContainerMock.createEntity).not.toHaveBeenCalled();
  });

  test("loads the UserWorlds and notifies its presenters", async () => {
    // mock user data response
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce(
      mockedGetEntitiesOfTypeUserDataReturnValue
    );
    // mock userWorlds response
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([]);

    // mock backend response
    backendMock.getCoursesAvailableForUser.mockResolvedValue({
      courses: [
        {
          courseId: 1,
          courseName: "Testkurs 1",
        },
        {
          courseId: 2,
          courseName: "Testkurs 2",
        },
      ],
    });

    await systemUnderTest.executeAsync();

    expect(worldPortMock.onUserWorldsLoaded).toHaveBeenCalledTimes(1);
  });
});
