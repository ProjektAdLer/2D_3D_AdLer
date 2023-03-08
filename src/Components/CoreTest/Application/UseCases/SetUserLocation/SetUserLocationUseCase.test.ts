import SetUserLocationUseCase from "../../../../Core/Application/UseCases/SetUserLocation/SetUserLocationUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import { mock } from "jest-mock-extended";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import { logger } from "../../../../../Lib/Logger";

const entityContainerMock = mock<IEntityContainer>();
jest.mock("../../../../../Lib/Logger");

describe("SetUserLocationUseCase", () => {
  let systemUnderTest: SetUserLocationUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entityContainerMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.ISetUserLocationUseCase
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("throws error when no user entity is present on the container", () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([]);
    systemUnderTest.execute({ worldID: 1, spaceID: 1 });

    expect(logger.error).toHaveBeenCalledWith(
      "User is not logged in, cannot set current location"
    );
  });

  test("throws error when user entity is present but user is not logged in", () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {
        isLoggedIn: false,
      },
    ]);

    systemUnderTest.execute({ worldID: 1, spaceID: 1 });

    expect(logger.error).toHaveBeenCalledWith(
      "User is not logged in, cannot set current location"
    );
  });

  test("sets current world and space id on user entity", () => {
    let userDataEntity = {
      isLoggedIn: true,
      currentWorldID: 0,
      currentSpaceID: 0,
    };
    entityContainerMock.getEntitiesOfType.mockReturnValue([userDataEntity]);

    systemUnderTest.execute({ worldID: 1, spaceID: 1 });

    expect(userDataEntity).toMatchObject({
      currentWorldID: 1,
      currentSpaceID: 1,
    });
  });

  test("sets current world and space id to undefined on user entity when none are given", () => {
    let userDataEntity = {
      isLoggedIn: true,
      currentWorldID: 0,
      currentSpaceID: 0,
    };
    entityContainerMock.getEntitiesOfType.mockReturnValue([userDataEntity]);

    systemUnderTest.execute({});

    expect(userDataEntity).toMatchObject({
      currentWorldID: undefined,
      currentSpaceID: undefined,
    });
  });
});
