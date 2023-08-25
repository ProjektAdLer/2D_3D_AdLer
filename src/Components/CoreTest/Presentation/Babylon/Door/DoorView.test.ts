import {
  AbstractMesh,
  Mesh,
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
import { LearningSpaceThemeType } from "../../../../Core/Domain/Types/LearningSpaceThemeTypes";

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

  test("constructor does not subscribe to viewModel.isOpen when isOpen is true, calls animation instead", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const viewModel = new DoorViewModel();
    viewModel.isOpen.Value = true;
    viewModel.theme = LearningSpaceThemeType.Campus;

    const controller = mock<IDoorController>();
    const systemUnderTest = new DoorView(viewModel, controller);

    await systemUnderTest.asyncSetup();

    expect(viewModel.isOpen["subscribers"]).toStrictEqual([]);
    expect(scenePresenterMock.Scene.beginAnimation).toHaveBeenCalledTimes(1);
    expect(scenePresenterMock.Scene.beginAnimation).toHaveBeenCalledWith(
      viewModel.meshes[0],
      expect.any(Number),
      expect.any(Number)
    );
  });

  test("asyncSetup/loadMeshAsync calls scenePresenter.loadModel", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = LearningSpaceThemeType.Campus;

    await systemUnderTest.asyncSetup();
    expect(scenePresenterMock.loadModel).toHaveBeenCalledTimes(1);
  });

  test("asyncSetup/loadMeshAsync sets rotationQuaternion of each loaded mesh to null", async () => {
    const mesh1 = new AbstractMesh("TestMesh1", new Scene(new NullEngine()));
    mesh1.rotationQuaternion = new Quaternion();
    const mesh2 = new AbstractMesh("TestMesh2", new Scene(new NullEngine()));
    mesh2.rotationQuaternion = new Quaternion();
    scenePresenterMock.loadModel.mockResolvedValue([mesh1, mesh2]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = LearningSpaceThemeType.Campus;

    await systemUnderTest.asyncSetup();
    expect(mesh1.rotationQuaternion).toBeNull();
    expect(mesh2.rotationQuaternion).toBeNull();
  });

  test("setupAnimation throws error if no mesh with id Door are loaded", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.meshes = [
      new AbstractMesh("TestMesh", new Scene(new NullEngine())) as Mesh,
    ];

    expect(() => systemUnderTest["setupAnimation"]()).toThrowError(
      "Door mesh not found"
    );
  });

  test("asyncSetup/setupAnimation creates a new animation and applies it to the first mesh", async () => {
    const mockMesh = new AbstractMesh("Door", new Scene(new NullEngine()));
    scenePresenterMock.loadModel.mockResolvedValue([mockMesh]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.isExit = true;
    viewModel.theme = LearningSpaceThemeType.Campus;

    await systemUnderTest.asyncSetup();

    expect(mockMesh.animations.length).toBe(1);
  });

  test("positionMesh sets position of the first mesh to viewModel.position", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = LearningSpaceThemeType.Campus;
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
    viewModel.theme = LearningSpaceThemeType.Campus;

    await systemUnderTest.asyncSetup();

    expect(viewModel.meshes[0].rotation.y).toStrictEqual(
      Tools.ToRadians(newRotation)
    );
  });

  test("onIsOpenChanged calls beginAnimation on the scene if viewModel.isOpen is true", async () => {
    const mockMesh = new AbstractMesh("Door", new Scene(new NullEngine()));
    scenePresenterMock.loadModel.mockResolvedValue([mockMesh]);
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = LearningSpaceThemeType.Campus;

    await systemUnderTest.asyncSetup();
    viewModel.isOpen.Value = true;
    await setTimeout(100);

    expect(scenePresenterMock.Scene.beginAnimation).toHaveBeenCalledTimes(1);
    expect(scenePresenterMock.Scene.beginAnimation).toHaveBeenCalledWith(
      mockMesh,
      expect.any(Number),
      expect.any(Number)
    );
  });
});
