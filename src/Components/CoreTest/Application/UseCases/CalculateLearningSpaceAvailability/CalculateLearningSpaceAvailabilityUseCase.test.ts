import { mock } from "jest-mock-extended";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import { IInternalCalculateLearningSpaceScoreUseCase } from "../../../../Core/Application/UseCases/CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import CalculateLearningSpaceAvailabilityUseCase from "../../../../Core/Application/UseCases/CalculateLearningSpaceAvailability/CalculateLearningSpaceAvailabilityUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import ILoggerPort from "../../../../Core/Application/Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";

const entityContainerMock = mock<IEntityContainer>();
const calculateLearningSpaceScoreUseCaseMock =
  mock<IInternalCalculateLearningSpaceScoreUseCase>();
const loggerMock = mock<ILoggerPort>();

describe("CalculateLearningSpaceAvailabilityUseCase", () => {
  let systemUnderTest: CalculateLearningSpaceAvailabilityUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock,
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.ICalculateLearningSpaceScoreUseCase,
    ).toConstantValue(calculateLearningSpaceScoreUseCaseMock);
    CoreDIContainer.rebind(CORE_TYPES.ILogger).toConstantValue(loggerMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      CalculateLearningSpaceAvailabilityUseCase,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
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
        spaceID: 3,
      });

    const result = systemUnderTest.internalExecute({
      spaceID: 1,
      worldID: 1,
    });

    expect(result).toMatchObject({
      requirementsString: "(2)^(3)",
      requirementsSyntaxTree: {
        type: "AND",
        expressions: [
          {
            type: "ID",
            value: 2,
          },
          {
            type: "ID",
            value: 3,
          },
        ],
      },
      isAvailable: true,
    });
  });

  test("internalExecute returns the correct availability for a space with no requirements", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
        requirements: "",
      },
    ]);

    const result = systemUnderTest.internalExecute({
      spaceID: 1,
      worldID: 1,
    });

    expect(result).toStrictEqual({
      requirementsString: "",
      requirementsSyntaxTree: null,
      isAvailable: true,
    });
  });

  //ANF-ID: [EZZ0013]
  test("internalExecute returns isavailable:false and warns in the logger if the space is not found", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);
    const result = systemUnderTest.internalExecute({
      spaceID: 1,
      worldID: 1,
    });

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      expect.stringContaining(
        "CalculateLearningSpaceAvailabilityUseCase: Space 1 not found!",
      ),
    );
    expect(result).toStrictEqual({
      requirementsString: "",
      requirementsSyntaxTree: null,
      isAvailable: false,
    });
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
    const result = systemUnderTest.internalExecute({
      spaceID: 1,
      worldID: 1,
    });

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      expect.stringContaining(
        "CalculateLearningSpaceAvailabilityUseCase: Space 1 not found!",
      ),
    );
    expect(result).toStrictEqual({
      requirementsString: "",
      requirementsSyntaxTree: null,
      isAvailable: false,
    });
  });

  test("logs error if calculateLearningSpaceScoreUseCase returns an error", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
        requirements: "(2)^(3)",
      },
    ]);

    calculateLearningSpaceScoreUseCaseMock.internalExecute
      .mockImplementationOnce(() => {
        throw new Error("Test error");
      })
      .mockReturnValueOnce({
        requiredScore: 2,
        currentScore: 3,
        maxScore: 4,
        spaceID: 3,
      });

    systemUnderTest.internalExecute({
      spaceID: 1,
      worldID: 1,
    });

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.ERROR,
      expect.stringContaining("Test error"),
    );
  });

  test("filterEntitiesOfType filter callback returns true if the space has the correct id and parentWorldID", () => {
    let filterResult;
    entityContainerMock.filterEntitiesOfType.mockImplementation((_, cb) => {
      filterResult = cb({
        id: 1,
        parentWorldID: 1,
      });

      return [
        {
          id: 1,
          requirements: "(2)^(3)",
        },
      ];
    });

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
        spaceID: 3,
      });

    systemUnderTest.internalExecute({
      spaceID: 1,
      worldID: 1,
    });

    expect(filterResult).toBe(true);
  });
});
