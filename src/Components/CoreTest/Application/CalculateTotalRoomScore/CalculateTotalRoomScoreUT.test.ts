import ILearningRoomPort from "../../../Core/Application/CalculateTotalRoomScore/ILearningRoomPort";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../Core/Domain/EntityContainer/IEntityContainer";
import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../Core/DependencyInjection/Ports/PORT_TYPES";
import CalculateTotalRoomScore from "../../../Core/Application/CalculateTotalRoomScore/CalculateTotalRoomScore";

const roomTO = { roomId: 1 };

const learningRoomPortMock = mock<ILearningRoomPort>();
const entityContainerMock = mock<IEntityContainer>();

describe("Calculate Total Room Score UseCase", () => {
  let calculateTotalRoomScoreUseCase: CalculateTotalRoomScore;
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.unbind(CORE_TYPES.IEntityContainer);
    CoreDIContainer.bind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );

    CoreDIContainer.unbind(PORT_TYPES.ILearningRoomPort);
    CoreDIContainer.bind(PORT_TYPES.ILearningRoomPort).toConstantValue(
      learningRoomPortMock
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    calculateTotalRoomScoreUseCase = CoreDIContainer.resolve(
      CalculateTotalRoomScore
    );
  });

  it("should calculate the total room score", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
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
      },
    ]);

    calculateTotalRoomScoreUseCase.execute(roomTO);

    expect(learningRoomPortMock.presentNewScore).toHaveBeenCalledWith(
      20,
      true,
      roomTO.roomId
    );
  });

  it("should return 0 and false when no Learning Elements are present", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        learningElements: [],
      },
    ]);

    calculateTotalRoomScoreUseCase.execute(roomTO);

    expect(learningRoomPortMock.presentNewScore).toHaveBeenCalledWith(
      0,
      false,
      roomTO.roomId
    );
  });

  it("should throw an error if the room is not found", () => {
    const data = {
      roomId: 2,
    };

    expect(() => {
      calculateTotalRoomScoreUseCase.execute(data);
    }).toThrow();
  });
});
