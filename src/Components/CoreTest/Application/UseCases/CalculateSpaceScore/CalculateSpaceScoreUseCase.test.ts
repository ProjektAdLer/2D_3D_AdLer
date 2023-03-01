import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import CalculateSpaceScoreUseCase from "../../../../Core/Application/UseCases/CalculateSpaceScore/CalculateSpaceScoreUseCase";
import SpaceEntity from "../../../../Core/Domain/Entities/SpaceEntity";
import { filterEntitiesOfTypeMockImplUtil } from "../../../TestUtils";
import IWorldPort from "../../../../Core/Ports/WorldPort/IWorldPort";
import SpaceScoreTO from "../../../../Core/Application/DataTransferObjects/SpaceScoreTO";

const worldPortMock = mock<IWorldPort>();
const entityContainerMock = mock<IEntityContainer>();

describe("Calculate Space Score UseCase", () => {
  let systemUnderTest: CalculateSpaceScoreUseCase;
  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
    CoreDIContainer.rebind(PORT_TYPES.IWorldPort).toConstantValue(
      worldPortMock
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(CalculateSpaceScoreUseCase);
  });

  test("filter Callback should return a boolean", () => {
    entityContainerMock.filterEntitiesOfType.mockImplementation(
      filterEntitiesOfTypeMockImplUtil([
        {
          id: 1,
          elements: [],
        },
      ])
    );

    systemUnderTest.execute(1);

    entityContainerMock.filterEntitiesOfType.mockReset();
  });

  test("should calculate the correct total space score", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
        elements: [
          {
            hasScored: true,
            value: 10,
          },
          {
            hasScored: true,
            value: 10,
          },
          {
            hasScored: false,
            value: 10,
          },
        ],
        requiredScore: 20,
      } as SpaceEntity,
    ]);

    const result = systemUnderTest.execute(1);

    expect(entityContainerMock.filterEntitiesOfType).toHaveBeenCalledWith(
      SpaceEntity,
      expect.any(Function)
    );
    expect(result).toMatchObject({
      currentScore: 20,
      requiredScore: 20,
      maxScore: 30,
      spaceID: 1,
    } as SpaceScoreTO);

    entityContainerMock.filterEntitiesOfType.mockReset();
  });

  test("should return 0 for each score when no Elements are present", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
        elements: [],
        description: "test",
        requiredScore: 0,
        name: "test",
        goals: "test",
        requirements: [],
        worldID: 200,
      } as SpaceEntity,
    ]);

    const result = systemUnderTest.execute(1);

    expect(result).toMatchObject({
      currentScore: 0,
      requiredScore: 0,
      maxScore: 0,
      spaceID: 1,
    } as SpaceScoreTO);

    entityContainerMock.filterEntitiesOfType.mockReset();
  });

  test("should call WorldPort.onSpaceScored", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
        elements: [],
        description: "test",
        requiredScore: 0,
        name: "test",
        goals: "test",
        requirements: [],
        worldID: 200,
      } as SpaceEntity,
    ]);

    systemUnderTest.execute(1);

    expect(worldPortMock.onSpaceScored).toHaveBeenCalledTimes(1);

    entityContainerMock.filterEntitiesOfType.mockReset();
  });

  test("should throw an error if the space is not found", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);

    expect(() => {
      systemUnderTest.execute(1);
    }).toThrow();
  });

  test("should throw an error if no space with given id can be found", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 42,
        elements: [],
      },
    ]);

    expect(() => {
      systemUnderTest.execute(1);
    }).toThrow();
  });
});
