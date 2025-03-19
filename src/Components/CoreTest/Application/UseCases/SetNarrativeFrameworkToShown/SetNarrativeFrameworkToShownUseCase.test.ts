import { mock, mockDeep } from "jest-mock-extended";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import SetNarrativeFrameworkToShownUseCase from "../../../../Core/Application/UseCases/SetNarrativeFrameworkToShown/SetNarrativeFrameworkToShownUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import GetUserLocationUseCase from "../../../../Core/Application/UseCases/GetUserLocation/GetUserLocationUseCase";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import LearningWorldEntity from "../../../../Core/Domain/Entities/LearningWorldEntity";
import { ConstructorReference } from "../../../../Core/Types/EntityManagerTypes";

const entityContainerMock = mockDeep<IEntityContainer>();
const getUserLocationUseCaseMock = mock<GetUserLocationUseCase>();

describe("SetNarrativeFrameworkToShownUseCase", () => {
  let systemUnderTest: SetNarrativeFrameworkToShownUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock,
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase,
    ).toConstantValue(getUserLocationUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      SetNarrativeFrameworkToShownUseCase,
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("execute sets narrativeFramework.shownBefore in worldEntity", () => {
    const worldEntity = {
      name: "worldEntity",
      id: 1,
      narrativeFramework: {
        shownBefore: false,
      },
    } as Partial<LearningWorldEntity>;
    getUserLocationUseCaseMock.execute.mockReturnValue({ worldID: 1 } as any);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([worldEntity]);
    systemUnderTest.execute();
    expect(worldEntity.narrativeFramework?.shownBefore).toBe(true);
  });

  test("Filter function filters the right world", () => {
    const worldEntity1 = {
      name: "worldEntity1",
      id: 1,
      narrativeFramework: {
        shownBefore: false,
      },
    } as Partial<LearningWorldEntity>;
    const worldEntity2 = {
      name: "worldEntity2",
      id: 2,
      narrativeFramework: {
        shownBefore: false,
      },
    } as Partial<LearningWorldEntity>;
    getUserLocationUseCaseMock.execute.mockReturnValue({ worldID: 1 } as any);

    let testFilter;
    entityContainerMock.filterEntitiesOfType.mockImplementation(
      (
        entityType: ConstructorReference<object>,
        filter: (entity: object) => boolean,
      ) => {
        testFilter = filter;
        return [worldEntity1];
      },
    );
    systemUnderTest.execute();

    expect(testFilter(worldEntity1)).toBe(true);
    expect(testFilter(worldEntity2)).toBe(false);
  });
});
