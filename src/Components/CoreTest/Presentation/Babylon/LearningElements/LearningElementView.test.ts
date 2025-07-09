import ILearningElementController from "../../../../Core/Presentation/Babylon/LearningElements/ILearningElementController";
import LearningElementView from "../../../../Core/Presentation/Babylon/LearningElements/LearningElementView";
import LearningElementViewModel from "../../../../Core/Presentation/Babylon/LearningElements/LearningElementViewModel";
import { mock, mockDeep } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import {
  AbstractMesh,
  AnimationGroup,
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
  viewModel.id = 1;
  viewModel.position = new Vector3(1, 2, 3);
  const controller = mock<ILearningElementController>();
  const view = new LearningElementView(viewModel, controller);
  return [viewModel, controller, view];
}

function setupScenePresenterMockLoadingResults(): {
  modelMesh: Mesh;
  iconMesh: Mesh;
  animationGroup: AnimationGroup;
} {
  const mockModelMesh = mockDeep<Mesh>();
  const mockIconMesh = mockDeep<Mesh>();
  const mockAnimationGroup = mockDeep<AnimationGroup>();

  scenePresenterMock.loadModel.mockResolvedValue([mockModelMesh]);
  scenePresenterMock.loadGLTFModel.mockResolvedValue({
    meshes: [mockIconMesh],
    animationGroups: [mockAnimationGroup],
    geometries: [],
    lights: [],
    particleSystems: [],
    skeletons: [],
    transformNodes: [],
    spriteManagers: [],
  });

  return {
    modelMesh: mockModelMesh,
    iconMesh: mockIconMesh,
    animationGroup: mockAnimationGroup,
  };
}

describe("LearningElementView", () => {
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

  describe("constructor observable callbacks", () => {
    test("constructor sets up hasScored observable callbacks", () => {
      setupScenePresenterMockLoadingResults();

      const [viewModel, ,] = buildSystemUnderTest();

      // only check for length, because the callback is anonymous
      expect(viewModel.hasScored["subscribers"].length).toBe(1);
    });

    //ANF-ID: [ELG0027]
    test("constructor sets up isHighlighted observable callbacks", () => {
      setupScenePresenterMockLoadingResults();

      const [viewModel, ,] = buildSystemUnderTest();

      // only check for length, because the callback is anonymous
      expect(viewModel.isHighlighted["subscribers"].length).toBe(1);
    });
  });

  describe("highlighting", () => {
    //ANF-ID: [ELG0027]
    test("changing isHighlighted to true changes the highlight color", async () => {
      setupScenePresenterMockLoadingResults();

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
      setupScenePresenterMockLoadingResults();

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

    test("changeHighlightColor changes the color of the highlight layer when the hasScored value in the viewModel is set", async () => {
      setupScenePresenterMockLoadingResults();

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

    test("async setup adds each mesh to the scene presenters HighlightLayer", async () => {
      const mesh = setupScenePresenterMockLoadingResults().modelMesh;

      const [viewModel, , systemUnderTest] = buildSystemUnderTest();
      viewModel.theme = LearningSpaceThemeType.Campus;

      await systemUnderTest.setupLearningElement();

      expect(scenePresenterMock.HighlightLayer.addMesh).toHaveBeenCalledWith(
        mesh,
        expect.any(Color3),
      );
    });
  });

  describe("model loading", () => {
    // ANF-ID: [EZZ0034]
    test("async setup calls scene presenter to load model and icon", async () => {
      setupScenePresenterMockLoadingResults();

      const [viewModel, , systemUnderTest] = buildSystemUnderTest();
      viewModel.theme = LearningSpaceThemeType.Campus;

      await systemUnderTest.setupLearningElement();

      expect(scenePresenterMock.loadModel).toHaveBeenCalledTimes(1);
      expect(scenePresenterMock.loadGLTFModel).toHaveBeenCalledTimes(1);
    });

    //ANF-ID: [ELG0028]
    test("async setup positions models correctly", async () => {
      // mock resolve value twice to circumvent returning the same mesh twice
      scenePresenterMock.loadModel
        .mockResolvedValueOnce([
          new Mesh("TestMesh", new Scene(new NullEngine())),
        ])
        .mockResolvedValueOnce([
          new Mesh("TestMesh", new Scene(new NullEngine())),
        ]);
      scenePresenterMock.loadGLTFModel.mockResolvedValue({
        meshes: [mockDeep<Mesh>()],
        animationGroups: [mockDeep<AnimationGroup>()],
        geometries: [],
        lights: [],
        particleSystems: [],
        skeletons: [],
        transformNodes: [],
        spriteManagers: [],
      });

      const [viewModel, , systemUnderTest] = buildSystemUnderTest();
      viewModel.position = new Vector3(42, 42, 42);
      viewModel.theme = LearningSpaceThemeType.Campus;

      await systemUnderTest.setupLearningElement();

      expect(viewModel.modelMeshes[0].position).toEqual(
        new Vector3(42, 42, 42),
      );
      expect(viewModel.iconMeshes[0].position).toEqual(
        new Vector3(42, 42 + viewModel.iconYOffset, 42),
      );
    });

    //Anf-ID: [ELG0028]
    test("async setup rotates models correctly", async () => {
      const mockedMesh = setupScenePresenterMockLoadingResults().modelMesh;

      const [viewModel, , systemUnderTest] = buildSystemUnderTest();
      viewModel.rotation = 42;
      viewModel.theme = LearningSpaceThemeType.Campus;

      await systemUnderTest.setupLearningElement();

      expect(mockedMesh.rotate).toHaveBeenCalledWith(
        Vector3.Up(),
        Tools.ToRadians(42),
      );
    });
  });

  describe("interactions", () => {
    test("async setup sets an action manager for each model mesh", async () => {
      const scene = new Scene(new NullEngine());
      scenePresenterMock.loadModel.mockResolvedValue([
        new Mesh("TestMesh1", scene),
        new Mesh("TestMesh2", scene),
      ]);
      scenePresenterMock.loadGLTFModel.mockResolvedValue({
        meshes: [mockDeep<Mesh>()],
        animationGroups: [mockDeep<AnimationGroup>()],
        geometries: [],
        lights: [],
        particleSystems: [],
        skeletons: [],
        transformNodes: [],
        spriteManagers: [],
      });
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
      scenePresenterMock.loadGLTFModel.mockResolvedValue({
        meshes: [mockDeep<Mesh>()],
        animationGroups: [mockDeep<AnimationGroup>()],
        geometries: [],
        lights: [],
        particleSystems: [],
        skeletons: [],
        transformNodes: [],
        spriteManagers: [],
      });

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
      setupScenePresenterMockLoadingResults();

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
      setupScenePresenterMockLoadingResults();

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
      setupScenePresenterMockLoadingResults();

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
  });
});
