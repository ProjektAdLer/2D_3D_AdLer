import { injectable } from "inversify";
import CalculateTotalRoomScore from "../../../Core/Application/CalculateTotalRoomScore/CalculateTotalRoomScore";
import ScoreLearningElementUseCase from "../../../Core/Application/ScoreLearningElement/ScoreLearningElementUseCase";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IEntityContainer from "../../../Core/Domain/EntityContainer/IEntityContainer";
import { LearningComponentID } from "../../../Core/Types/EnitityTypes";
import { ConstructorReference } from "../../../Core/Types/EntityManagerTypes";
import { filterEntitiesOfTypeMockImplUtil } from "../../TestUtils";

const executeTotalRoomScoreMock = jest.spyOn(
  CalculateTotalRoomScore.prototype,
  "execute"
);

@injectable()
//@ts-ignore
class EntityContainerMock implements IEntityContainer {
  filterEntitiesOfType<T extends object>(
    entityType: ConstructorReference<T>,
    filter: (entity: T) => boolean
  ): T[] {
    return [];
  }
}

@injectable()
// @ts-ignore
class BackendMock implements IBackend {
  async scoreLearningElement(
    learningElementId: LearningComponentID
  ): Promise<void> {
    return;
  }
}

describe("ScoreLearningElementUseCase", () => {
  let useCase: ScoreLearningElementUseCase;

  beforeEach(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.unbind(CORE_TYPES.IBackend);
    CoreDIContainer.bind(CORE_TYPES.IBackend).to(BackendMock);

    CoreDIContainer.unbind(CORE_TYPES.IEntityContainer);
    CoreDIContainer.bind(CORE_TYPES.IEntityContainer).to(EntityContainerMock);

    useCase = CoreDIContainer.get<ScoreLearningElementUseCase>(
      USECASE_TYPES.IScoreLearningElementUseCase
    );
  });

  afterEach(() => {
    CoreDIContainer.restore();
  });

  test("executeAsync throws error if learningElementId is not provided", async () => {
    await expect(useCase.executeAsync()).rejects.toThrowError();
  });

  test("executeAsync throws error if entity container returns no element entity with matching ID", () => {
    EntityContainerMock.prototype.filterEntitiesOfType = jest
      .fn()
      .mockReturnValueOnce([]);

    expect(() =>
      useCase.executeAsync({ learningElementId: 1 })
    ).rejects.toThrowError("Could not find");
  });

  test("executeAsync throws error if entity container returns multiple element entities with matching ID", () => {
    EntityContainerMock.prototype.filterEntitiesOfType = jest
      .fn()
      .mockReturnValueOnce([{ id: 1 }, { id: 1 }]);

    expect(() =>
      useCase.executeAsync({ learningElementId: 1 })
    ).rejects.toThrowError("Found more than one");
  });

  test("executeAsync throws error if backend throws error", async () => {
    containerSetup();
    BackendMock.prototype.scoreLearningElement = jest
      .fn()
      .mockImplementation(() => Promise.reject("error"));

    await expect(
      useCase.executeAsync({ learningElementId: 1 })
    ).rejects.toThrowError("Could not score learning element via Backend");
  });

  test("executeAsync throws error if entity container returns no matching room", async () => {
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
    const mock = filterEntitiesOfTypeMockImplUtil(LearningElementEntities);

    EntityContainerMock.prototype.filterEntitiesOfType = jest
      .fn()
      .mockImplementationOnce(mock)
      .mockImplementationOnce(filterEntitiesOfTypeMockImplUtil([]));

    await expect(
      useCase.executeAsync({ learningElementId: 1 })
    ).rejects.toThrowError("Could not find room");
  });

  test("executeAsync successfully gets element with given id, scores it, gets the room id and starts use case to calcualte new room score", async () => {
    containerSetup();

    await expect(
      useCase.executeAsync({
        learningElementId: 1,
      })
    ).resolves.toBeUndefined();

    expect(executeTotalRoomScoreMock).toHaveBeenCalledTimes(1);
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

  EntityContainerMock.prototype.filterEntitiesOfType = jest
    .fn()
    .mockReturnValueOnce(LearningElementEntities)
    .mockReturnValueOnce(roomEntites);
}
