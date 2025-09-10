import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import { filterEntitiesOfTypeMockImplUtil } from "../../../TestUtils";
import CalculateLearningWorldScoreUseCase from "../../../../Core/Application/UseCases/CalculateLearningWorldScore/CalculateLearningWorldScoreUseCase";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import { IInternalCalculateLearningSpaceScoreUseCase } from "../../../../Core/Application/UseCases/CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import LearningWorldEntity from "../../../../Core/Domain/Entities/LearningWorldEntity";
import LearningWorldScoreTO from "../../../../Core/Application/DataTransferObjects/LearningWorldScoreTO";
import IGetUserLocationUseCase from "../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import UserLocationTO from "../../../../Core/Application/DataTransferObjects/UserLocationTO";
import LearningSpaceScoreTO from "../../../../Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import ILoggerPort from "../../../../Core/Application/Ports/Interfaces/ILoggerPort";

const worldPortMock = mock<ILearningWorldPort>();
const entityContainerMock = mock<IEntityContainer>();
const calculateSpaceScoreMock =
  mock<IInternalCalculateLearningSpaceScoreUseCase>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();
const loggerMock = mock<ILoggerPort>();

const userLocationTO: UserLocationTO = {
  worldID: 1,
  spaceID: 1,
};

describe("Calculate Learning World Score UseCase", () => {
  let systemUnderTest: CalculateLearningWorldScoreUseCase;
  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock,
    );
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock,
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.ICalculateLearningSpaceScoreUseCase,
    ).toConstantValue(calculateSpaceScoreMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase,
    ).toConstantValue(getUserLocationUseCaseMock);
    CoreDIContainer.rebind(CORE_TYPES.ILogger).toConstantValue(loggerMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      CalculateLearningWorldScoreUseCase,
    );
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
      ]),
    );
    calculateSpaceScoreMock.internalExecute.mockReturnValueOnce({
      currentScore: 10,
      maxScore: 30,
      requiredScore: 20,
      spaceID: 1,
    } as LearningSpaceScoreTO);

    systemUnderTest.execute();

    entityContainerMock.filterEntitiesOfType.mockReset();
  });

  test("should calculate the correct total world score (execute)", () => {
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
      } as any as LearningWorldEntity,
    ]);

    calculateSpaceScoreMock.internalExecute.mockReturnValueOnce({
      currentScore: 10,
      maxScore: 30,
      requiredScore: 20,
      spaceID: 1,
    } as LearningSpaceScoreTO);
    calculateSpaceScoreMock.internalExecute.mockReturnValueOnce({
      currentScore: 20,
      maxScore: 90,
      requiredScore: 40,
      spaceID: 2,
    } as LearningSpaceScoreTO);

    systemUnderTest.execute();

    expect(worldPortMock.onLearningWorldScored).toHaveBeenCalledWith({
      currentScore: 30,
      requiredScore: 60,
      maxScore: 120,
      worldID: 1,
    } as LearningWorldScoreTO);

    entityContainerMock.filterEntitiesOfType.mockReset();
  });

  // ANF-ID: [EWE0003]
  test("should calculate the correct total world score (internalExecute)", () => {
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
      } as any as LearningWorldEntity,
    ]);

    calculateSpaceScoreMock.internalExecute.mockReturnValueOnce({
      currentScore: 10,
      maxScore: 30,
      requiredScore: 20,
      spaceID: 1,
    } as LearningSpaceScoreTO);
    calculateSpaceScoreMock.internalExecute.mockReturnValueOnce({
      currentScore: 20,
      maxScore: 90,
      requiredScore: 40,
      spaceID: 2,
    } as LearningSpaceScoreTO);

    const result = systemUnderTest.internalExecute({ worldID: 1 });

    expect(result).toStrictEqual({
      currentScore: 30,
      requiredScore: 60,
      maxScore: 120,
      worldID: 1,
    } as LearningWorldScoreTO);

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

  test("should call logger and return if the user location doesn't contain a worldID", () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce(
      {} as UserLocationTO,
    );

    systemUnderTest.execute();

    expect(loggerMock.log).toHaveBeenCalledWith(
      "WARN",
      "CalculateLearningWorldScoreUseCase: User is not in a world!",
    );
    expect(worldPortMock.onLearningWorldScored).not.toHaveBeenCalled();
  });

  test("should throw error and log error if learningSpaceScoreUseCase returns an error", () => {
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
      } as any as LearningWorldEntity,
    ]);

    calculateSpaceScoreMock.internalExecute.mockImplementationOnce(() => {
      throw new Error("Test error");
    });

    expect(() => {
      systemUnderTest.execute();
    }).toThrow("Test error");

    expect(loggerMock.log).toHaveBeenCalledWith(
      "ERROR",
      expect.stringContaining("Test error"),
    );
  });
});
