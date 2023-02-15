import { mock } from "jest-mock-extended";
import SpaceScoreTO from "../../../../Core/Application/DataTransferObjects/SpaceScoreTO";
import ICalculateSpaceScoreUseCase from "../../../../Core/Application/UseCases/CalculateSpaceScore/ICalculateSpaceScoreUseCase";
import LoadSpaceUseCase from "../../../../Core/Application/UseCases/LoadSpace/LoadSpaceUseCase";
import ILoadWorldUseCase from "../../../../Core/Application/UseCases/LoadWorld/ILoadWorldUseCase";
import ISetCurrentUserLocationUseCase from "../../../../Core/Application/UseCases/SetCurrentUserLocation/ISetCurrentUserLocationUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import SpaceEntity from "../../../../Core/Domain/Entities/SpaceEntity";
import WorldEntity from "../../../../Core/Domain/Entities/WorldEntity";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import IWorldPort from "../../../../Core/Ports/WorldPort/IWorldPort";

const entityContainerMock = mock<IEntityContainer>();
const loadWorldMock = mock<ILoadWorldUseCase>();
const worldPortMock = mock<IWorldPort>();
const calculateSpaceScoreMock = mock<ICalculateSpaceScoreUseCase>();
const setCurrentUserLocationUseCaseMock =
  mock<ISetCurrentUserLocationUseCase>();

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
    CoreDIContainer.rebind<ICalculateSpaceScoreUseCase>(
      USECASE_TYPES.ICalculateSpaceScore
    ).toConstantValue(calculateSpaceScoreMock);
    CoreDIContainer.rebind<ISetCurrentUserLocationUseCase>(
      USECASE_TYPES.ISetCurrentUserLocationUseCase
    ).toConstantValue(setCurrentUserLocationUseCaseMock);
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
    worldEntity.worldID = 1;
    entityContainerMock.filterEntitiesOfType.mockReturnValue([worldEntity]);

    const spaceScoreTO: SpaceScoreTO = {
      currentScore: 0,
      requiredScore: 0,
      maxScore: 0,
      spaceID: 1,
    };
    calculateSpaceScoreMock.execute.mockReturnValue(spaceScoreTO);

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
    worldEntity.worldID = 2;
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([worldEntity]);

    const spaceScoreTO: SpaceScoreTO = {
      currentScore: 0,
      requiredScore: 0,
      maxScore: 0,
      spaceID: 1,
    };
    calculateSpaceScoreMock.execute.mockReturnValue(spaceScoreTO);

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
    worldEntity.worldID = 1;
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([worldEntity]);

    await expect(async () =>
      systemUnderTest.executeAsync({ spaceID: 2, worldID: 1 })
    ).rejects.toBe("SpaceEntity with 2 not found");
  });

  test("sets user location via SetCurrentUserLocationUseCase", async () => {
    const worldEntity: WorldEntity = new WorldEntity();
    worldEntity.spaces = [
      {
        id: 1,
        name: "Space 1",
      } as SpaceEntity,
    ];
    worldEntity.worldID = 1;
    entityContainerMock.filterEntitiesOfType.mockReturnValue([worldEntity]);

    const spaceScoreTO: SpaceScoreTO = {
      currentScore: 0,
      requiredScore: 0,
      maxScore: 0,
      spaceID: 1,
    };
    calculateSpaceScoreMock.execute.mockReturnValue(spaceScoreTO);

    await systemUnderTest.executeAsync({ spaceID: 1, worldID: 1 });

    expect(setCurrentUserLocationUseCaseMock.execute).toHaveBeenCalledWith({
      spaceID: 1,
      worldID: 1,
    });
  });
});
