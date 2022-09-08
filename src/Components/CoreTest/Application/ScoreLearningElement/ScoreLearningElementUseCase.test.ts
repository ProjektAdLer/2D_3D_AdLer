import ScoreLearningElementUseCase from "../../../Core/Application/ScoreLearningElement/ScoreLearningElementUseCase";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import IEntityContainer from "../../../Core/Domain/EntityContainer/IEntityContainer";
import { filterEntitiesOfTypeMockImplUtil } from "../../TestUtils";
import ICalculateTotalRoomScore from "../../../Core/Application/CalculateTotalRoomScore/ICalculateTotalRoomScore";
import USECASE_TYPES from "../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import { mock } from "jest-mock-extended";
import IBackendAdapter from "../../../Core/Adapters/BackendAdapter/IBackendAdapter";

const entityContainerMock = mock<IEntityContainer>();
const backendMock = mock<IBackendAdapter>();
const CalculateTotalRoomScoreMock = mock<ICalculateTotalRoomScore>();

describe("ScoreLearningElementUseCase", () => {
  let systemUnderTest: ScoreLearningElementUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);

    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind<IBackendAdapter>(
      CORE_TYPES.IBackendAdapter
    ).toConstantValue(backendMock);
    CoreDIContainer.rebind<ICalculateTotalRoomScore>(
      USECASE_TYPES.ICalculateTotalRoomScore
    ).toConstantValue(CalculateTotalRoomScoreMock);

    systemUnderTest = CoreDIContainer.resolve(ScoreLearningElementUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("executeAsync throws error if learningElementId is not provided", async () => {
    await expect(systemUnderTest.executeAsync()).rejects.toThrowError();
  });

  test("executeAsync throws error if entity container returns no element entity with matching ID", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);
    expect(() =>
      systemUnderTest.executeAsync({ learningElementId: 1 })
    ).rejects.toThrowError("Could not find");
  });

  test("executeAsync throws error if entity container returns multiple element entities with matching ID", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      { id: 1 },
      { id: 1 },
    ]);

    expect(() =>
      systemUnderTest.executeAsync({ learningElementId: 1 })
    ).rejects.toThrowError("Found more than one");
  });

  test("executeAsync throws error if backend throws error", async () => {
    containerSetup();

    backendMock.scoreLearningElement.mockRejectedValue("error");

    await expect(
      systemUnderTest.executeAsync({ learningElementId: 1 })
    ).rejects.toThrowError("Could not score learning element via Backend");
  });

  test("executeAsync throws error if entity container returns no matching room", async () => {
    const LearningElementEntities = [
      {
        id: 1,
        hasScored: false,
        value: 10,
      },
    ];
    const mock = filterEntitiesOfTypeMockImplUtil(LearningElementEntities);

    entityContainerMock.filterEntitiesOfType.mockImplementationOnce(mock);
    entityContainerMock.filterEntitiesOfType.mockImplementationOnce(
      filterEntitiesOfTypeMockImplUtil([])
    );

    await expect(
      systemUnderTest.executeAsync({ learningElementId: 1 })
    ).rejects.toThrowError("Could not find room");
  });

  test("executeAsync successfully gets element with given id, scores it, gets the room id and starts use case to calcualte new room score", async () => {
    containerSetup();

    await expect(
      systemUnderTest.executeAsync({
        learningElementId: 1,
      })
    ).resolves.toBeUndefined();

    expect(CalculateTotalRoomScoreMock.execute).toHaveBeenCalledTimes(1);
  });
});

function containerSetup(): void {
  const learningElementId = 1;
  const learningElement = {
    id: learningElementId,
    hasScored: false,
    value: 10,
  };
  const LearningElementEntities = [
    {
      learningElement,
    },
  ];
  const roomId = 1;
  const room = {
    id: roomId,
    learningElements: [learningElement],
  };
  const roomEntites = [
    {
      room,
    },
  ];

  entityContainerMock.filterEntitiesOfType.mockReturnValueOnce(
    LearningElementEntities
  );
  entityContainerMock.filterEntitiesOfType.mockReturnValueOnce(roomEntites);
}
