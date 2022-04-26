import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import RoomController from "../../../Core/Presentation/Room/RoomController";
import RoomView from "../../../Core/Presentation/Room/RoomView";
import SceneController from "../../../Core/Presentation/SceneManagment/SceneController";

const SceneGetterMock = jest.spyOn(SceneController.prototype, "Scene", "get");
// const CreateFloorViewMock = jest.spyOn(RoomView.prototype, "createFloor");
// const CreateWallsViewMock = jest.spyOn(RoomView.prototype, "createWalls");

describe("RoomController", () => {
  let roomController: RoomController;

  beforeEach(() => {
    roomController = CoreDIContainer.get(CORE_TYPES.IRoomController);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  //TODO: Update Room tests when Rooms are reimplemented

  // test("createFloor calls createFloor.", () => {
  //   roomController.createFloor();
  //   expect(SceneGetterMock).toBeCalledTimes(1);
  //   expect(CreateFloorViewMock).toBeCalledTimes(1);
  // });

  // test("createWalls calls createWalls.", () => {
  //   roomController.createWalls();
  //   expect(SceneGetterMock).toBeCalledTimes(1);
  //   expect(CreateWallsViewMock).toBeCalledTimes(1);
  // });
});
