import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import LearningRoomView from "../../../Core/Presentation/LearningRoom/LearningRoomView";
import LearningRoomViewModel from "../../../Core/Presentation/LearningRoom/LearningRoomViewModel";

jest.mock("@babylonjs/core");

describe("RoomView", () => {
  let roomView: LearningRoomView;

  beforeEach(() => {
    roomView = CoreDIContainer.get(CORE_TYPES.ILearningRoomView);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("CreateFloor or CreateWalls throws Error if ViewModel is not set.", () => {
    expect(() => {
      roomView.displayRoom();
    }).toThrowError();
  });

  // test("CreateWalls throws Error if ViewModel is not set.", () => {
  //   expect(() => {
  //     roomView.createWalls(
  //       new Scene(new Engine(document.createElement("canvas")))
  //     );
  //   }).toThrowError();
  // });

  test("View Model is being Set by the Setter", () => {
    roomView.ViewModel = CoreDIContainer.get(LearningRoomViewModel);
    //@ts-ignore
    expect(roomView).toMatchSnapshot({
      viewModel: expect.any(LearningRoomViewModel),
    });
  });
});
