import LearningRoomPresenter from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomPresenter";
import LearningRoomViewModel from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomViewModel";
import LearningRoomBuilder from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomBuilder";
import SceneViewModel from "../../../../Core/Presentation/Babylon/SceneManagment/SceneViewModel";
import LearningRoomPort from "../../../../Core/Ports/LearningRoomPort/LearningRoomPort";

jest.mock("@babylonjs/core");
const getSceneMock = jest.spyOn(SceneViewModel.prototype, "Scene", "get");
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
    expect(getSceneMock).toHaveBeenCalledTimes(1);
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
