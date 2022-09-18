import SpacePresenter from "../../../../Core/Presentation/Babylon/Spaces/SpacePresenter";
import SpaceViewModel from "../../../../Core/Presentation/Babylon/Spaces/SpaceViewModel";
import SpaceBuilder from "../../../../Core/Presentation/Babylon/Spaces/SpaceBuilder";
import SpacePort from "../../../../Core/Ports/SpacePort/SpacePort";

jest.mock("@babylonjs/core");
const addSpacePresenterMock = jest.spyOn(
  SpacePort.prototype,
  "registerSpacePresenter"
);

describe("SpaceBuilder", () => {
  let systemUnderTest: SpaceBuilder;

  beforeEach(() => {
    systemUnderTest = new SpaceBuilder();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test("buildViewModel concludes the build step successfully and sets the Scene in the VM", () => {
    systemUnderTest.buildViewModel();
    expect(systemUnderTest["viewModel"]).toBeDefined();
    expect(systemUnderTest.getViewModel()).toBeDefined();
    expect(systemUnderTest.getViewModel()).toBeInstanceOf(SpaceViewModel);
  });

  test("buildPresenter concludes the build step successfully and registers the presenter with the port", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();
    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest.getPresenter()).toBeDefined();
    expect(systemUnderTest.getPresenter()).toBeInstanceOf(SpacePresenter);
    expect(addSpacePresenterMock).toHaveBeenCalledTimes(1);
  });
});
