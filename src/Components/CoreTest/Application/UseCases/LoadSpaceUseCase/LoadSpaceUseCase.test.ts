import { mock } from "jest-mock-extended";
import SpaceScoreTO from "../../../../Core/Application/DataTransferObjects/SpaceScoreTO";
import ICalculateSpaceScoreUseCase, {
  IInternalCalculateSpaceScoreUseCase,
} from "../../../../Core/Application/UseCases/CalculateSpaceScore/ICalculateSpaceScoreUseCase";
import LoadSpaceUseCase from "../../../../Core/Application/UseCases/LoadSpace/LoadSpaceUseCase";
import ILoadWorldUseCase from "../../../../Core/Application/UseCases/LoadWorld/ILoadWorldUseCase";
import ISetUserLocationUseCase from "../../../../Core/Application/UseCases/SetUserLocation/ISetUserLocationUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import SpaceEntity from "../../../../Core/Domain/Entities/SpaceEntity";
import WorldEntity from "../../../../Core/Domain/Entities/WorldEntity";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import IWorldPort from "../../../../Core/Ports/WorldPort/IWorldPort";
import { ConstructorReference } from "../../../../Core/Types/EntityManagerTypes";

const entityContainerMock = mock<IEntityContainer>();
const loadWorldMock = mock<ILoadWorldUseCase>();
const worldPortMock = mock<IWorldPort>();
const calculateSpaceScoreMock = mock<IInternalCalculateSpaceScoreUseCase>();
const setUserLocationUseCaseMock = mock<ISetUserLocationUseCase>();

describe("LoadSpaceUseCase", () => {
  let systemUnderTest: LoadSpaceUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind<ILoadWorldUseCase>(
      USECASE_TYPES.ILoadWorldUseCase
    ).toConstantValue(loadWorldMock);
    CoreDIContainer.rebind<IWorldPort>(PORT_TYPES.IWorldPort).toConstantValue(
      worldPortMock
    );
    CoreDIContainer.rebind<IInternalCalculateSpaceScoreUseCase>(
      USECASE_TYPES.ICalculateSpaceScoreUseCase
    ).toConstantValue(calculateSpaceScoreMock);
    CoreDIContainer.rebind<ISetUserLocationUseCase>(
      USECASE_TYPES.ISetUserLocationUseCase
    ).toConstantValue(setUserLocationUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LoadSpaceUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should load space when World Entity is already present", async () => {
    const worldEntity: WorldEntity = new WorldEntity();
    worldEntity.spaces = [
      {
        id: 1,
        name: "Space 1",
      } as SpaceEntity,
    ];
    worldEntity.id = 1;
    entityContainerMock.filterEntitiesOfType.mockReturnValue([worldEntity]);

    const spaceScoreTO: SpaceScoreTO = {
      currentScore: 0,
      requiredScore: 0,
      maxScore: 0,
      spaceID: 1,
    };
    calculateSpaceScoreMock.internalExecute.mockReturnValue(spaceScoreTO);

    await systemUnderTest.executeAsync({ spaceID: 1, worldID: 1 });

    expect(worldPortMock.onSpaceLoaded).toHaveBeenCalledWith(
      expect.objectContaining(worldEntity.spaces[0])
    );
  });

  test("should load space when World Entity is not present", async () => {
    const worldEntity: WorldEntity = new WorldEntity();
    worldEntity.spaces = [
      {
        id: 1,
        name: "Space 1",
      } as SpaceEntity,
    ];
    worldEntity.id = 2;
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([worldEntity]);

    const spaceScoreTO: SpaceScoreTO = {
      currentScore: 0,
      requiredScore: 0,
      maxScore: 0,
      spaceID: 1,
    };
    calculateSpaceScoreMock.internalExecute.mockReturnValue(spaceScoreTO);

    await systemUnderTest.executeAsync({ spaceID: 1, worldID: 2 });

    expect(worldPortMock.onSpaceLoaded).toHaveBeenCalledWith(
      expect.objectContaining(worldEntity.spaces[0])
    );
  });

  test("should throw error when space is not found", async () => {
    const worldEntity: WorldEntity = new WorldEntity();
    worldEntity.spaces = [
      {
        id: 1,
        name: "Space 1",
      } as SpaceEntity,
    ];
    worldEntity.id = 1;
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([worldEntity]);

    await expect(async () =>
      systemUnderTest.executeAsync({ spaceID: 2, worldID: 1 })
    ).rejects.toBe("SpaceEntity with 2 not found");
  });

  test("sets user location via SetUserLocationUseCase", async () => {
    const worldEntity: WorldEntity = new WorldEntity();
    worldEntity.spaces = [
      {
        id: 1,
        name: "Space 1",
      } as SpaceEntity,
    ];
    worldEntity.id = 1;
    entityContainerMock.filterEntitiesOfType.mockReturnValue([worldEntity]);

    const spaceScoreTO: SpaceScoreTO = {
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

    systemUnderTest["getWorldEntity"](1);

    // @ts-ignore TS does not know about the mock
    expect(filterReturn).toBe(true);
  });
});
