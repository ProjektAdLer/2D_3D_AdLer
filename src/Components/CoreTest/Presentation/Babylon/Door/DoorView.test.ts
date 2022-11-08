import DoorView from "../../../../Core/Presentation/Babylon/Door/DoorView";
import DoorViewModel from "../../../../Core/Presentation/Babylon/Door/DoorViewModel";
jest.mock("../../../../../Lib/Observable.ts");
jest.mock("@babylonjs/core");

//@ts-ignore
DoorView.prototype.setup = jest.fn();

describe("DoorView", () => {
  let systemUnderTest: DoorView;

  beforeEach(() => {
    systemUnderTest = new DoorView(new DoorViewModel());
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test("constructor", () => {
    expect(systemUnderTest["scenePresenter"]).toBeDefined();

    expect(
      systemUnderTest["viewModel"].position.subscribe
    ).toHaveBeenCalledTimes(1);
    expect(
      systemUnderTest["viewModel"].rotation.subscribe
    ).toHaveBeenCalledTimes(1);
    expect(systemUnderTest["viewModel"].isOpen.subscribe).toHaveBeenCalledTimes(
      1
    );

    expect(DoorView.prototype["setup"]).toHaveBeenCalledTimes(1);
  });
});
