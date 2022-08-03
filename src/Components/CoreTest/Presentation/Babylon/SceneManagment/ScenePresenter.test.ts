import {
  ISceneLoaderAsyncResult,
  ISceneLoaderProgressEvent,
  Mesh,
  NullEngine,
  Scene,
  SceneLoader,
} from "@babylonjs/core";
import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IEngineManager from "../../../../Core/Presentation/Babylon/EngineManager/IEngineManager";
import ICreateSceneClass from "../../../../Core/Presentation/Babylon/SceneManagement/ICreateSceneClass";
import ScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/ScenePresenter";
import SceneView from "../../../../Core/Presentation/Babylon/SceneManagement/SceneView";

jest.mock("@babylonjs/core");

const startRenderLoopMock = jest.spyOn(SceneView.prototype, "startRenderLoop");

describe("scenePresenter", () => {
  let systemUnderTest: ScenePresenter;

  beforeAll(() => {
    // setup engine manager with NullEngine for testing
    let engineManager = CoreDIContainer.get<IEngineManager>(
      CORE_TYPES.IEngineManager
    );
    engineManager["engine"] = new NullEngine();
  });

  beforeEach(() => {
    // snapshot and restore the container to clear all injected singletons between tests
    CoreDIContainer.snapshot();
    systemUnderTest = CoreDIContainer.resolve(ScenePresenter);
    CoreDIContainer.restore();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Scene getter throws if no scene is set", () => {
    expect(() => {
      systemUnderTest.Scene;
    }).toThrowError("There is no scene set.");
  });

  test("Scene getter returns scene from viewmodel", () => {
    let createdScene = new Scene(new NullEngine());
    systemUnderTest["viewModel"].scene = createdScene;

    expect(systemUnderTest.Scene).toBe(createdScene);
  });

  test("loadModel calls SceneLoader.ImportMeshAsync", async () => {
    const url = "test.glb";
    const meshMock = mock<Mesh>();
    const onProgress = (event: ISceneLoaderProgressEvent) => {};
    SceneLoader.ImportMeshAsync = jest.fn().mockImplementation(() => {
      let result = mock<ISceneLoaderAsyncResult>();
      //@ts-ignore
      result.meshes = [meshMock];
      return Promise.resolve(result);
    });

    let result = await systemUnderTest.loadModel(url, false, onProgress);

    expect(SceneLoader.ImportMeshAsync).toHaveBeenCalledTimes(1);
    expect(SceneLoader.ImportMeshAsync).toHaveBeenCalledWith(
      "",
      url,
      "",
      systemUnderTest["viewModel"].scene,
      onProgress
    );
    expect(result).toEqual([meshMock]);
  });

  test("loadModel adds mesh to navigation meshes, when isRelevantForNavigation in set true", async () => {
    const url = "test.glb";
    const meshMock = mock<Mesh>();
    SceneLoader.ImportMeshAsync = jest.fn().mockImplementation(() => {
      let result = mock<ISceneLoaderAsyncResult>();
      //@ts-ignore
      result.meshes = [meshMock];
      return Promise.resolve(result);
    });

    await systemUnderTest.loadModel(url, true);

    expect(SceneLoader.ImportMeshAsync).toHaveBeenCalledTimes(1);
    expect(systemUnderTest["viewModel"].navigationMeshes).toHaveLength(1);
    expect(systemUnderTest["viewModel"].navigationMeshes).toContain(meshMock);
  });

  test("createMesh creates a mesh", () => {
    let mesh = systemUnderTest.createMesh("testMesh");

    expect(mesh).toBeInstanceOf(Mesh);
    expect(systemUnderTest["viewModel"].navigationMeshes).not.toContain(mesh);
  });

  test("createMesh adds mesh to navigation meshes, when isRelevantForNavigation in set true", () => {
    let mesh = systemUnderTest.createMesh("testMesh", true);

    expect(mesh).toBeInstanceOf(Mesh);
    expect(systemUnderTest["viewModel"].navigationMeshes).toContain(mesh);
  });

  test("NavigationMeshes getter returns navigation meshes from viewmodel", () => {
    let testMeshes = [systemUnderTest.createMesh("test", true)];

    expect(systemUnderTest.NavigationMeshes).toEqual(testMeshes);
  });

  test("registerNavigationMesh adds mesh to navigation meshes", () => {
    let testMesh = new Mesh("test");

    systemUnderTest.registerNavigationMesh(testMesh);

    expect(systemUnderTest["viewModel"].navigationMeshes).toContain(testMesh);
  });

  test("createScene sets a new scene in the SceneViewModel", () => {
    const createSceneClassMock = mock<ICreateSceneClass>();
    createSceneClassMock.preTasks = undefined;

    systemUnderTest.createScene(createSceneClassMock).then(() => {
      expect(createSceneClassMock.createScene).toHaveBeenCalledTimes(1);
      expect(systemUnderTest["viewModel"].scene).toBe(
        createSceneClassMock.createScene.mock.results[0].value
      );
    });
  });

  test("createRenderLoop calls the sceneView", () => {
    systemUnderTest.startRenderLoop();
    expect(startRenderLoopMock).toHaveBeenCalledTimes(1);
  });
});
