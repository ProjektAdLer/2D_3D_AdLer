import { Engine } from "@babylonjs/core";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import SceneView from "../../../../Core/Presentation/Babylon/SceneManagement/SceneView";

jest.mock("@babylonjs/core");

const runRenderLoopMock = jest.spyOn(Engine.prototype, "runRenderLoop");

describe("SceneView", () => {
  let sceneView: SceneView;

  beforeEach(() => {
    sceneView = CoreDIContainer.get(CORE_TYPES.ISceneView);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("startRenderLoop call the babylon engine", () => {
    sceneView.startRenderLoop(new Engine(document.createElement("canvas")));
    expect(runRenderLoopMock).toHaveBeenCalledTimes(1);
    // todo: maybe extend this to expect to be called with another function as argument -MK
  });
});
