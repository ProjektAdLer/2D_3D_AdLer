import LearningRoomController from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomController";
import LearningRoomPresenter from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomPresenter";
import LearningRoomView from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomView";
import LearningRoomViewModel from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomViewModel";
import LearningRoomBuilder from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomBuilder";
import SceneViewModel from "../../../../Core/Presentation/Babylon/SceneManagment/SceneViewModel";

jest.mock("@babylonjs/core");
const getSceneMock = jest.spyOn(SceneViewModel.prototype, "Scene", "get");

describe("LearningRoomBuilder", () => {
  let builder: LearningRoomBuilder;

  beforeEach(() => {
    builder = new LearningRoomBuilder();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test("buildViewModel, getViewModel", () => {
    builder.buildViewModel();
    expect(builder["viewModel"]).toBeDefined();
    expect(builder.getViewModel()).toBeDefined();
    expect(builder.getViewModel()).toBeInstanceOf(LearningRoomViewModel);
    expect(getSceneMock).toHaveBeenCalledTimes(1);
  });
});
