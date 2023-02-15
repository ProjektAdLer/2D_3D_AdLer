import GetCurrentUserLocationUseCase from "../../../../Core/Application/UseCases/GetCurrentUserLocation/GetCurrentUserLocationUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import { mock } from "jest-mock-extended";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import { logger } from "../../../../../Lib/Logger";
import UserLocationTO from "../../../../Core/Application/DataTransferObjects/UserLocationTO";

const entityContainerMock = mock<IEntityContainer>();
jest.mock("../../../../../Lib/Logger");

describe("SetCurrentUserLocationUseCase", () => {
  let systemUnderTest: GetCurrentUserLocationUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entityContainerMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.IGetCurrentUserLocationUseCase
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("throws error when no user entity is present on the container", () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([]);

    expect(() => systemUnderTest.execute()).toThrowError(
      "User is not logged in, cannot get current location"
    );
  });

  test("throws error when user entity is present but user is not logged in", () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {
        isLoggedIn: false,
      },
    ]);

    expect(() => systemUnderTest.execute()).toThrowError();
  });

  test("throws error when world id is not set on the user entity", () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {
        isLoggedIn: true,
        currentSpaceID: 1,
      },
    ]);

    expect(() => systemUnderTest.execute()).toThrowError();
  });

  test("returns current world and space id from the user entity", () => {
    let userDataEntity = {
      isLoggedIn: true,
      currentWorldID: 1,
      currentSpaceID: 1,
    };
    entityContainerMock.getEntitiesOfType.mockReturnValue([userDataEntity]);

    let result = systemUnderTest.execute();

    expect(result).toMatchObject({
      worldID: 1,
      spaceID: 1,
    } as UserLocationTO);
  });
});
