import { NullEngine, Scene } from "@babylonjs/core";
import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import EngineManager from "../../../../Core/Presentation/Babylon/EngineManager/EngineManager";
import ICreateSceneClass from "../../../../Core/Presentation/Babylon/SceneManagement/ICreateSceneClass";
import IscenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IscenePresenter";
import SceneView from "../../../../Core/Presentation/Babylon/SceneManagement/SceneView";

jest.mock("@babylonjs/core");

const startRenderLoopMock = jest.spyOn(SceneView.prototype, "startRenderLoop");

describe("scenePresenter", () => {
  let scenePresenter: IscenePresenter;
  let engineManager: EngineManager;

  beforeEach(() => {
    engineManager = CoreDIContainer.get(CORE_TYPES.IEngineManager);
    engineManager.createEngine(document.createElement("canvas"));
    scenePresenter = CoreDIContainer.get(CORE_TYPES.IScenePresenter);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("createScene sets a new scene in the SceneViewModel", () => {
    const createSceneClassMock = mock<ICreateSceneClass>();
    createSceneClassMock.preTasks = undefined;

    scenePresenter.createScene(createSceneClassMock).then(() => {
      expect(createSceneClassMock.createScene).toHaveBeenCalledTimes(1);
      expect(scenePresenter["viewModel"].scene).toBe(
        createSceneClassMock.createScene.mock.results[0].value
      );
    });
  });

  test("createRenderLoop calls the sceneView", () => {
    scenePresenter.startRenderLoop();
    expect(startRenderLoopMock).toHaveBeenCalledTimes(1);
  });

  test("Scene getter returns scene from viewmodel", () => {
    let createdScene = new Scene(new NullEngine());
    scenePresenter["viewModel"].scene = createdScene;

    expect(scenePresenter.Scene).toBe(createdScene);
  });
});
