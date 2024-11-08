import SetUserLocationUseCase from "../../../../Core/Application/UseCases/SetUserLocation/SetUserLocationUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import { mock } from "jest-mock-extended";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import Logger from "../../../../Core/Adapters/Logger/Logger";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";
import { IInternalGetLoginStatusUseCase } from "../../../../Core/Application/UseCases/GetLoginStatus/IGetLoginStatusUseCase";

const entityContainerMock = mock<IEntityContainer>();
const getLoginStatusUseCaseMock = mock<IInternalGetLoginStatusUseCase>();
const loggerMock = jest.spyOn(Logger.prototype, "log");

describe("SetUserLocationUseCase", () => {
  let systemUnderTest: SetUserLocationUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer,
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind<IInternalGetLoginStatusUseCase>(
      USECASE_TYPES.IGetLoginStatusUseCase,
    ).toConstantValue(getLoginStatusUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.ISetUserLocationUseCase,
    );
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("logs warning when user entity is present but user is not logged in", () => {
    getLoginStatusUseCaseMock.internalExecute.mockReturnValue({
      isLoggedIn: false,
      userName: "test",
    });

    systemUnderTest.execute({ worldID: 1, spaceID: 1 });

    expect(loggerMock).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      "SetUserLocationUseCase: User is not logged in, cannot set current location",
    );
  });

  //ANF-ID: [ELG0006, ELG0007, ELG0002, ELG0003]
  test("sets current world and space id on user entity", () => {
    let userDataEntity = {
      isLoggedIn: true,
      currentWorldID: 0,
      currentSpaceID: 0,
    };
    getLoginStatusUseCaseMock.internalExecute.mockReturnValue({
      isLoggedIn: true,
      userName: "test",
    });

    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([userDataEntity]);
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([
      { name: "world", id: 1, lastVisitedSpaceID: undefined },
    ]);

    systemUnderTest.execute({ worldID: 1, spaceID: 1 });

    expect(userDataEntity).toMatchObject({
      currentWorldID: 1,
      currentSpaceID: 1,
    });
  });

  //ANF-ID: [ELG0006, ELG0007, ELG0002, ELG0003]
  test("sets current world and space id to undefined on user entity when none are given", () => {
    let userDataEntity = {
      isLoggedIn: true,
      currentWorldID: 0,
      currentSpaceID: 0,
      lastVisitedSpaceID: 0,
    };
    getLoginStatusUseCaseMock.internalExecute.mockReturnValue({
      isLoggedIn: true,
      userName: "test",
    });
    entityContainerMock.getEntitiesOfType.mockReturnValue([userDataEntity]);

    systemUnderTest.execute({});

    expect(userDataEntity).toMatchObject({
      currentWorldID: undefined,
      currentSpaceID: undefined,
    });
  });
});
