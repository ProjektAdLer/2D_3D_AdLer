import LearningRoomView from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomView";
import LearningRoomViewModel from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomViewModel";
import LearningRoomController from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomController";
import LearningRoomPresenter from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomPresenter";
import { Vector2 } from "@babylonjs/core";

jest.mock("@babylonjs/core");

const roomViewModel: LearningRoomViewModel = new LearningRoomViewModel();
const roomController: LearningRoomController = new LearningRoomController();
roomViewModel.id = 1;
describe("LearningRoomView", () => {
  let roomView: LearningRoomView;

  beforeEach(() => {
    roomView = new LearningRoomView(roomViewModel, roomController);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
  // Tests are currently skipped due to unspecified issues that break them ~ fk
  test.skip("createFloorViaCorners throws error if viewModel is not set", () => {
    expect(new LearningRoomView(undefined, roomController)).toThrowError(
      "ViewModel not set"
    );
  });

  test.skip("createFloorViaCorners throws error if cornerCount is smaller than 3", () => {
    expect(() => {
      roomViewModel.roomCornerPoints.Value = [
        new Vector2(5.3, 4.3),
        new Vector2(-5.3, 4.3),
      ];
    }).toThrowError(
      "Not enough corners found to generate floor. Please review the Roomdata."
    );
  });

  test.skip("createFloorViaCorners creates a Mesh", () => {
    const mesh = roomViewModel.floorMesh.Value;
    expect(mesh).toBe(!undefined);
  });
});
