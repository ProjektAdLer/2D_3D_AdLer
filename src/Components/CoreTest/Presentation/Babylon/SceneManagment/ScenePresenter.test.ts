import { Mesh, NullEngine, Scene } from "@babylonjs/core";
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
    // snapshot and restore the container to clear all singletons between tests
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
