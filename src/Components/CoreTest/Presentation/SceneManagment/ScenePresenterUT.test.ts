import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import EngineManager from "../../../Core/Presentation/EngineManager/EngineManager";
import ISceneController from "../../../Core/Presentation/SceneManagment/ISceneController";
import SceneView from "../../../Core/Presentation/SceneManagment/SceneView";
import SceneViewModel from "../../../Core/Presentation/SceneManagment/SceneViewModel";
import ICreateSceneClass from "../../../Core/Presentation/SceneManagment/ICreateSceneClass";

import { mock, mockClear } from "jest-mock-extended";

jest.mock("@babylonjs/core");

const createRenderLoopMock = jest.spyOn(
  SceneView.prototype,
  "createRenderLoop"
);

const getSceneMock = jest.spyOn(SceneViewModel.prototype, "Scene", "get");
const setSceneMock = jest.spyOn(SceneViewModel.prototype, "Scene", "set");

describe("SceneController", () => {
  let sceneController: ISceneController;
  let engineManager: EngineManager;

  beforeEach(() => {
    engineManager = CoreDIContainer.get(CORE_TYPES.IEngineManager);
    engineManager.createEngine(document.createElement("canvas"));
    sceneController = CoreDIContainer.get(CORE_TYPES.ISceneController);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("createScene sets a new scene in the SceneViewModel", () => {
    const createSceneClassMock = mock<ICreateSceneClass>();
    createSceneClassMock.preTasks = null;

    sceneController.createScene(createSceneClassMock).then(() => {
      expect(createSceneClassMock.createScene).toHaveBeenCalledTimes(1);
      expect(setSceneMock).toHaveBeenCalledTimes(1);
    });
  });

  test("createRenderLoop calls the sceneView", () => {
    sceneController.createRenderLoop();
    expect(createRenderLoopMock).toHaveBeenCalledTimes(1);
  });

  test("Scene getter calls SceneViewModel", () => {
    sceneController.Scene;
    expect(getSceneMock).toHaveBeenCalledTimes(1);
  });
});
