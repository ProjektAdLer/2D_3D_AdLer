import LearningRoomController from "../../../Core/Presentation/Babylon/LearningRoom/LearningRoomController";
import LearningRoomPresenter from "../../../Core/Presentation/Babylon/LearningRoom/LearningRoomPresenter";
import LearningRoomView from "../../../Core/Presentation/Babylon/LearningRoom/LearningRoomView";
import LearningRoomViewModel from "../../../Core/Presentation/Babylon/LearningRoom/LearningRoomViewModel";
import LearningRoomBuilder from "../../../Core/Presentation/PresentationBuilder/LearningRoomBuilder";
import SceneViewModel from "../../../Core/Presentation/Babylon/SceneManagment/SceneViewModel";

jest.mock("@babylonjs/core");
const getSceneMock = jest.spyOn(SceneViewModel.prototype, "Scene", "get");

describe("LearningRoomBuilder", () => {
  let builder: LearningRoomBuilder = new LearningRoomBuilder();

  beforeEach(() => {
    builder = new LearningRoomBuilder();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test("reset should reset all fields", () => {
    builder.reset();
    expect(builder["view"]).toBeNull();
    expect(builder["viewModel"]).toBeNull();
    expect(builder["presenter"]).toBeNull();
    expect(builder["controller"]).toBeNull();
  });

  test("buildViewModel, getViewModel", () => {
    builder.buildViewModel();
    expect(builder["viewModel"]).toBeDefined();
    expect(builder.getViewModel()).toBeDefined();
    expect(builder.getViewModel()).toBeInstanceOf(LearningRoomViewModel);
    expect(getSceneMock).toHaveBeenCalledTimes(1);
  });

  test("buildController, getController", () => {
    builder.buildController();
    expect(builder["controller"]).toBeDefined();
    expect(builder.getController()).toBeDefined();
    expect(builder.getController()).toBeInstanceOf(LearningRoomController);
  });

  test("buildView, getView", () => {
    builder.buildController();
    builder.buildViewModel();
    builder.buildView();
    expect(builder["view"]).toBeDefined();
    expect(builder["view"]).toBeInstanceOf(LearningRoomView);
  });

  test("buildPresenter, getPresenter", () => {
    builder.buildViewModel();
    builder.buildPresenter();
    expect(builder["presenter"]).toBeDefined();
    expect(builder.getPresenter()).toBeDefined();
    expect(builder.getPresenter()).toBeInstanceOf(LearningRoomPresenter);
  });

  test("buildView throws error if viewModel is not build yet", () => {
    expect(() => builder.buildView()).toThrowError("ViewModel");
  });

  test("buildView throws error if controller is not build yet", () => {
    builder.buildViewModel();
    expect(() => builder.buildView()).toThrowError("Controller");
  });

  test("buildPresenter throws error if viewModel is not build yet", () => {
    expect(() => builder.buildPresenter()).toThrowError("ViewModel");
  });

  test("getPresenter throws error if presenter is not build yet", () => {
    expect(() => builder.getPresenter()).toThrowError("Presenter");
  });

  test("getController throws error if controller is not build yet", () => {
    expect(() => builder.getController()).toThrowError("Controller");
  });

  test("getViewModel throws error if viewModel is not build yet", () => {
    expect(() => builder.getViewModel()).toThrowError("ViewModel");
  });
});
