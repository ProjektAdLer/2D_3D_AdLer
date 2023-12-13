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

const worldPortMock = mock<ILearningWorldPort>();
const entityContainerMock = mock<IEntityContainer>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();

describe("Calculate Learning Space Score UseCase", () => {
  let systemUnderTest: CalculateLearningSpaceScoreUseCase;
  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase
    ).toConstantValue(getUserLocationUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      CalculateLearningSpaceScoreUseCase
    );
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

    systemUnderTest["calculateLearningSpaceScore"](1, 1);

    entityContainerMock.filterEntitiesOfType.mockReset();
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
      expect.any(Function)
    );
    expect(result).toMatchObject({
      currentScore: 20,
      requiredScore: 20,
      maxScore: 30,
      spaceID: 1,
    } as LearningSpaceScoreTO);

    entityContainerMock.filterEntitiesOfType.mockReset();
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

    entityContainerMock.filterEntitiesOfType.mockReset();
  });

  test("calculateLearningSpaceScore should throw an error if the space is not found", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);

    expect(() => {
      systemUnderTest["calculateLearningSpaceScore"](1, 1);
    }).toThrow();
  });

  test("execute throws when the worldID in the user location is undefined", () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: undefined,
    } as UserLocationTO);

    expect(() => {
      systemUnderTest.execute();
    }).toThrow();
  });

  test("execute throws when the spaceID in the user location is undefined", () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: undefined,
      worldID: 1,
    } as UserLocationTO);

    expect(() => {
      systemUnderTest.execute();
    }).toThrow();
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

    entityContainerMock.filterEntitiesOfType.mockReset();
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

    entityContainerMock.filterEntitiesOfType.mockReset();
  });
});
