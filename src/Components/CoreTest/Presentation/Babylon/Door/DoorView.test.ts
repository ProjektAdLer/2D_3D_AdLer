import Observable from "../../../../../Lib/Observable";
import DoorView from "../../../../Core/Presentation/Babylon/Door/DoorView";
import DoorViewModel from "../../../../Core/Presentation/Babylon/Door/DoorViewModel";

// const subscribeMock = jest.spyOn(Observable.prototype, "subscribe");
jest.mock("../../../../../Lib/Observable.ts");
jest.mock("@babylonjs/core");

//@ts-ignore
DoorView.prototype.setup = jest.fn();

describe("DoorView", () => {
  let view: DoorView;

  beforeEach(() => {
    view = new DoorView(new DoorViewModel());
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test("constructor", () => {
    expect(view["sceneController"]).toBeDefined();

    expect(view["viewModel"].position.subscribe).toHaveBeenCalledTimes(1);
    expect(view["viewModel"].rotation.subscribe).toHaveBeenCalledTimes(1);
    expect(view["viewModel"].isOpen.subscribe).toHaveBeenCalledTimes(1);
    expect(view["viewModel"].isVisible.subscribe).toHaveBeenCalledTimes(1);

    expect(DoorView.prototype["setup"]).toHaveBeenCalledTimes(1);
  });
});
