import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import { filterEntitiesOfTypeMockImplUtil } from "../../../TestUtils";
import IWorldPort from "../../../../Core/Ports/WorldPort/IWorldPort";
import CalculateWorldScoreUseCase from "../../../../Core/Application/UseCases/CalculateWorldScore/CalculateWorldScoreUseCase";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import ICalculateSpaceScoreUseCase from "../../../../Core/Application/UseCases/CalculateSpaceScore/ICalculateSpaceScoreUseCase";
import WorldEntity from "../../../../Core/Domain/Entities/WorldEntity";
import WorldScoreTO from "../../../../Core/Application/DataTransferObjects/WorldScoreTO";

const worldPortMock = mock<IWorldPort>();
const entityContainerMock = mock<IEntityContainer>();
const calculateSpaceScoreMock = mock<ICalculateSpaceScoreUseCase>();

describe("Calculate World Score UseCase", () => {
  let systemUnderTest: CalculateWorldScoreUseCase;
  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
    CoreDIContainer.rebind(PORT_TYPES.IWorldPort).toConstantValue(
      worldPortMock
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.ICalculateSpaceScoreUseCase
    ).toConstantValue(calculateSpaceScoreMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(CalculateWorldScoreUseCase);
  });

  test("filter Callback should return a boolean", () => {
    entityContainerMock.filterEntitiesOfType.mockImplementation(
      filterEntitiesOfTypeMockImplUtil([
        {
          id: 1,
          spaces: [
            {
              id: 1,
            },
          ],
        },
      ])
    );
    calculateSpaceScoreMock.execute.mockReturnValueOnce({
      currentScore: 10,
      maxScore: 30,
      requiredScore: 20,
      spaceID: 1,
    });

    systemUnderTest.execute(1);

    entityContainerMock.filterEntitiesOfType.mockReset();
  });

  test("should calculate the correct total world score", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
        spaces: [
          {
            id: 1,
          },
          {
            id: 2,
          },
        ],
        name: "TestWorld",
        description: "TestWorldDescription",
        goal: "Testgoal",
      } as WorldEntity,
    ]);

    calculateSpaceScoreMock.execute.mockReturnValueOnce({
      currentScore: 10,
      maxScore: 30,
      requiredScore: 20,
      spaceID: 1,
    });
    calculateSpaceScoreMock.execute.mockReturnValueOnce({
      currentScore: 20,
      maxScore: 90,
      requiredScore: 40,
      spaceID: 2,
    });

    const result = systemUnderTest.execute(1);

    expect(entityContainerMock.filterEntitiesOfType).toHaveBeenCalledWith(
      WorldEntity,
      expect.any(Function)
    );
    expect(result).toMatchObject({
      currentScore: 30,
      requiredScore: 60,
      maxScore: 120,
      worldID: 1,
    } as WorldScoreTO);

    entityContainerMock.filterEntitiesOfType.mockReset();
  });

  test("should throw an error if the world is not found", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);

    expect(() => {
      systemUnderTest.execute(1);
    }).toThrow();
  });

  test("should throw an error if no world with given id can be found", () => {
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
