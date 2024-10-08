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
  Mesh,
  NullEngine,
  Scene,
  Tools,
  Vector3,
} from "@babylonjs/core";
import { ActionManager } from "@babylonjs/core/Actions/actionManager";
import { LearningSpaceThemeType } from "../../../../Core/Domain/Types/LearningSpaceThemeTypes";
import HighlightColors from "../../../../Core/Presentation/Babylon/HighlightColors";

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

function buildSystemUnderTest(): [
  LearningElementViewModel,
  ILearningElementController,
  LearningElementView,
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
      scenePresenterFactoryMock,
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.restoreAllMocks();
  });

  test("constructor sets up hasScored observable callbacks", () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new Mesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, ,] = buildSystemUnderTest();

    // only check for length, because the callback is anonymous
    expect(viewModel.hasScored["subscribers"].length).toBe(1);
  });

  //ANF-ID: [ELG0027]
  test("constructor sets up isHighlighted observable callbacks", () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new Mesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, ,] = buildSystemUnderTest();

    // only check for length, because the callback is anonymous
    expect(viewModel.isHighlighted["subscribers"].length).toBe(1);
  });

  //ANF-ID: [ELG0027]
  test("changing isHighlighted to true changes the highlight color", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new Mesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, , systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = LearningSpaceThemeType.Campus;

    await systemUnderTest.setupLearningElement();

    viewModel.isHighlighted.Value = true;
    viewModel.isInteractable.Value = true;

    expect(scenePresenterMock.HighlightLayer.removeMesh).toHaveBeenCalledWith(
      viewModel.modelMeshes[0],
    );
    expect(scenePresenterMock.HighlightLayer.addMesh).toHaveBeenCalledWith(
      viewModel.modelMeshes[0],
      HighlightColors.LearningElementHighlighted,
    );
  });

  //ANF-ID: [ELG0027]
  test("changing isHighlighted to false changes the highlight color if hasScored is true", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new Mesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, , systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = LearningSpaceThemeType.Campus;
    viewModel.hasScored.Value = true;
    viewModel.isHighlighted.Value = true;
    viewModel.isInteractable.Value = true;

    await systemUnderTest.setupLearningElement();

    viewModel.isHighlighted.Value = false;

    expect(scenePresenterMock.HighlightLayer.removeMesh).toHaveBeenCalledWith(
      viewModel.modelMeshes[0],
    );
    expect(scenePresenterMock.HighlightLayer.addMesh).toHaveBeenCalledWith(
      viewModel.modelMeshes[0],
      HighlightColors.LearningElementSolved,
    );
  });

  // ANF-ID: [EZZ0034]
  test("async setup calls scene presenter to load model and icon", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new Mesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, , systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = LearningSpaceThemeType.Campus;

    await systemUnderTest.setupLearningElement();

    expect(scenePresenterMock.loadModel).toBeCalledTimes(2);
  });

  test("async setup sets an action manager for each model mesh", async () => {
    const scene = new Scene(new NullEngine());
    scenePresenterMock.loadModel.mockResolvedValue([
      new Mesh("TestMesh1", scene),
      new Mesh("TestMesh2", scene),
    ]);
    const [viewModel, , systemUnderTest] = buildSystemUnderTest();
    viewModel.modelType = "";
    viewModel.theme = LearningSpaceThemeType.Campus;

    await systemUnderTest.setupLearningElement();

    viewModel.modelMeshes.forEach((mesh) => {
      expect(mesh.actionManager).toBeDefined();
    });
  });

  test("async setup sets an action manager for each icon mesh", async () => {
    const scene = new Scene(new NullEngine());
    scenePresenterMock.loadModel.mockResolvedValue([
      new Mesh("TestMesh1", scene),
      new Mesh("TestMesh2", scene),
    ]);

    const [viewModel, , systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = LearningSpaceThemeType.Campus;

    await systemUnderTest.setupLearningElement();

    viewModel.iconMeshes.forEach((mesh) => {
      expect(mesh.actionManager).toBeDefined();
    });
  });

  // ANF-ID: [EWE0035]
  test("async setup registers onPickTrigger callback for the all meshes", async () => {
    const registerActionSpy = jest.spyOn(
      ActionManager.prototype,
      "registerAction",
    );
    scenePresenterMock.loadModel.mockResolvedValue([
      new Mesh("TestMesh1", new Scene(new NullEngine())),
    ]);

    const [viewModel, controller, systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = LearningSpaceThemeType.Campus;

    await systemUnderTest.setupLearningElement();

    // check to see if registerAction was called with the onPickTrigger callback
    expect(registerActionSpy.mock.calls).toEqual(
      expect.arrayContaining([
        [
          expect.objectContaining({
            trigger: ActionManager.OnPickTrigger,
            func: controller.picked,
          }),
        ],
      ]),
    );
  });

  test("async setup registers onPointerOverTrigger callback for the all meshes", async () => {
    const registerActionSpy = jest.spyOn(
      ActionManager.prototype,
      "registerAction",
    );
    scenePresenterMock.loadModel.mockResolvedValue([
      new Mesh("TestMesh1", new Scene(new NullEngine())),
    ]);

    const [viewModel, controller, systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = LearningSpaceThemeType.Campus;

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
      ]),
    );
  });

  test("async setup registers onPointerOutTrigger callback for the all meshes", async () => {
    const registerActionSpy = jest.spyOn(
      ActionManager.prototype,
      "registerAction",
    );
    scenePresenterMock.loadModel.mockResolvedValue([
      new Mesh("TestMesh1", new Scene(new NullEngine())),
    ]);

    const [viewModel, controller, systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = LearningSpaceThemeType.Campus;

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
      ]),
    );
  });

  test("async setup adds each mesh to the scene presenters HighlightLayer", async () => {
    const mesh = new Mesh("TestMesh1", new Scene(new NullEngine()));
    scenePresenterMock.loadModel.mockResolvedValue([mesh]);

    const [viewModel, , systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = LearningSpaceThemeType.Campus;

    await systemUnderTest.setupLearningElement();

    expect(scenePresenterMock.HighlightLayer.addMesh).toBeCalledWith(
      mesh,
      expect.any(Color3),
    );
  });

  //ANF-ID: [ELG0028]
  test("positionModel changes the model position when the position value in the viewModel is changed", async () => {
    // mock resolve value twice to circumvent returning the same mesh twice
    scenePresenterMock.loadModel
      .mockResolvedValueOnce([
        new Mesh("TestMesh", new Scene(new NullEngine())),
      ])
      .mockResolvedValueOnce([
        new Mesh("TestMesh", new Scene(new NullEngine())),
      ]);

    const [viewModel, , systemUnderTest] = buildSystemUnderTest();
    viewModel.position = new Vector3(42, 42, 42);
    viewModel.theme = LearningSpaceThemeType.Campus;

    await systemUnderTest.setupLearningElement();

    expect(viewModel.modelMeshes[0].position).toEqual(new Vector3(42, 42, 42));
    expect(viewModel.iconMeshes[0].position).toEqual(
      new Vector3(42, 42 + viewModel.iconYOffset, 42),
    );
  });

  //Anf-ID: [ELG0028]
  test("positionModel changes the model rotation when the rotation value in the viewModel is changed", async () => {
    const mockedMesh = mockDeep<AbstractMesh>();
    scenePresenterMock.loadModel.mockResolvedValue([mockedMesh]);

    const [viewModel, , systemUnderTest] = buildSystemUnderTest();
    viewModel.rotation = 42;
    viewModel.theme = LearningSpaceThemeType.Campus;

    await systemUnderTest.setupLearningElement();

    expect(mockedMesh.rotate).toBeCalledWith(Vector3.Up(), Tools.ToRadians(42));
  });

  test("changeHighlightColor changes the color of the highlight layer when the hasScored value in the viewModel is set", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new Mesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, , systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = LearningSpaceThemeType.Campus;

    await systemUnderTest.setupLearningElement();

    viewModel.hasScored.Value = true;
    expect(scenePresenterMock.HighlightLayer.removeMesh).toHaveBeenCalledWith(
      viewModel.modelMeshes[0],
    );
    expect(scenePresenterMock.HighlightLayer.addMesh).toHaveBeenCalledWith(
      viewModel.modelMeshes[0],
      expect.any(Color3),
    );
  });
});
