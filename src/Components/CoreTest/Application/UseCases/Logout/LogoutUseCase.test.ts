import LogoutUseCase from "../../../../Core/Application/UseCases/Logout/LogoutUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import { mock } from "jest-mock-extended";

const entityContainerMock = mock<IEntityContainer>();

describe("LogoutUseCase", () => {
  let systemUnderTest: LogoutUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer,
    ).toConstantValue(entityContainerMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(USECASE_TYPES.ILogoutUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  // ANF-ID: [EZZ0002]
  test("deletes user entity, if user is logged in", () => {
    const userEntityMock = mock();
    entityContainerMock.getEntitiesOfType.mockReturnValue([userEntityMock]);

    systemUnderTest.execute();

    expect(entityContainerMock.deleteAll).toHaveBeenCalled();
  });

  test("returns without deleting user entity, if user is not logged in", () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([]);

    systemUnderTest.execute();

    expect(entityContainerMock.deleteAll).not.toHaveBeenCalled();
  });
});
