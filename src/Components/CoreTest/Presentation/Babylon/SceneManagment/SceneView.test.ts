import { Engine, NullEngine, Scene } from "@babylonjs/core";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import SceneView from "../../../../Core/Presentation/Babylon/SceneManagement/SceneView";

const runRenderLoopMock = jest.spyOn(NullEngine.prototype, "runRenderLoop");

describe("SceneView", () => {
  let sceneView: SceneView;

  beforeEach(() => {
    sceneView = CoreDIContainer.get(CORE_TYPES.ISceneView);
    sceneView["viewModel"].scene = new Scene(new NullEngine());
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("startRenderLoop call the babylon engine", () => {
    sceneView.startRenderLoop();
    expect(runRenderLoopMock).toHaveBeenCalledTimes(1);
  });
});
