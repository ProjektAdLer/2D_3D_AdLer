import {
  Camera,
  ISceneLoaderAsyncResult,
  ISceneLoaderProgressEvent,
  Mesh,
  NullEngine,
  Scene,
  SceneLoader,
} from "@babylonjs/core";
import { mock } from "jest-mock-extended";
import { logger } from "../../../../../Lib/Logger";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import ICreateSceneClass from "../../../../Core/Presentation/Babylon/SceneManagement/ICreateSceneClass";
import ScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/ScenePresenter";

jest.mock("@babylonjs/core");
jest.mock("src/Lib/Logger");

describe("scenePresenter", () => {
  let systemUnderTest: ScenePresenter;

  beforeAll(() => {
    // TODO: setup NullEngine for testing
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
    systemUnderTest["scene"] = createdScene;

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
      systemUnderTest["scene"],
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
    expect(systemUnderTest["navigationMeshes"]).toHaveLength(1);
    expect(systemUnderTest["navigationMeshes"]).toContain(meshMock);
  });

  test("createMesh creates a mesh", () => {
    let mesh = systemUnderTest.createMesh("testMesh");

    expect(mesh).toBeInstanceOf(Mesh);
    expect(systemUnderTest["navigationMeshes"]).not.toContain(mesh);
  });

  test("createMesh adds mesh to navigation meshes, when isRelevantForNavigation in set true", () => {
    let mesh = systemUnderTest.createMesh("testMesh", true);

    expect(mesh).toBeInstanceOf(Mesh);
    expect(systemUnderTest["navigationMeshes"]).toContain(mesh);
  });

  test("NavigationMeshes getter returns navigation meshes from viewmodel", () => {
    let testMeshes = [systemUnderTest.createMesh("test", true)];

    expect(systemUnderTest.NavigationMeshes).toEqual(testMeshes);
  });

  test("registerNavigationMesh adds mesh to navigation meshes", () => {
    let testMesh = new Mesh("test");

    systemUnderTest.registerNavigationMesh(testMesh);

    expect(systemUnderTest["navigationMeshes"]).toContain(testMesh);
  });

  test("createScene sets a new scene in the SceneViewModel", () => {
    const createSceneClassMock = mock<ICreateSceneClass>();
    createSceneClassMock.preTasks = [];

    systemUnderTest
      .createScene(new NullEngine(), createSceneClassMock)
      .then(() => {
        expect(createSceneClassMock.createScene).toHaveBeenCalledTimes(1);
        expect(systemUnderTest["scene"]).toBe(
          createSceneClassMock.createScene.mock.results[0].value
        );
      });
  });

  test("createRenderLoop calls the sceneView", async () => {
    const createSceneClassMock = mock<ICreateSceneClass>();
    createSceneClassMock.preTasks = [];
    const nullEngine = new NullEngine();
    const sceneMock = mock<Scene>();
    sceneMock.getEngine.mockReturnValue(nullEngine);
    createSceneClassMock.createScene.mockResolvedValue(sceneMock);

    // create scene to register engine by extension
    await systemUnderTest.createScene(nullEngine, createSceneClassMock);

    systemUnderTest.startRenderLoop();

    expect(nullEngine.runRenderLoop).toHaveBeenCalledWith(
      systemUnderTest["renderFunction"]
    );
  });

  test("renderFunction calls render on the scene", async () => {
    const createSceneClassMock = mock<ICreateSceneClass>();
    createSceneClassMock.preTasks = [];
    const sceneMock = mock<Scene>();
    createSceneClassMock.createScene.mockResolvedValue(sceneMock);
    sceneMock.activeCamera = mock<Camera>();

    await systemUnderTest.createScene(new NullEngine(), createSceneClassMock);

    systemUnderTest["renderFunction"]();

    expect(sceneMock.render).toHaveBeenCalledTimes(1);
  });

  test("renderFunction warns if no active camera is in the scene", async () => {
    const createSceneClassMock = mock<ICreateSceneClass>();
    createSceneClassMock.preTasks = [];
    const sceneMock = mock<Scene>();
    createSceneClassMock.createScene.mockResolvedValue(sceneMock);
    sceneMock.activeCamera = null;

    await systemUnderTest.createScene(new NullEngine(), createSceneClassMock);

    systemUnderTest["renderFunction"]();

    expect(logger.warn).toHaveBeenCalledWith("no active camera..");
  });
});
