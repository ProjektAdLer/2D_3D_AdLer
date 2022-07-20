import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../Core/Domain/EntityContainer/IEntityContainer";
import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../Core/DependencyInjection/Ports/PORT_TYPES";
import CalculateTotalRoomScore from "../../../Core/Application/CalculateTotalRoomScore/CalculateTotalRoomScore";
import LearningRoomEntity from "../../../Core/Domain/Entities/LearningRoomEntity";
import { filterEntitiesOfTypeMockImplUtil } from "../../TestUtils";
import ILearningRoomPort from "../../../Core/Ports/LearningRoomPort/ILearningRoomPort";

const roomTO = { roomId: 1 };

const learningRoomPortMock = mock<ILearningRoomPort>();
const entityContainerMock = mock<IEntityContainer>();

describe("Calculate Total Room Score UseCase", () => {
  let systemUnderTest: CalculateTotalRoomScore;
  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );

    CoreDIContainer.rebind(PORT_TYPES.ILearningRoomPort).toConstantValue(
      learningRoomPortMock
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(CalculateTotalRoomScore);
  });

  test("filter Callback should return a boolean", () => {
    entityContainerMock.filterEntitiesOfType.mockImplementation(
      filterEntitiesOfTypeMockImplUtil([
        {
          id: 42,
          learningElements: [],
        },
      ])
    );

    systemUnderTest.execute(roomTO);

    entityContainerMock.filterEntitiesOfType.mockReset();
  });

  it("should calculate the correct total room score", () => {
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
          {
            hasScored: false,
            value: 10,
          },
        ],
      },
    ]);

    systemUnderTest.execute(roomTO);

    expect(entityContainerMock.filterEntitiesOfType).toHaveBeenCalledWith(
      LearningRoomEntity,
      expect.any(Function)
    );

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

    systemUnderTest.execute(roomTO);

    expect(learningRoomPortMock.presentNewScore).toHaveBeenCalledWith(
      0,
      false,
      roomTO.roomId
    );
  });

  it("should throw an error if the room is not found", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);

    expect(() => {
      systemUnderTest.execute(roomTO);
    }).toThrow();
  });
});
