import SpaceViewModel from "../../../../Core/Presentation/Babylon/Spaces/SpaceViewModel";
import SpaceBuilder from "../../../../Core/Presentation/Babylon/Spaces/SpaceBuilder";
import SpacePort from "../../../../Core/Ports/SpacePort/SpacePort";

jest.mock("@babylonjs/core");
const addSpacePresenterMock = jest.spyOn(
  SpacePort.prototype,
  "registerAdapter"
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
    expect(addSpacePresenterMock).toHaveBeenCalledTimes(1);
    expect(addSpacePresenterMock).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
