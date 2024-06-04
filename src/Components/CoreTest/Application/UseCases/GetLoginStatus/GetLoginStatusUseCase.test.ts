import { mock } from "jest-mock-extended";
import INotificationPort from "../../../../Core/Application/Ports/Interfaces/INotificationPort";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import UserDataEntity from "../../../../Core/Domain/Entities/UserDataEntity";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import GetLoginStatusUseCase from "../../../../Core/Application/UseCases/GetLoginStatus/GetLoginStatusUseCase";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

const entityContainerMock = mock<IEntityContainer>();
const notificationPortMock = mock<INotificationPort>();

describe("GetLoginStatus", () => {
  let systemUnderTest: GetLoginStatusUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
    CoreDIContainer.rebind(PORT_TYPES.INotificationPort).toConstantValue(
      notificationPortMock
    );
  });
  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(USECASE_TYPES.IGetLoginStatusUseCase);
  });
  afterAll(() => {
    CoreDIContainer.restore();
  });

  //ANF-ID: [EWE0021]
  test("InternalExecute: Detects, if a User is not logged in", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {
        isLoggedIn: false,
      },
    ]);

    expect(systemUnderTest.internalExecute()).toMatchObject({
      isLoggedIn: false,
      userName: undefined,
    });
    expect(entityContainerMock.getEntitiesOfType).toHaveBeenCalledWith(
      UserDataEntity
    );
    expect(notificationPortMock.displayNotification).toHaveBeenCalledWith(
      "User is not logged in!",
      "error"
    );
  });

  //ANF-ID: [EWE0021]
  test("InternalExecute: Throws, if no User Entity is present", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([]);

    expect(systemUnderTest.internalExecute()).toMatchObject({
      isLoggedIn: false,
      userName: undefined,
    });
    expect(entityContainerMock.getEntitiesOfType).toHaveBeenCalledWith(
      UserDataEntity
    );
    expect(notificationPortMock.displayNotification).toHaveBeenCalledWith(
      "User is not logged in!",
      "error"
    );
  });

  //ANF-ID: [EWE0021]
  test("InternalExecute: Returns true if User Entity is present", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {
        isLoggedIn: true,
      },
    ]);

    expect(systemUnderTest.internalExecute()).toMatchObject({
      isLoggedIn: true,
      userName: undefined,
    });
    expect(entityContainerMock.getEntitiesOfType).toHaveBeenCalledWith(
      UserDataEntity
    );
  });
  test("Execute: Returns LoginStatusTO", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {
        isLoggedIn: true,
        username: "test",
      },
    ]);

    const result = systemUnderTest.execute();
    expect(result).toMatchObject({
      isLoggedIn: true,
      userName: "test",
    });
    expect(entityContainerMock.getEntitiesOfType).toHaveBeenCalledWith(
      UserDataEntity
    );
  });
  test("Execute: Returns LoginStatusTO when not logged in", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {
        isLoggedIn: false,
      },
    ]);

    const result = systemUnderTest.execute();
    expect(result).toMatchObject({
      isLoggedIn: false,
      userName: undefined,
    });
    expect(entityContainerMock.getEntitiesOfType).toHaveBeenCalledWith(
      UserDataEntity
    );
  });
  test("Execute: Returns LoginStatusTO when no Entityobject is found", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([]);

    const result = systemUnderTest.execute();
    expect(result).toMatchObject({
      isLoggedIn: false,
      userName: undefined,
    });
    expect(entityContainerMock.getEntitiesOfType).toHaveBeenCalledWith(
      UserDataEntity
    );
  });
});
