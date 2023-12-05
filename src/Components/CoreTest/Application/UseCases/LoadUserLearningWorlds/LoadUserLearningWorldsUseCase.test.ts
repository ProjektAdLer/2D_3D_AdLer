import LoadUserInitialLearningWorldsInfoUseCase from "../../../../Core/Application/UseCases/LoadUserInitialLearningWorldsInfo/LoadUserInitialLearningWorldsInfoUseCase";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import { mock } from "jest-mock-extended";
import UserDataEntity from "../../../../Core/Domain/Entities/UserDataEntity";
import IBackendPort from "../../../../Core/Application/Ports/Interfaces/IBackendPort";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import INotificationPort from "../../../../Core/Application/Ports/Interfaces/INotificationPort";

const backendMock = mock<IBackendPort>();
const worldPortMock = mock<ILearningWorldPort>();
const notificationPortMock = mock<INotificationPort>();
const entityContainerMock = mock<IEntityContainer>();

describe("LoadUserWorldsUseCase", () => {
  let systemUnderTest: LoadUserInitialLearningWorldsInfoUseCase;

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
    CoreDIContainer.rebind(CORE_TYPES.IBackendAdapter).toConstantValue(
      backendMock
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      LoadUserInitialLearningWorldsInfoUseCase
    );
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

    expect(notificationPortMock.displayNotification).toHaveBeenCalledWith(
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

    expect(notificationPortMock.displayNotification).toHaveBeenCalledWith(
      "User is not logged in!",
      "error"
    );
  });

  test("doesn't load UserInitialLearningWorldsInfo, if an entity is available", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([
      {
        isLoggedIn: true,
        userToken: "token",
        username: "username",
        availableWorlds: [
          {
            worldID: 1,
            worldName: "Testwelt 1",
          },
        ],
      } as UserDataEntity,
    ]);

    await systemUnderTest.executeAsync();

    expect(entityContainerMock.createEntity).not.toHaveBeenCalled();
  });

  test("loads the UserInitialLearningWorldsInfo and notifies its presenters", async () => {
    // mock user data response
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([
      {
        isLoggedIn: true,
        userToken: "token",
        username: "username",
        availableWorlds: [],
      } as Partial<UserDataEntity>,
    ]);

    // mock backend response
    backendMock.getCoursesAvailableForUser.mockResolvedValue({
      courses: [
        {
          courseID: 1,
          courseName: "Testkurs 1",
        },
        {
          courseID: 2,
          courseName: "Testkurs 2",
        },
      ],
    });

    await systemUnderTest.executeAsync();

    expect(
      worldPortMock.onUserInitialLearningWorldsInfoLoaded
    ).toHaveBeenCalledTimes(1);
  });
});
