import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/types";
import ScenePresenter from "../../../Core/Presentation/SceneManagment/ScenePresenter";
import SceneView from "../../../Core/Presentation/SceneManagment/SceneView";

const createRenderLoopMock = jest
  .spyOn(SceneView.prototype, "createRenderLoop")
  .mockImplementation(() => {});

describe("ScenePresenter", () => {
  let scenePresenter: ScenePresenter;

  beforeAll(() => {
    scenePresenter = CoreDIContainer.get(CORE_TYPES.ISceneView);
  });

  test.todo("createScene test");

  test("createRenderLoop calls the sceneView", () => {
    scenePresenter.createRenderLoop();
    expect(createRenderLoopMock).toHaveBeenCalledTimes(1);
  });
});
