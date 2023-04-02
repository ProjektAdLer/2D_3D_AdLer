import { mock } from "jest-mock-extended";
import LearningSpaceScoreTO from "../../../../Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import ICalculateLearningSpaceScoreUseCase, {
  IInternalCalculateLearningSpaceScoreUseCase,
} from "../../../../Core/Application/UseCases/CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import LoadLearningSpaceUseCase from "../../../../Core/Application/UseCases/LoadLearningSpace/LoadLearningSpaceUseCase";
import ILoadLearningWorldUseCase from "../../../../Core/Application/UseCases/LoadLearningWorld/ILoadLearningWorldUseCase";
import ISetUserLocationUseCase from "../../../../Core/Application/UseCases/SetUserLocation/ISetUserLocationUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import LearningSpaceEntity from "../../../../Core/Domain/Entities/LearningSpaceEntity";
import LearningWorldEntity from "../../../../Core/Domain/Entities/LearningWorldEntity";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import { ConstructorReference } from "../../../../Core/Types/EntityManagerTypes";

const entityContainerMock = mock<IEntityContainer>();
const loadWorldMock = mock<ILoadLearningWorldUseCase>();
const worldPortMock = mock<ILearningWorldPort>();
const calculateSpaceScoreMock =
  mock<IInternalCalculateLearningSpaceScoreUseCase>();
const setUserLocationUseCaseMock = mock<ISetUserLocationUseCase>();

describe("LoadSpaceUseCase", () => {
  let systemUnderTest: LoadLearningSpaceUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind<ILoadLearningWorldUseCase>(
      USECASE_TYPES.ILoadLearningWorldUseCase
    ).toConstantValue(loadWorldMock);
    CoreDIContainer.rebind<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).toConstantValue(worldPortMock);
    CoreDIContainer.rebind<IInternalCalculateLearningSpaceScoreUseCase>(
      USECASE_TYPES.ICalculateLearningSpaceScoreUseCase
    ).toConstantValue(calculateSpaceScoreMock);
    CoreDIContainer.rebind<ISetUserLocationUseCase>(
      USECASE_TYPES.ISetUserLocationUseCase
    ).toConstantValue(setUserLocationUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LoadLearningSpaceUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should load learningspace when LearningWorld Entity is already present", async () => {
    const worldEntity: LearningWorldEntity = new LearningWorldEntity();
    worldEntity.spaces = [
      {
        id: 1,
        name: "Space 1",
      } as LearningSpaceEntity,
    ];
    worldEntity.id = 1;
    entityContainerMock.filterEntitiesOfType.mockReturnValue([worldEntity]);

    const spaceScoreTO: LearningSpaceScoreTO = {
      currentScore: 0,
      requiredScore: 0,
      maxScore: 0,
      spaceID: 1,
    };
    calculateSpaceScoreMock.internalExecute.mockReturnValue(spaceScoreTO);

    await systemUnderTest.executeAsync({ spaceID: 1, worldID: 1 });

    expect(worldPortMock.onLearningSpaceLoaded).toHaveBeenCalledWith(
      expect.objectContaining(worldEntity.spaces[0])
    );
  });

  test("should load space when World Entity is not present", async () => {
    const worldEntity: LearningWorldEntity = new LearningWorldEntity();
    worldEntity.spaces = [
      {
        id: 1,
        name: "Space 1",
      } as LearningSpaceEntity,
    ];
    worldEntity.id = 2;
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([worldEntity]);

    const spaceScoreTO: LearningSpaceScoreTO = {
      currentScore: 0,
      requiredScore: 0,
      maxScore: 0,
      spaceID: 1,
    };
    calculateSpaceScoreMock.internalExecute.mockReturnValue(spaceScoreTO);

    await systemUnderTest.executeAsync({ spaceID: 1, worldID: 2 });

    expect(worldPortMock.onLearningSpaceLoaded).toHaveBeenCalledWith(
      expect.objectContaining(worldEntity.spaces[0])
    );
  });

  test("should throw error when space is not found", async () => {
    const worldEntity: LearningWorldEntity = new LearningWorldEntity();
    worldEntity.spaces = [
      {
        id: 1,
        name: "Space 1",
      } as LearningSpaceEntity,
    ];
    worldEntity.id = 1;
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([worldEntity]);

    await expect(async () =>
      systemUnderTest.executeAsync({ spaceID: 2, worldID: 1 })
    ).rejects.toBe("SpaceEntity with 2 not found");
  });

  test("sets user location via SetUserLocationUseCase", async () => {
    const worldEntity: LearningWorldEntity = new LearningWorldEntity();
    worldEntity.spaces = [
      {
        id: 1,
        name: "Space 1",
      } as LearningSpaceEntity,
    ];
    worldEntity.id = 1;
    entityContainerMock.filterEntitiesOfType.mockReturnValue([worldEntity]);

    const spaceScoreTO: LearningSpaceScoreTO = {
      currentScore: 0,
      requiredScore: 0,
      maxScore: 0,
      spaceID: 1,
    };
    calculateSpaceScoreMock.internalExecute.mockReturnValue(spaceScoreTO);

    await systemUnderTest.executeAsync({ spaceID: 1, worldID: 1 });

    expect(setUserLocationUseCaseMock.execute).toHaveBeenCalledWith({
      spaceID: 1,
      worldID: 1,
    });
  });

  test("getWorldEntity should return true for matching worldIDs", async () => {
    let filterReturn: boolean;
    entityContainerMock.filterEntitiesOfType.mockImplementationOnce(
      <T>(
        entityType: ConstructorReference<T>,
        filter: (entity: T) => boolean
      ) => {
        let entity = new entityType();
        //@ts-ignore entityType is allways WorldEntity and has a worldID
        entity.id = 1;

        filterReturn = filter(entity);
        return [{}];
      }
    );

    systemUnderTest["getLearningWorldEntity"](1);

    // @ts-ignore TS does not know about the mock
    expect(filterReturn).toBe(true);
  });
});
