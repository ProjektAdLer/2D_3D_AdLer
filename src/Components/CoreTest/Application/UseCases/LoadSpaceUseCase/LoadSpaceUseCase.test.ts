import { mock } from "jest-mock-extended";
import SpaceScoreTO from "../../../../Core/Application/DataTransferObjects/SpaceScoreTO";
import ICalculateSpaceScoreUseCase from "../../../../Core/Application/UseCases/CalculateSpaceScore/ICalculateSpaceScoreUseCase";
import LoadSpaceUseCase from "../../../../Core/Application/UseCases/LoadSpace/LoadSpaceUseCase";
import ILoadWorldUseCase from "../../../../Core/Application/UseCases/LoadWorld/ILoadWorldUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import SpaceEntity from "../../../../Core/Domain/Entities/SpaceEntity";
import WorldEntity from "../../../../Core/Domain/Entities/WorldEntity";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import ISpacePort from "../../../../Core/Ports/SpacePort/ISpacePort";
import IUIPort from "../../../../Core/Ports/UIPort/IUIPort";

const entityContainerMock = mock<IEntityContainer>();
const loadWorldMock = mock<ILoadWorldUseCase>();
const spacePortMock = mock<ISpacePort>();
const calculateSpaceScoreMock = mock<ICalculateSpaceScoreUseCase>();

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
    CoreDIContainer.rebind<ISpacePort>(PORT_TYPES.ISpacePort).toConstantValue(
      spacePortMock
    );
    CoreDIContainer.rebind<ICalculateSpaceScoreUseCase>(
      USECASE_TYPES.ICalculateSpaceScore
    ).toConstantValue(calculateSpaceScoreMock);

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
    entityContainerMock.getEntitiesOfType.mockReturnValue([worldEntity]);

    const spaceScoreTO: SpaceScoreTO = {
      currentScore: 0,
      requiredScore: 0,
      maxScore: 0,
      spaceID: 1,
    };
    calculateSpaceScoreMock.execute.mockReturnValue(spaceScoreTO);

    await systemUnderTest.executeAsync(1);

    expect(spacePortMock.onSpaceLoaded).toHaveBeenCalledWith(
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
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([]);
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([worldEntity]);

    const spaceScoreTO: SpaceScoreTO = {
      currentScore: 0,
      requiredScore: 0,
      maxScore: 0,
      spaceID: 1,
    };
    calculateSpaceScoreMock.execute.mockReturnValue(spaceScoreTO);

    await systemUnderTest.executeAsync(1);

    expect(spacePortMock.onSpaceLoaded).toHaveBeenCalledWith(
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
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([worldEntity]);

    await expect(async () => systemUnderTest.executeAsync(2)).rejects.toBe(
      "SpaceEntity with 2 not found"
    );
  });
});