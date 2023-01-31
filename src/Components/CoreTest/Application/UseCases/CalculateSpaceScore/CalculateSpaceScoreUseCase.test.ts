import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import CalculateSpaceScoreUseCase from "../../../../Core/Application/UseCases/CalculateSpaceScore/CalculateSpaceScoreUseCase";
import SpaceEntity from "../../../../Core/Domain/Entities/SpaceEntity";
import { filterEntitiesOfTypeMockImplUtil } from "../../../TestUtils";
import ISpacePort from "../../../../Core/Ports/SpacePort/ISpacePort";

const spacePortMock = mock<ISpacePort>();
const entityContainerMock = mock<IEntityContainer>();

describe("Calculate Space Score UseCase", () => {
  let systemUnderTest: CalculateSpaceScoreUseCase;
  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );

    CoreDIContainer.rebind(PORT_TYPES.ISpacePort).toConstantValue(
      spacePortMock
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
        requiredPoints: 20,
      } as SpaceEntity,
    ]);

    systemUnderTest.execute(1);

    expect(entityContainerMock.filterEntitiesOfType).toHaveBeenCalledWith(
      SpaceEntity,
      expect.any(Function)
    );

    expect(spacePortMock.onScoreChanged).toHaveBeenCalledWith(20, 20, 30, 1);
  });

  test("should return 0 and false when no Elements are present", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
        elements: [],
        description: "test",
        requiredPoints: 0,
        name: "test",
        goals: "test",
        requirements: [],
      } as SpaceEntity,
    ]);

    systemUnderTest.execute(1);

    expect(spacePortMock.onScoreChanged).toHaveBeenCalledWith(0, 0, 0, 1);
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
