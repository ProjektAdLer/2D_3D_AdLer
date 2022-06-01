import { mock, mockClear } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import EngineManager from "../../../../Core/Presentation/Babylon/EngineManager/EngineManager";
import ICreateSceneClass from "../../../../Core/Presentation/Babylon/SceneManagement/ICreateSceneClass";
import IscenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IscenePresenter";
import SceneView from "../../../../Core/Presentation/Babylon/SceneManagement/SceneView";
import SceneViewModel from "../../../../Core/Presentation/Babylon/SceneManagement/SceneViewModel";

jest.mock("@babylonjs/core");

const startRenderLoopMock = jest.spyOn(SceneView.prototype, "startRenderLoop");

const getSceneMock = jest.spyOn(SceneViewModel.prototype, "Scene", "get");
const setSceneMock = jest.spyOn(SceneViewModel.prototype, "Scene", "set");

describe("scenePresenter", () => {
  let scenePresenter: IscenePresenter;
  let engineManager: EngineManager;

  beforeEach(() => {
    engineManager = CoreDIContainer.get(CORE_TYPES.IEngineManager);
    engineManager.createEngine(document.createElement("canvas"));
    scenePresenter = CoreDIContainer.get(CORE_TYPES.IscenePresenter);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("createScene sets a new scene in the SceneViewModel", () => {
    const createSceneClassMock = mock<ICreateSceneClass>();
    createSceneClassMock.preTasks = null;

    scenePresenter.createScene(createSceneClassMock).then(() => {
      expect(createSceneClassMock.createScene).toHaveBeenCalledTimes(1);
      expect(setSceneMock).toHaveBeenCalledTimes(1);
    });
  });

  test("createRenderLoop calls the sceneView", () => {
    scenePresenter.startRenderLoop();
    expect(startRenderLoopMock).toHaveBeenCalledTimes(1);
  });

  test("Scene getter calls SceneViewModel", () => {
    scenePresenter.Scene;
    expect(getSceneMock).toHaveBeenCalledTimes(1);
  });
});
