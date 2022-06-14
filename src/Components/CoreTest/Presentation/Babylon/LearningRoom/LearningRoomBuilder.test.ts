import LearningRoomPresenter from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomPresenter";
import LearningRoomViewModel from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomViewModel";
import LearningRoomBuilder from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomBuilder";
import SceneViewModel from "../../../../Core/Presentation/Babylon/SceneManagement/SceneViewModel";
import LearningRoomPort from "../../../../Core/Ports/LearningRoomPort/LearningRoomPort";
import ScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/ScenePresenter";

jest.mock("@babylonjs/core");
const addLearningRoomPresenterMock = jest.spyOn(
  LearningRoomPort.prototype,
  "addLearningRoomPresenter"
);

describe("LearningRoomBuilder", () => {
  let builder: LearningRoomBuilder;

  beforeEach(() => {
    builder = new LearningRoomBuilder();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test("buildViewModel concludes the build step successfully and sets the Scene in the VM", () => {
    builder.buildViewModel();
    expect(builder["viewModel"]).toBeDefined();
    expect(builder.getViewModel()).toBeDefined();
    expect(builder.getViewModel()).toBeInstanceOf(LearningRoomViewModel);
  });

  test("buildPresenter concludes the build step successfully and registers the presneter with the port", () => {
    builder.buildViewModel();
    builder.buildPresenter();
    expect(builder["presenter"]).toBeDefined();
    expect(builder.getPresenter()).toBeDefined();
    expect(builder.getPresenter()).toBeInstanceOf(LearningRoomPresenter);
    expect(addLearningRoomPresenterMock).toHaveBeenCalledTimes(1);
  });
});
