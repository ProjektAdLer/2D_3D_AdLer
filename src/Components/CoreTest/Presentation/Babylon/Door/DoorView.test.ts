import {
  AbstractMesh,
  NullEngine,
  Quaternion,
  Scene,
  Tools,
  Vector3,
} from "@babylonjs/core";
import { mockDeep } from "jest-mock-extended";
import { setTimeout } from "timers/promises";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import DoorController from "../../../../Core/Presentation/Babylon/Door/DoorController";
import DoorView from "../../../../Core/Presentation/Babylon/Door/DoorView";
import DoorViewModel from "../../../../Core/Presentation/Babylon/Door/DoorViewModel";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

function buildSystemUnderTest(): [DoorViewModel, DoorView] {
  const viewModel = new DoorViewModel();
  const controller = new DoorController(viewModel);
  const systemUnderTest = new DoorView(viewModel, controller);
  return [viewModel, systemUnderTest];
}

describe("DoorView", () => {
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

  test("constructor subscribes to viewModel.position", () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    expect(viewModel.position["subscribers"]).toStrictEqual([
      systemUnderTest["positionMesh"],
    ]);
  });

  test("constructor subscribes to viewModel.rotation", () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    expect(viewModel.rotation["subscribers"]).toStrictEqual([
      systemUnderTest["positionMesh"],
    ]);
  });

  test("constructor subscribes to viewModel.isOpen", () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();

    expect(viewModel.isOpen["subscribers"]).toStrictEqual([
      systemUnderTest["onIsOpenChanged"],
    ]);
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

  test("asyncSetup/setupAnimation creates a new animation and applies it to the first mesh", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();

    await systemUnderTest.isReady.then(() => {
      expect(viewModel.meshes.Value[0].animations.length).toBe(1);
    });
  });

  test("positionMesh sets position of the first mesh to viewModel.position", async () => {
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

  test("positionMesh sets rotation of the first mesh to viewModel.rotation", async () => {
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

  test("onIsOpenChanged calls beginAnimation on the scene if viewModel.isOpen is true", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);
    const [viewModel, systemUnderTest] = buildSystemUnderTest();

    await systemUnderTest.isReady.then(async () => {
      viewModel.isOpen.Value = true;
      await setTimeout(100);

      expect(scenePresenterMock.Scene.beginAnimation).toHaveBeenCalledTimes(1);
      expect(scenePresenterMock.Scene.beginAnimation).toHaveBeenCalledWith(
        viewModel.meshes.Value[0],
        expect.any(Number),
        expect.any(Number)
      );
    });
  });
});
