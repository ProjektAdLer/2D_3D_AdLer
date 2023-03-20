import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import { filterEntitiesOfTypeMockImplUtil } from "../../../TestUtils";
import CalculateWorldScoreUseCase from "../../../../Core/Application/UseCases/CalculateWorldScore/CalculateWorldScoreUseCase";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import { IInternalCalculateSpaceScoreUseCase } from "../../../../Core/Application/UseCases/CalculateSpaceScore/ICalculateSpaceScoreUseCase";
import WorldEntity from "../../../../Core/Domain/Entities/WorldEntity";
import WorldScoreTO from "../../../../Core/Application/DataTransferObjects/WorldScoreTO";
import IGetUserLocationUseCase from "../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import UserLocationTO from "../../../../Core/Application/DataTransferObjects/UserLocationTO";
import SpaceScoreTO from "../../../../Core/Application/DataTransferObjects/SpaceScoreTO";
import IWorldPort from "../../../../Core/Application/Ports/Interfaces/IWorldPort";

const worldPortMock = mock<IWorldPort>();
const entityContainerMock = mock<IEntityContainer>();
const calculateSpaceScoreMock = mock<IInternalCalculateSpaceScoreUseCase>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();

const userLocationTO: UserLocationTO = {
  worldID: 1,
  spaceID: 1,
};

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
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase
    ).toConstantValue(getUserLocationUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(CalculateWorldScoreUseCase);
  });

  test("filter Callback should return a boolean", () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce(userLocationTO);
    entityContainerMock.filterEntitiesOfType.mockImplementationOnce(
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
    calculateSpaceScoreMock.internalExecute.mockReturnValueOnce({
      currentScore: 10,
      maxScore: 30,
      requiredScore: 20,
      spaceID: 1,
    } as SpaceScoreTO);

    systemUnderTest.execute();

    entityContainerMock.filterEntitiesOfType.mockReset();
  });

  test("should calculate the correct total world score", () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce(userLocationTO);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
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
        goals: "Testgoal",
      } as WorldEntity,
    ]);

    calculateSpaceScoreMock.internalExecute.mockReturnValueOnce({
      currentScore: 10,
      maxScore: 30,
      requiredScore: 20,
      spaceID: 1,
    } as SpaceScoreTO);
    calculateSpaceScoreMock.internalExecute.mockReturnValueOnce({
      currentScore: 20,
      maxScore: 90,
      requiredScore: 40,
      spaceID: 2,
    } as SpaceScoreTO);

    const result = systemUnderTest.execute();

    expect(worldPortMock.onWorldScored).toHaveBeenCalledWith({
      currentScore: 30,
      requiredScore: 60,
      maxScore: 120,
      worldID: 1,
    } as WorldScoreTO);

    entityContainerMock.filterEntitiesOfType.mockReset();
  });

  test("should throw an error if the world is not found", () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce(userLocationTO);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);

    expect(() => {
      systemUnderTest.execute();
    }).toThrow();
  });

  test("should throw an error if no world with given id can be found", () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce(userLocationTO);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {
        id: 42,
        elements: [],
      },
    ]);

    expect(() => {
      systemUnderTest.execute();
    }).toThrow();
  });

  test("should throw an error if the user location doesn't contain a worldID", () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce(
      {} as UserLocationTO
    );

    expect(() => {
      systemUnderTest.execute();
    }).toThrow();
  });
});
