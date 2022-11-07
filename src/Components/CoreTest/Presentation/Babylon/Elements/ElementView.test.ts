import IElementController from "../../../../Core/Presentation/Babylon/Elements/IElementController";
import ElementView from "../../../../Core/Presentation/Babylon/Elements/ElementView";
import ElementViewModel from "../../../../Core/Presentation/Babylon/Elements/ElementViewModel";
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
  ElementViewModel,
  IElementController,
  ElementView
] {
  const viewModel = new ElementViewModel();
  const controller = mock<IElementController>();
  const view = new ElementView(viewModel, controller);
  return [viewModel, controller, view];
}

describe("ElementView", () => {
  let systemUnderTest: ElementView;

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

  test("constructor sets up position observable callbacks", () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, controller, systemUnderTest] = buildSystemUnderTest();

    expect(viewModel.position["subscribers"]).toStrictEqual([
      systemUnderTest["positionModel"],
    ]);
  });

  test("constructor sets up rotation observable callbacks", () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, controller, systemUnderTest] = buildSystemUnderTest();

    expect(viewModel.rotation["subscribers"]).toStrictEqual([
      systemUnderTest["positionModel"],
    ]);
  });

  test("constructor sets up hasScored observable callbacks", () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, controller, systemUnderTest] = buildSystemUnderTest();

    // only check for length, because the callback is anonymous
    expect(viewModel.hasScored["subscribers"].length).toBe(1);
  });

  test("async setup calls scene presenter to load model", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, controller, systemUnderTest] = buildSystemUnderTest();
    await systemUnderTest.setupAvatar();

    expect(scenePresenterMock.loadModel).toBeCalledTimes(1);
  });

  test("async setup creates a new action manager for each mesh", async () => {
    const scene = new Scene(new NullEngine());
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh1", scene),
      new AbstractMesh("TestMesh2", scene),
    ]);

    const [viewModel, controller, systemUnderTest] = buildSystemUnderTest();
    await systemUnderTest.setupAvatar();

    viewModel.meshes.Value.forEach((mesh) => {
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

    const [viewModel, controller, systemUnderTest] = buildSystemUnderTest();
    await systemUnderTest.setupAvatar();

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

    const [viewModel, controller, systemUnderTest] = buildSystemUnderTest();
    await systemUnderTest.setupAvatar();

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

    const [viewModel, controller, systemUnderTest] = buildSystemUnderTest();
    await systemUnderTest.setupAvatar();

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

    const [viewModel, controller, systemUnderTest] = buildSystemUnderTest();
    await systemUnderTest.setupAvatar();

    expect(scenePresenterMock.HighlightLayer.addMesh).toBeCalledWith(
      mesh,
      expect.any(Color3)
    );
  });

  test("positionModel changes the model position when the position value in the viewModel is changed", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, controller, systemUnderTest] = buildSystemUnderTest();
    await systemUnderTest.setupAvatar();

    viewModel.position.Value = new Vector3(42, 42, 42);
    expect(viewModel.meshes.Value[0].position).toEqual(new Vector3(42, 42, 42));
  });

  test("positionModel changes the model rotation when the rotation value in the viewModel is changed", async () => {
    const mockedMesh = mockDeep<AbstractMesh>();
    scenePresenterMock.loadModel.mockResolvedValue([mockedMesh]);

    const [viewModel, controller, systemUnderTest] = buildSystemUnderTest();
    await systemUnderTest.setupAvatar();

    viewModel.rotation.Value = 42;
    expect(mockedMesh.rotate).toBeCalledWith(Vector3.Up(), Tools.ToRadians(42));
  });

  test("changeHighlightColor changes the color of the highlight layer when the hasScored value in the viewModel is set", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, controller, systemUnderTest] = buildSystemUnderTest();
    await systemUnderTest.setupAvatar();

    viewModel.hasScored.Value = true;
    expect(scenePresenterMock.HighlightLayer.removeMesh).toHaveBeenCalledWith(
      viewModel.meshes.Value[0]
    );
    expect(scenePresenterMock.HighlightLayer.addMesh).toHaveBeenCalledWith(
      viewModel.meshes.Value[0],
      expect.any(Color3)
    );
  });
});
