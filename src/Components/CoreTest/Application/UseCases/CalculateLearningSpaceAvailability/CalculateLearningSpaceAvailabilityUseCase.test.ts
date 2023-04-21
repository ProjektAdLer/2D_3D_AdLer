import { mock } from "jest-mock-extended";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import { IInternalCalculateLearningSpaceScoreUseCase } from "../../../../Core/Application/UseCases/CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import CalculateLearningSpaceAvailabilityUseCase from "../../../../Core/Application/UseCases/CalculateLearningSpaceAvailability/CalculateLearningSpaceAvailabilityUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import { logger } from "../../../../../Lib/Logger";

jest.mock("src/Lib/Logger.ts");

const entityContainerMock = mock<IEntityContainer>();
const calculateLearningSpaceScoreUseCaseMock =
  mock<IInternalCalculateLearningSpaceScoreUseCase>();

describe("CalculateLearningSpaceAvailabilityUseCase", () => {
  let systemUnderTest: CalculateLearningSpaceAvailabilityUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.ICalculateLearningSpaceScoreUseCase
    ).toConstantValue(calculateLearningSpaceScoreUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      CalculateLearningSpaceAvailabilityUseCase
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("internalExecute returns the correct availability", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
        requirements: "(2)^(3)",
      },
    ]);

    calculateLearningSpaceScoreUseCaseMock.internalExecute
      .mockReturnValueOnce({
        requiredScore: 2,
        currentScore: 3,
        maxScore: 4,
        spaceID: 2,
      })
      .mockReturnValueOnce({
        requiredScore: 2,
        currentScore: 3,
        maxScore: 4,
        spaceID: 2,
      });

    const result = systemUnderTest.internalExecute(1);

    expect(result).toBe(true);
  });

  test("internalExecute throws an error if the space is not found", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);

    expect(() => systemUnderTest.internalExecute(1)).toThrowError();
  });

  test("internalExecute throws an error if more than one space with given id is found", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
      },
      {
        id: 1,
      },
    ]);

    expect(() => systemUnderTest.internalExecute(1)).toThrowError();
  });

  test("internalExecute returns false and calls logger.error if the requirements string is invalid", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
        requirements: "invalid",
      },
    ]);

    const result = systemUnderTest.internalExecute(1);

    expect(logger.error).toBeCalledTimes(1);
    expect(result).toBe(false);
  });
});
