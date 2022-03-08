import { Scene, Engine } from "@babylonjs/core";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/types";
import RoomView from "../../../Core/Presentation/Room/RoomView";
import RoomViewModel from "../../../Core/Presentation/Room/RoomViewModel";

jest.mock("@babylonjs/core");

describe("RoomView", () => {
  let roomView: RoomView;
  let roomViewModel: RoomViewModel;

  beforeEach(() => {
    roomView = CoreDIContainer.get(CORE_TYPES.IRoomView);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("CreateFloor throws Error if ViewModel is not set.", () => {
    expect(() => {
      roomView.createFloor(
        new Scene(new Engine(document.createElement("canvas")))
      );
    }).toThrowError();
  });

  test("CreateWalls throws Error if ViewModel is not set.", () => {
    expect(() => {
      roomView.createWalls(
        new Scene(new Engine(document.createElement("canvas")))
      );
    }).toThrowError();
  });

  test("View Model is being Set by the Setter", () => {
    roomView.ViewModel = CoreDIContainer.get(RoomViewModel);
    //@ts-ignore
    expect(roomView).toMatchSnapshot({
      viewModel: expect.any(RoomViewModel),
    });
  });
});
