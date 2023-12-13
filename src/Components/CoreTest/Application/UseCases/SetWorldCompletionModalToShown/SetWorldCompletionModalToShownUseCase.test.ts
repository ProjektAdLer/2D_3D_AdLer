import { mock, mockDeep } from "jest-mock-extended";
import SetWorldCompletionModalToShownUseCase from "../../../../Core/Application/UseCases/SetWorldCompletionModalToShown/SetWorldCompletionModalToShownUseCase";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import LearningWorldEntity from "../../../../Core/Domain/Entities/LearningWorldEntity";
import { LearningSpaceTemplateType } from "../../../../Core/Domain/Types/LearningSpaceTemplateType";
import { LearningSpaceThemeType } from "../../../../Core/Domain/Types/LearningSpaceThemeTypes";
import { ConstructorReference } from "../../../../Core/Types/EntityManagerTypes";

const entityContainerMock = mockDeep<IEntityContainer>();

describe("SetWorldCompletionModalToShownUseCase", () => {
  let systemUnderTest: SetWorldCompletionModalToShownUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entityContainerMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      SetWorldCompletionModalToShownUseCase
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("execute sets completionModalShown in worldEntity", () => {
    const worldEntity = {
      name: "worldEntity",
      id: 1,
      completionModalShown: false,
    } as Partial<LearningWorldEntity>;
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([worldEntity]);
    systemUnderTest.execute({ worldID: 1 });
    expect(worldEntity.completionModalShown).toBe(true);
  });

  test("Filter function filters the right world", () => {
    const worldEntity1 = {
      name: "worldEntity1",
      id: 1,
      completionModalShown: false,
    } as Partial<LearningWorldEntity>;
    const worldEntity2 = {
      name: "worldEntity2",
      id: 2,
      completionModalShown: false,
    } as Partial<LearningWorldEntity>;

    let testFilter;
    entityContainerMock.filterEntitiesOfType.mockImplementation(
      (
        entityType: ConstructorReference<object>,
        filter: (entity: object) => boolean
      ) => {
        testFilter = filter;
        return [worldEntity1];
      }
    );
    systemUnderTest.execute({ worldID: 1 });

    expect(testFilter(worldEntity1)).toBe(true);
    expect(testFilter(worldEntity2)).toBe(false);
  });
});
