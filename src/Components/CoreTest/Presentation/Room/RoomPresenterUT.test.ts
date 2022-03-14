import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import RoomPresenter from "../../../Core/Presentation/Room/RoomPresenter";
import RoomView from "../../../Core/Presentation/Room/RoomView";
import RoomViewModel from "../../../Core/Presentation/Room/RoomViewModel";
import ScenePresenter from "../../../Core/Presentation/SceneManagment/ScenePresenter";

const RoomSizeGetterMock = jest.spyOn(
  RoomViewModel.prototype,
  "RoomSize",
  "get"
);
const SceneGetterMock = jest.spyOn(ScenePresenter.prototype, "Scene", "get");
const CreateFloorViewMock = jest.spyOn(RoomView.prototype, "createFloor");
const CreateWallsViewMock = jest.spyOn(RoomView.prototype, "createWalls");

describe("RoomPresenter", () => {
  let roomPresenter: RoomPresenter;

  beforeEach(() => {
    roomPresenter = CoreDIContainer.get(CORE_TYPES.IRoomPresenter);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("get RoomSize gets the Roomsize.", () => {
    let tmp = roomPresenter.RoomSize;
    expect(RoomSizeGetterMock).toBeCalledTimes(1);
  });

  test("createFloor calls createFloor.", () => {
    roomPresenter.createFloor();
    expect(SceneGetterMock).toBeCalledTimes(1);
    expect(CreateFloorViewMock).toBeCalledTimes(1);
  });

  test("createWalls calls createWalls.", () => {
    roomPresenter.createWalls();
    expect(SceneGetterMock).toBeCalledTimes(1);
    expect(CreateWallsViewMock).toBeCalledTimes(1);
  });
});
