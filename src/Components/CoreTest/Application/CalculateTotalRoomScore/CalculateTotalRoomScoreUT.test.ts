import { injectable } from "inversify";
import ICalculateTotalRoomScore from "../../../Core/Application/CalculateTotalRoomScore/ICalculateTotalRoomScore";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../../Core/DependencyInjection/UseCases/USECASE_SYMBOLS";
import IEntityContainer from "../../../Core/Domain/EntityContainer/IEntityContainer";
import LearningRoomPort from "../../../Core/Presentation/Ports/LearningRoomPort/LearningRoomPort";
import { ConstructorReference } from "../../../Core/Types/EntityManagerTypes";

const portMock = jest.spyOn(LearningRoomPort.prototype, "presentNewScore");

@injectable()
//@ts-ignore
class EntityContainerMock2Elements implements IEntityContainer {
  filterEntitiesOfType<T extends object>(
    entityType: ConstructorReference<T>,
    filter: (entity: T) => boolean
  ): T[] {
    return [
      {
        learningElements: [
          {
            hasScored: true,
            value: 10,
          },
          {
            hasScored: true,
            value: 10,
          },
        ],
      } as T,
    ];
  }
}

@injectable()
//@ts-ignore
class EntityContainerMock0Elements implements IEntityContainer {
  filterEntitiesOfType<T extends object>(
    entityType: ConstructorReference<T>,
    filter: (entity: T) => boolean
  ): T[] {
    return [
      {
        learningElements: [],
      } as T,
    ];
  }
}

const roomTO = { roomId: 1 };

describe("Calculate Total Room Score UseCase", () => {
  beforeEach(() => {
    CoreDIContainer.snapshot();
  });

  afterEach(() => {
    CoreDIContainer.restore();
  });

  it("should calculate the total room score", () => {
    CoreDIContainer.unbind(CORE_TYPES.IEntityContainer);
    CoreDIContainer.bind(CORE_TYPES.IEntityContainer).to(
      EntityContainerMock2Elements
    );

    const calculateTotalRoomScoreUseCase =
      CoreDIContainer.get<ICalculateTotalRoomScore>(
        USECASE_TYPES.ICalculateTotalRoomScore
      );

    calculateTotalRoomScoreUseCase.execute(roomTO);

    expect(portMock).toHaveBeenCalledWith(20, true, roomTO.roomId);
  });

  it("should return 0 and false when no Learning Elements are present", () => {
    CoreDIContainer.unbind(CORE_TYPES.IEntityContainer);
    CoreDIContainer.bind(CORE_TYPES.IEntityContainer).to(
      EntityContainerMock0Elements
    );

    const calculateTotalRoomScoreUseCase =
      CoreDIContainer.get<ICalculateTotalRoomScore>(
        USECASE_TYPES.ICalculateTotalRoomScore
      );

    portMock.mockReset();

    calculateTotalRoomScoreUseCase.execute(roomTO);

    expect(portMock).toHaveBeenCalledWith(0, false, roomTO.roomId);
  });

  it("should throw an error if the room is not found", () => {
    const calculateTotalRoomScoreUseCase =
      CoreDIContainer.get<ICalculateTotalRoomScore>(
        USECASE_TYPES.ICalculateTotalRoomScore
      );

    const data = {
      roomId: 2,
    };

    expect(() => {
      calculateTotalRoomScoreUseCase.execute(data);
    }).toThrow();
  });
});
