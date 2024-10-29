import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import CalculateLearningSpaceScoreUseCase from "../../../../Core/Application/UseCases/CalculateLearningSpaceScore/CalculateLearningSpaceScoreUseCase";
import LearningSpaceEntity from "../../../../Core/Domain/Entities/LearningSpaceEntity";
import { filterEntitiesOfTypeMockImplUtil } from "../../../TestUtils";
import LearningSpaceScoreTO from "../../../../Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import IGetUserLocationUseCase from "../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import UserLocationTO from "../../../../Core/Application/DataTransferObjects/UserLocationTO";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import ILoggerPort from "../../../../Core/Application/Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";

const worldPortMock = mock<ILearningWorldPort>();
const entityContainerMock = mock<IEntityContainer>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();
const loggerMock = mock<ILoggerPort>();

describe("Calculate Learning Space Score UseCase", () => {
  let systemUnderTest: CalculateLearningSpaceScoreUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock,
    );
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock,
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase,
    ).toConstantValue(getUserLocationUseCaseMock);
    CoreDIContainer.rebind(CORE_TYPES.ILogger).toConstantValue(loggerMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      CalculateLearningSpaceScoreUseCase,
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("filter Callback should return true when ids are matching", () => {
    entityContainerMock.filterEntitiesOfType.mockImplementation(
      filterEntitiesOfTypeMockImplUtil([
        {
          id: 1,
          parentWorldID: 1,
          elements: [],
        },
      ]),
    );

    systemUnderTest["calculateLearningSpaceScore"](1, 1);
  });

  test("calculateLearningSpaceScore should calculate the correct total space score", () => {
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
      } as LearningSpaceEntity,
    ]);

    const result = systemUnderTest["calculateLearningSpaceScore"](1, 1);

    expect(entityContainerMock.filterEntitiesOfType).toHaveBeenCalledWith(
      LearningSpaceEntity,
      expect.any(Function),
    );
    expect(result).toMatchObject({
      currentScore: 20,
      requiredScore: 20,
      maxScore: 30,
      spaceID: 1,
    } as LearningSpaceScoreTO);
  });

  test("calculateLearningSpaceScore should return 0 for each score when no Elements are present", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
        elements: [],
        description: "test",
        requiredScore: 0,
        name: "test",
        goals: ["test"],
        parentWorldID: 200,
        requirements: "",
      } as Partial<LearningSpaceEntity>,
    ]);

    const result = systemUnderTest["calculateLearningSpaceScore"](1, 1);

    expect(result).toMatchObject({
      currentScore: 0,
      requiredScore: 0,
      maxScore: 0,
      spaceID: 1,
    } as LearningSpaceScoreTO);
  });

  //ANF-ID: [EZZ0013]
  test("calculateLearningSpaceScore should throw an error if the space is not found", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);

    expect(() => {
      systemUnderTest["calculateLearningSpaceScore"](1, 1);
    }).toThrow();
  });

  test("calls logger with warning when the worldID in the user location is undefined", () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: undefined,
    } as UserLocationTO);

    systemUnderTest.execute();

    expect(worldPortMock.onLearningSpaceScored).not.toHaveBeenCalled();
    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      expect.any(String),
    );
  });

  test("calls logger with warning when the spaceID in the user location is undefined", () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: undefined,
      worldID: 1,
    } as UserLocationTO);

    systemUnderTest.execute();

    expect(worldPortMock.onLearningSpaceScored).not.toHaveBeenCalled();
    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      expect.any(String),
    );
  });

  test("execute should call WorldPort.onLearningSpaceScored", () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {
        id: 1,
        elements: [],
        description: "test",
        requiredScore: 0,
        name: "test",
        goals: ["test"],
        requirements: "",
        parentWorldID: 200,
      } as Partial<LearningSpaceEntity>,
    ]);

    systemUnderTest.execute();

    expect(worldPortMock.onLearningSpaceScored).toHaveBeenCalledTimes(1);
  });

  test("internalExecute returns the correct LearningSpaceScoreTO", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
        elements: [
          {
            hasScored: true,
            value: 10,
          },
          null,
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
      } as LearningSpaceEntity,
    ]);

    const result = systemUnderTest.internalExecute({ spaceID: 1, worldID: 1 });

    expect(result).toMatchObject({
      currentScore: 20,
      requiredScore: 20,
      maxScore: 30,
      spaceID: 1,
    } as LearningSpaceScoreTO);
  });
});
