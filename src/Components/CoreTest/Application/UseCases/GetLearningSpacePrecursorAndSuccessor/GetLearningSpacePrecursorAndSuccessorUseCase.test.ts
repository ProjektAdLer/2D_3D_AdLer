import { mock } from "jest-mock-extended";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import GetLearningSpacePrecursorAndSuccessorUseCase from "../../../../Core/Application/UseCases/GetLearningSpacePrecursorAndSuccessor/GetLearningSpacePrecursorAndSuccessorUseCase";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IGetUserLocationUseCase from "../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import { IInternalCalculateLearningSpaceScoreUseCase } from "../../../../Core/Application/UseCases/CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import LearningSpaceScoreTO from "../../../../Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import ICalculateLearningSpaceAvailabilityUseCase from "../../../../Core/Application/UseCases/CalculateLearningSpaceAvailability/ICalculateLearningSpaceAvailabilityUseCase";

const entityContainerMock = mock<IEntityContainer>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();
const internalCalculateLearningSpaceScoreUseCaseMock =
  mock<IInternalCalculateLearningSpaceScoreUseCase>();
const calculateLearningSpaceAvailabilityUseCaseMock =
  mock<ICalculateLearningSpaceAvailabilityUseCase>();

describe("GetLearningSpacePrecursorAndSuccessorUseCase", () => {
  let systemUnderTest: GetLearningSpacePrecursorAndSuccessorUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind<IGetUserLocationUseCase>(
      USECASE_TYPES.IGetUserLocationUseCase
    ).toConstantValue(getUserLocationUseCaseMock);
    CoreDIContainer.rebind<IInternalCalculateLearningSpaceScoreUseCase>(
      USECASE_TYPES.ICalculateLearningSpaceScoreUseCase
    ).toConstantValue(internalCalculateLearningSpaceScoreUseCaseMock);
    CoreDIContainer.rebind<ICalculateLearningSpaceAvailabilityUseCase>(
      USECASE_TYPES.ICalculateLearningSpaceAvailabilityUseCase
    ).toConstantValue(calculateLearningSpaceAvailabilityUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.IGetLearningSpacePrecursorAndSuccessorUseCase
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("throws error when no world entity is present on the container", () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({} as any);

    expect(() => systemUnderTest.execute()).toThrowError(
      "UserLocation is empty or incomplete!"
    );
  });

  //ANF-ID: [EZZ0013]
  test("throws error when no space entity is present on the container", () => {
    let worldID = 1;
    getUserLocationUseCaseMock.execute.mockReturnValue({ worldID } as any);

    expect(() => systemUnderTest.execute()).toThrowError(
      "UserLocation is empty or incomplete!"
    );
  });
  test("throws error when no matching world entity is present in the container", () => {
    let worldID = 1;
    let spaceID = 1;
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID,
      spaceID,
    });
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      { name: "world", id: 2 },
    ]);

    expect(() => systemUnderTest.execute()).toThrowError("World 1 not found!");
  });
  test("throws error when no matching space entity is present in the container", () => {
    let worldID = 1;
    let spaceID = 1;
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID,
      spaceID,
    });
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      { name: "world", id: 1, spaces: [{ name: "space", id: 2 }] },
    ]);

    expect(() => systemUnderTest.execute()).toThrowError("Space 1 not found!");
  });

  // ANF-ID: [EWE0029]
  test("UseCase returns an object with current id, precursor spaces and successor spaces", () => {
    let worldID = 1;
    let spaceID = 2;
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID,
      spaceID,
    });
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {
        name: "world",
        id: 1,
        spaces: [
          {
            name: "space",
            id: 1,
            elements: [],
            description: "testspace1",
            goals: [],
            requirements: "",
          },
          {
            name: "space",
            id: 2,
            elements: [],
            description: "testspace2",
            goals: [],
            requirements: "1",
          },
          {
            name: "space",
            id: 3,
            elements: [],
            description: "testspace3",
            goals: [],
            requirements: "2",
          },
        ],
        goals: [],
        description: "testworld",
      },
    ]);
    internalCalculateLearningSpaceScoreUseCaseMock.internalExecute.mockReturnValue(
      {
        spaceID: 1,
        requiredScore: 1,
        currentScore: 1,
        maxScore: 1,
      }
    );
    calculateLearningSpaceAvailabilityUseCaseMock.internalExecute.mockReturnValue(
      {
        requirementsString: "1",
        requirementsSyntaxTree: null,
        isAvailable: true,
      }
    );

    let expected = {
      id: 2,
      precursorSpaces: [
        {
          id: 1,
        },
      ],
      successorSpaces: [
        {
          id: 3,
        },
      ],
    };

    expect(systemUnderTest.execute()).toMatchObject(expected);
  });
});
