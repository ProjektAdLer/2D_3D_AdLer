import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import LearningRoomController from "../../../Core/Presentation/LearningRoom/LearningRoomController";
import LearningRoomView from "../../../Core/Presentation/LearningRoom/LearningRoomView";
import SceneController from "../../../Core/Presentation/SceneManagment/SceneController";

const SceneGetterMock = jest.spyOn(SceneController.prototype, "Scene", "get");
const DisplayRoomViewMock = jest.spyOn(
  LearningRoomView.prototype,
  "displayRoom"
);
// const CreateWallsViewMock = jest.spyOn(RoomView.prototype, "createWalls");

describe("RoomController", () => {
  let learningRoomController: LearningRoomController;

  beforeEach(() => {
    learningRoomController = CoreDIContainer.get(
      CORE_TYPES.ILearningRoomController
    );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  //TODO: Update Room tests when Rooms are reimplemented

  test("displayRoom calls createFloor.", () => {
    learningRoomController.view.displayRoom();
    expect(SceneGetterMock).toBeCalledTimes(1);
    expect(DisplayRoomViewMock).toBeCalledTimes(1);
  });

  // test("createWalls calls createWalls.", () => {
  //   roomController.createWalls();
  //   expect(SceneGetterMock).toBeCalledTimes(1);
  //   expect(CreateWallsViewMock).toBeCalledTimes(1);
  // });
});
