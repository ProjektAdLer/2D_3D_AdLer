import {
  AbstractMesh,
  NullEngine,
  Quaternion,
  Scene,
  Tools,
  Vector3,
} from "@babylonjs/core";
import { mock, mockDeep } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import WindowView from "../../../../Core/Presentation/Babylon/Window/WindowView";
import WindowViewModel from "../../../../Core/Presentation/Babylon/Window/WindowViewModel";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

function buildSystemUnderTest(): [WindowViewModel, WindowView] {
  const viewModel = new WindowViewModel();
  const systemUnderTest = new WindowView(viewModel);
  return [viewModel, systemUnderTest];
}

describe("WindowView", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.clearAllMocks();
  });

  test("constructor injects scenePresenter", () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    expect(systemUnderTest["scenePresenter"]).toBeDefined();
  });

  test("asyncSetup/loadMeshAsync calls scenePresenter.loadModel", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();

    await systemUnderTest.isReady.then(() => {
      expect(scenePresenterMock.loadModel).toHaveBeenCalledTimes(1);
    });
  });

  test("asyncSetup/loadMeshAsync sets rotationQuaternion of each loaded mesh to null", async () => {
    const mesh1 = new AbstractMesh("TestMesh1", new Scene(new NullEngine()));
    mesh1.rotationQuaternion = new Quaternion();
    const mesh2 = new AbstractMesh("TestMesh2", new Scene(new NullEngine()));
    mesh2.rotationQuaternion = new Quaternion();
    scenePresenterMock.loadModel.mockResolvedValue([mesh1, mesh2]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();

    await systemUnderTest.isReady.then(() => {
      expect(mesh1.rotationQuaternion).toBeNull();
      expect(mesh2.rotationQuaternion).toBeNull();
    });
  });

  test.skip("positionWindowMesh sets position of the first mesh to viewModel.position", async () => {
    //these two tests are currently skipped, as positionWindowMesh is not called after adjusting the position or rotation of the window
    //(Compare with the door tests, where the same is not the case) ~FK
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);
    const [viewModel, systemUnderTest] = buildSystemUnderTest();

    await systemUnderTest.isReady.then(() => {
      const newPosition = new Vector3(1, 2, 3);
      viewModel.position.Value = newPosition;

      expect(viewModel.meshes.Value[0].position).toStrictEqual(newPosition);
    });
  });

  test.skip("positionWindowMesh sets rotation of the first mesh to viewModel.rotation", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);
    const [viewModel, systemUnderTest] = buildSystemUnderTest();

    await systemUnderTest.isReady.then(() => {
      const newRotation = 42;
      viewModel.rotation.Value = newRotation;

      expect(viewModel.meshes.Value[0].rotation.y).toStrictEqual(
        Tools.ToRadians(newRotation)
      );
    });
  });
});
