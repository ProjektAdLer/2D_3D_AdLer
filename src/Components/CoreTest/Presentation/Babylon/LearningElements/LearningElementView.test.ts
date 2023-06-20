import ILearningElementController from "../../../../Core/Presentation/Babylon/LearningElements/ILearningElementController";
import LearningElementView from "../../../../Core/Presentation/Babylon/LearningElements/LearningElementView";
import LearningElementViewModel from "../../../../Core/Presentation/Babylon/LearningElements/LearningElementViewModel";
import { mock, mockDeep } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import {
  AbstractMesh,
  Color3,
  NullEngine,
  Scene,
  Tools,
  Vector3,
} from "@babylonjs/core";
import { ActionManager } from "@babylonjs/core/Actions/actionManager";

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

function buildSystemUnderTest(): [
  LearningElementViewModel,
  ILearningElementController,
  LearningElementView
] {
  const viewModel = new LearningElementViewModel();
  viewModel.type = "h5p";
  viewModel.position = new Vector3(1, 2, 3);
  const controller = mock<ILearningElementController>();
  const view = new LearningElementView(viewModel, controller);
  return [viewModel, controller, view];
}

describe("LearningElementView", () => {
  let systemUnderTest: LearningElementView;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.restoreAllMocks();
  });

  test("constructor sets up hasScored observable callbacks", () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, ,] = buildSystemUnderTest();

    // only check for length, because the callback is anonymous
    expect(viewModel.hasScored["subscribers"].length).toBe(1);
  });

  test("async setup calls scene presenter to load model and icon", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [, , systemUnderTest] = buildSystemUnderTest();
    await systemUnderTest.setupLearningElement();

    expect(scenePresenterMock.loadModel).toBeCalledTimes(2);
  });

  test("async setup sets an action manager for each model mesh", async () => {
    const scene = new Scene(new NullEngine());
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh1", scene),
      new AbstractMesh("TestMesh2", scene),
    ]);
    const [viewModel, , systemUnderTest] = buildSystemUnderTest();
    viewModel.modelType = "";

    await systemUnderTest.setupLearningElement();

    viewModel.modelMeshes.forEach((mesh) => {
      expect(mesh.actionManager).toBeDefined();
    });
  });

  test("async setup sets an action manager for each icon mesh", async () => {
    const scene = new Scene(new NullEngine());
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh1", scene),
      new AbstractMesh("TestMesh2", scene),
    ]);

    const [viewModel, , systemUnderTest] = buildSystemUnderTest();

    await systemUnderTest.setupLearningElement();

    viewModel.iconMeshes.forEach((mesh) => {
      expect(mesh.actionManager).toBeDefined();
    });
  });

  test("async setup registers onPickTrigger callback for the all meshes", async () => {
    const registerActionSpy = jest.spyOn(
      ActionManager.prototype,
      "registerAction"
    );
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh1", new Scene(new NullEngine())),
    ]);

    const [, controller, systemUnderTest] = buildSystemUnderTest();
    await systemUnderTest.setupLearningElement();

    // check to see if registerAction was called with the onPickTrigger callback
    expect(registerActionSpy.mock.calls).toEqual(
      expect.arrayContaining([
        [
          expect.objectContaining({
            trigger: ActionManager.OnPickTrigger,
            func: controller.clicked,
          }),
        ],
      ])
    );
  });

  test("async setup registers onPointerOverTrigger callback for the all meshes", async () => {
    const registerActionSpy = jest.spyOn(
      ActionManager.prototype,
      "registerAction"
    );
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh1", new Scene(new NullEngine())),
    ]);

    const [, controller, systemUnderTest] = buildSystemUnderTest();
    await systemUnderTest.setupLearningElement();

    // check to see if registerAction was called with the onPointerOverTrigger callback
    expect(registerActionSpy.mock.calls).toEqual(
      expect.arrayContaining([
        [
          expect.objectContaining({
            trigger: ActionManager.OnPointerOverTrigger,
            func: controller.pointerOver,
          }),
        ],
      ])
    );
  });

  test("async setup registers onPointerOutTrigger callback for the all meshes", async () => {
    const registerActionSpy = jest.spyOn(
      ActionManager.prototype,
      "registerAction"
    );
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh1", new Scene(new NullEngine())),
    ]);

    const [, controller, systemUnderTest] = buildSystemUnderTest();
    await systemUnderTest.setupLearningElement();

    // check to see if registerAction was called with the onPointerOutTrigger callback
    expect(registerActionSpy.mock.calls).toEqual(
      expect.arrayContaining([
        [
          expect.objectContaining({
            trigger: ActionManager.OnPointerOutTrigger,
            func: controller.pointerOut,
          }),
        ],
      ])
    );
  });

  test("async setup adds each mesh to the scene presenters HighlightLayer", async () => {
    const mesh = new AbstractMesh("TestMesh1", new Scene(new NullEngine()));
    scenePresenterMock.loadModel.mockResolvedValue([mesh]);

    const [, , systemUnderTest] = buildSystemUnderTest();
    await systemUnderTest.setupLearningElement();

    expect(scenePresenterMock.HighlightLayer.addMesh).toBeCalledWith(
      mesh,
      expect.any(Color3)
    );
  });

  test("positionModel changes the model position when the position value in the viewModel is changed", async () => {
    // mock resolve value twice to circumvent returning the same mesh twice
    scenePresenterMock.loadModel
      .mockResolvedValueOnce([
        new AbstractMesh("TestMesh", new Scene(new NullEngine())),
      ])
      .mockResolvedValueOnce([
        new AbstractMesh("TestMesh", new Scene(new NullEngine())),
      ]);

    const [viewModel, , systemUnderTest] = buildSystemUnderTest();
    viewModel.position = new Vector3(42, 42, 42);

    await systemUnderTest.setupLearningElement();

    expect(viewModel.modelMeshes[0].position).toEqual(new Vector3(42, 42, 42));
    expect(viewModel.iconMeshes[0].position).toEqual(
      new Vector3(42, 42 + viewModel.iconYOffset, 42)
    );
  });

  test("positionModel changes the model rotation when the rotation value in the viewModel is changed", async () => {
    const mockedMesh = mockDeep<AbstractMesh>();
    scenePresenterMock.loadModel.mockResolvedValue([mockedMesh]);

    const [viewModel, , systemUnderTest] = buildSystemUnderTest();
    viewModel.rotation = 42;

    await systemUnderTest.setupLearningElement();

    expect(mockedMesh.rotate).toBeCalledWith(Vector3.Up(), Tools.ToRadians(42));
  });

  test("changeHighlightColor changes the color of the highlight layer when the hasScored value in the viewModel is set", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, , systemUnderTest] = buildSystemUnderTest();
    await systemUnderTest.setupLearningElement();

    viewModel.hasScored.Value = true;
    expect(scenePresenterMock.HighlightLayer.removeMesh).toHaveBeenCalledWith(
      viewModel.modelMeshes[0]
    );
    expect(scenePresenterMock.HighlightLayer.addMesh).toHaveBeenCalledWith(
      viewModel.modelMeshes[0],
      expect.any(Color3)
    );
  });
});
