import GetUserLocationUseCase from "../../../../Core/Application/UseCases/GetUserLocation/GetUserLocationUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import { mock } from "jest-mock-extended";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import UserLocationTO from "../../../../Core/Application/DataTransferObjects/UserLocationTO";
import INotificationPort from "../../../../Core/Application/Ports/Interfaces/INotificationPort";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import Logger from "../../../../Core/Adapters/Logger/Logger";
import { IInternalGetLoginStatusUseCase } from "../../../../Core/Application/UseCases/GetLoginStatus/IGetLoginStatusUseCase";
import { get } from "http";

const entityContainerMock = mock<IEntityContainer>();
const notificationPortMock = mock<INotificationPort>();
const getLoginStatusUseCaseMock = mock<IInternalGetLoginStatusUseCase>();
const loggerMock = mock<Logger>();

describe("GetUserLocationUseCase", () => {
  let systemUnderTest: GetUserLocationUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer,
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind<INotificationPort>(
      PORT_TYPES.INotificationPort,
    ).toConstantValue(notificationPortMock);
    CoreDIContainer.rebind(CORE_TYPES.ILogger).toConstantValue(loggerMock);
    CoreDIContainer.rebind<IInternalGetLoginStatusUseCase>(
      USECASE_TYPES.IGetLoginStatusUseCase,
    ).toConstantValue(getLoginStatusUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.IGetUserLocationUseCase,
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("calls notificationPort with Error if user is not logged in", () => {
    getLoginStatusUseCaseMock.internalExecute.mockReturnValue({
      userName: "test",
      isLoggedIn: false,
    });
    systemUnderTest.execute();

    expect(notificationPortMock.onNotificationTriggered).toHaveBeenCalledTimes(
      1,
    );
    expect(notificationPortMock.onNotificationTriggered).toHaveBeenCalledWith(
      "ERROR",
      `GetUserLocationUseCase: User is not logged in!`,
      "User is not logged in!",
    );
  });

  // ANF-ID: [ELG0009]
  test("calls logger with a warning if world id is not set on the user entity", () => {
    getLoginStatusUseCaseMock.internalExecute.mockReturnValue({
      userName: "test",
      isLoggedIn: true,
    });
    let userDataEntity = {
      isLoggedIn: true,
      currentWorldID: undefined,
      currentSpaceID: 1,
    };

    entityContainerMock.getEntitiesOfType.mockReturnValue([userDataEntity]);

    systemUnderTest.execute();

    expect(loggerMock.log).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith(
      "WARN",
      "GetUserLocationUseCase: User is not in a world while trying to get location.",
    );
  });

  test("returns current world and space id from the user entity", () => {
    let userDataEntity = {
      isLoggedIn: true,
      currentWorldID: 1,
      currentSpaceID: 1,
    };
    getLoginStatusUseCaseMock.internalExecute.mockReturnValue({
      userName: "test",
      isLoggedIn: true,
    });
    entityContainerMock.getEntitiesOfType.mockReturnValue([userDataEntity]);

    let result = systemUnderTest.execute();

    expect(result).toMatchObject({
      worldID: 1,
      spaceID: 1,
    } as UserLocationTO);
  });
});
