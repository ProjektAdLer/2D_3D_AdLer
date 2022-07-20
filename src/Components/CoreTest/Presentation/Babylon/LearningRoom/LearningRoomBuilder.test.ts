import LearningRoomPresenter from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomPresenter";
import LearningRoomViewModel from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomViewModel";
import LearningRoomBuilder from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomBuilder";
import LearningRoomPort from "../../../../Core/Ports/LearningRoomPort/LearningRoomPort";

jest.mock("@babylonjs/core");
const addLearningRoomPresenterMock = jest.spyOn(
  LearningRoomPort.prototype,
  "addLearningRoomPresenter"
);

describe("LearningRoomBuilder", () => {
  let systemUnderTest: LearningRoomBuilder;

  beforeEach(() => {
    systemUnderTest = new LearningRoomBuilder();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test("buildViewModel concludes the build step successfully and sets the Scene in the VM", () => {
    systemUnderTest.buildViewModel();
    expect(systemUnderTest["viewModel"]).toBeDefined();
    expect(systemUnderTest.getViewModel()).toBeDefined();
    expect(systemUnderTest.getViewModel()).toBeInstanceOf(
      LearningRoomViewModel
    );
  });

  test("buildPresenter concludes the build step successfully and registers the presneter with the port", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();
    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest.getPresenter()).toBeDefined();
    expect(systemUnderTest.getPresenter()).toBeInstanceOf(
      LearningRoomPresenter
    );
    expect(addLearningRoomPresenterMock).toHaveBeenCalledTimes(1);
  });
});
