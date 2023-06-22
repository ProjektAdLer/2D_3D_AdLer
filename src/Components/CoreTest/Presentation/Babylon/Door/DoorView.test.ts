import {
  AbstractMesh,
  NullEngine,
  Quaternion,
  Scene,
  Tools,
  Vector3,
} from "@babylonjs/core";
import { mock, mockDeep } from "jest-mock-extended";
import { setTimeout } from "timers/promises";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import DoorView from "../../../../Core/Presentation/Babylon/Door/DoorView";
import DoorViewModel from "../../../../Core/Presentation/Babylon/Door/DoorViewModel";
import IDoorController from "../../../../Core/Presentation/Babylon/Door/IDoorController";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

function buildSystemUnderTest(): [DoorViewModel, DoorView] {
  const viewModel = new DoorViewModel();
  const controller = mock<IDoorController>();
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

    const [, systemUnderTest] = buildSystemUnderTest();
    expect(systemUnderTest["scenePresenter"]).toBeDefined();
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

    const [, systemUnderTest] = buildSystemUnderTest();
    await systemUnderTest.asyncSetup();
    expect(scenePresenterMock.loadModel).toHaveBeenCalledTimes(1);
  });

  test("asyncSetup/loadMeshAsync sets rotationQuaternion of each loaded mesh to null", async () => {
    const mesh1 = new AbstractMesh("TestMesh1", new Scene(new NullEngine()));
    mesh1.rotationQuaternion = new Quaternion();
    const mesh2 = new AbstractMesh("TestMesh2", new Scene(new NullEngine()));
    mesh2.rotationQuaternion = new Quaternion();
    scenePresenterMock.loadModel.mockResolvedValue([mesh1, mesh2]);

    const [, systemUnderTest] = buildSystemUnderTest();

    await systemUnderTest.asyncSetup();
    expect(mesh1.rotationQuaternion).toBeNull();
    expect(mesh2.rotationQuaternion).toBeNull();
  });

  test("asyncSetup/setupAnimation creates a new animation and applies it to the first mesh", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.isExit = true;
    await systemUnderTest.asyncSetup();
    expect(viewModel.meshes[0].animations.length).toBe(1);
  });

  test("positionMesh sets position of the first mesh to viewModel.position", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);
    const [viewModel, systemUnderTest] = buildSystemUnderTest();

    const position = new Vector3(1, 2, 3);
    viewModel.position = position;
    await systemUnderTest.asyncSetup();
    expect(viewModel.meshes[0].position).toStrictEqual(position);
  });

  test("positionMesh sets rotation of the first mesh to viewModel.rotation", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);
    const [viewModel, systemUnderTest] = buildSystemUnderTest();

    const newRotation = 42;
    viewModel.rotation = newRotation;
    await systemUnderTest.asyncSetup();

    expect(viewModel.meshes[0].rotation.y).toStrictEqual(
      Tools.ToRadians(newRotation)
    );
  });

  test("onIsOpenChanged calls beginAnimation on the scene if viewModel.isOpen is true", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);
    const [viewModel, systemUnderTest] = buildSystemUnderTest();

    await systemUnderTest.asyncSetup();
    viewModel.isOpen.Value = true;
    await setTimeout(100);

    expect(scenePresenterMock.Scene.beginAnimation).toHaveBeenCalledTimes(1);
    expect(scenePresenterMock.Scene.beginAnimation).toHaveBeenCalledWith(
      viewModel.meshes[0],
      expect.any(Number),
      expect.any(Number)
    );
  });
});
