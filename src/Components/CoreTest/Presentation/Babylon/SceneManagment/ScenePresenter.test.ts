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
import { config } from "../../../../../config";
import ScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/ScenePresenter";
import TestSceneDefinition, {
  fillTestSceneDefinitionHighlightLayerGetter,
  fillTestSceneDefinitionSceneGetter,
} from "./TestSceneDefinition";
import Logger from "../../../../Core/Adapters/Logger/Logger";
import { Inspector } from "@babylonjs/inspector";

jest.mock("@babylonjs/core");

describe("scenePresenter", () => {
  let systemUnderTest: ScenePresenter;
  let testSceneDefinition: TestSceneDefinition;

  beforeAll(() => {
    config.isDebug = false;
  });

  beforeEach(() => {
    testSceneDefinition = new TestSceneDefinition();
    systemUnderTest = new ScenePresenter(testSceneDefinition);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Scene getter throws if no scene is set", () => {
    expect(() => {
      systemUnderTest.Scene;
    }).toThrowError("Scene is not initialized yet");
  });

  test("Scene getter returns scene from sceneDefinition", () => {
    const createdScene =
      fillTestSceneDefinitionSceneGetter(testSceneDefinition);

    expect(systemUnderTest.Scene).toBe(createdScene);
  });

  test("HighlightLayer getter throws if not set", () => {
    expect(() => {
      systemUnderTest.HighlightLayer;
    }).toThrowError("HighlightLayer is not initialized yet");
  });

  test("HighlightLayer getter returns layer from sceneDefinition", () => {
    const createdHighlighLayer =
      fillTestSceneDefinitionHighlightLayerGetter(testSceneDefinition);

    expect(systemUnderTest.HighlightLayer).toBe(createdHighlighLayer);
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
    fillTestSceneDefinitionSceneGetter(testSceneDefinition);

    let result = await systemUnderTest.loadModel(url, false, onProgress);

    expect(SceneLoader.ImportMeshAsync).toHaveBeenCalledTimes(1);
    expect(SceneLoader.ImportMeshAsync).toHaveBeenCalledWith(
      "",
      url,
      "",
      systemUnderTest.Scene,
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
    fillTestSceneDefinitionSceneGetter(testSceneDefinition);

    await systemUnderTest.loadModel(url, true);

    expect(SceneLoader.ImportMeshAsync).toHaveBeenCalledTimes(1);
    expect(systemUnderTest["navigationMeshes"]).toHaveLength(1);
    expect(systemUnderTest["navigationMeshes"]).toContain(meshMock);
  });

  test("loadGLTFModel calls SceneLoader.ImportMeshAsync", async () => {
    const url = "test.glb";
    const onProgress = (event: ISceneLoaderProgressEvent) => {};
    SceneLoader.ImportMeshAsync = jest.fn();
    fillTestSceneDefinitionSceneGetter(testSceneDefinition);

    await systemUnderTest.loadGLTFModel(url, false, onProgress);

    expect(SceneLoader.ImportMeshAsync).toHaveBeenCalledTimes(1);
    expect(SceneLoader.ImportMeshAsync).toHaveBeenCalledWith(
      "",
      url,
      "",
      systemUnderTest.Scene,
      onProgress
    );
  });

  test("loadGLTFModel adds mesh to navigation meshes, when isRelevantForNavigation in set true", async () => {
    const url = "test.glb";
    const meshMock = mock<Mesh>();
    SceneLoader.ImportMeshAsync = jest.fn().mockImplementation(() => {
      let result = mock<ISceneLoaderAsyncResult>();
      //@ts-ignore
      result.meshes = [meshMock];
      return Promise.resolve(result);
    });
    fillTestSceneDefinitionSceneGetter(testSceneDefinition);

    await systemUnderTest.loadGLTFModel(url, true);

    expect(SceneLoader.ImportMeshAsync).toHaveBeenCalledTimes(1);
    expect(systemUnderTest["navigationMeshes"]).toHaveLength(1);
    expect(systemUnderTest["navigationMeshes"]).toContain(meshMock);
  });

  test("createMesh creates a mesh", () => {
    fillTestSceneDefinitionSceneGetter(testSceneDefinition);

    let mesh = systemUnderTest.createMesh("testMesh");

    expect(mesh).toBeInstanceOf(Mesh);
    expect(systemUnderTest["navigationMeshes"]).not.toContain(mesh);
  });

  test("createMesh adds mesh to navigation meshes, when isRelevantForNavigation in set true", () => {
    fillTestSceneDefinitionSceneGetter(testSceneDefinition);

    let mesh = systemUnderTest.createMesh("testMesh", true);

    expect(mesh).toBeInstanceOf(Mesh);
    expect(systemUnderTest["navigationMeshes"]).toContain(mesh);
  });

  test("NavigationMeshes getter returns navigation meshes from viewmodel", () => {
    fillTestSceneDefinitionSceneGetter(testSceneDefinition);
    let testMeshes = [systemUnderTest.createMesh("test", true)];

    expect(systemUnderTest.NavigationMeshes).toEqual(testMeshes);
  });

  test("registerNavigationMesh adds mesh to navigation meshes", () => {
    let testMesh = new Mesh("test");

    systemUnderTest.registerNavigationMesh(testMesh);

    expect(systemUnderTest["navigationMeshes"]).toContain(testMesh);
  });

  test("createScene sets a new scene in the SceneViewModel", () => {
    testSceneDefinition.createScene = jest.fn();
    systemUnderTest.createScene(new NullEngine()).then(() => {
      expect(testSceneDefinition.createScene).toHaveBeenCalledTimes(1);
    });
  });

  test("createRenderLoop calls the sceneView", async () => {
    const nullEngine = new NullEngine();
    const sceneMock = mock<Scene>();
    sceneMock.getEngine.mockReturnValue(nullEngine);
    testSceneDefinition["scene"] = sceneMock;

    systemUnderTest.startRenderLoop();

    expect(nullEngine.runRenderLoop).toHaveBeenCalledWith(
      systemUnderTest["renderFunction"]
    );
  });

  test("renderFunction calls render on the scene", async () => {
    const sceneMock = mock<Scene>();
    testSceneDefinition["scene"] = sceneMock;
    sceneMock.activeCamera = mock<Camera>();

    systemUnderTest["renderFunction"]();

    expect(sceneMock.render).toHaveBeenCalledTimes(1);
  });

  test("renderFunction warns if no active camera is in the scene", async () => {
    const sceneMock = mock<Scene>();
    testSceneDefinition["scene"] = sceneMock;
    sceneMock.activeCamera = null;
    const loggerMock = jest.spyOn(Logger.prototype, "log");

    systemUnderTest["renderFunction"]();

    expect(loggerMock).toHaveBeenCalledWith("WARN", "no active camera..");
  });

  test("toggleInspector calls Inspector.Show when inspector isn't visible", async () => {
    Inspector.Show = jest.fn();
    jest.spyOn(Inspector, "IsVisible", "get").mockReturnValue(false);
    jest.spyOn(systemUnderTest, "Scene", "get").mockReturnValue(mock<Scene>());

    systemUnderTest.toggleInspector();

    expect(Inspector.Show).toHaveBeenCalledTimes(1);
  });

  test("toggleInspector calls Inspector.Hide when inspector is visible", async () => {
    Inspector.Hide = jest.fn();
    jest.spyOn(Inspector, "IsVisible", "get").mockReturnValue(true);

    systemUnderTest.toggleInspector();

    expect(Inspector.Hide).toHaveBeenCalledTimes(1);
  });

  test("AddDisposeSceneCallback adds callback that is called when scene is disposed", () => {
    testSceneDefinition.disposeScene = jest.fn();
    const callback = jest.fn();
    systemUnderTest.addDisposeSceneCallback(callback);

    systemUnderTest.disposeScene();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("disposeScene calls disposeScene on sceneDefinition", () => {
    testSceneDefinition.disposeScene = jest.fn();

    systemUnderTest.disposeScene();

    expect(testSceneDefinition.disposeScene).toHaveBeenCalledTimes(1);
  });
});
