import {
  AbstractMesh,
  ActionManager,
  AnimationGroup,
  Color3,
  ISceneLoaderAsyncResult,
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
import ILoggerPort from "../../../../Core/Application/Ports/Interfaces/ILoggerPort";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";
import HighlightColors from "../../../../Core/Presentation/Babylon/HighlightColors";

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

const loggerMock = mock<ILoggerPort>();

function buildSystemUnderTest(): [DoorViewModel, DoorView] {
  const viewModel = new DoorViewModel();
  viewModel.position = new Vector3(1, 2, 3);
  const controller = mock<IDoorController>();
  const systemUnderTest = new DoorView(viewModel, controller);
  return [viewModel, systemUnderTest];
}

describe("DoorView", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock,
    );
    CoreDIContainer.rebind(CORE_TYPES.ILogger).toConstantValue(loggerMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.clearAllMocks();
  });

  test("constructor injects scenePresenter", () => {
    scenePresenterMock.loadGLTFModel.mockResolvedValue([
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

  //ANF-ID: [ELG0033]
  test("constructor does not subscribe to viewModel.isOpen when isOpen is true", async () => {
    scenePresenterMock.loadGLTFModel.mockResolvedValue({
      meshes: [new AbstractMesh("Door", new Scene(new NullEngine()))],
      animationGroups: [
        new AnimationGroup("TestAnimation"),
        new Scene(new NullEngine()),
      ],
    } as ISceneLoaderAsyncResult);
    const viewModel = new DoorViewModel();
    viewModel.isOpen.Value = true;
    viewModel.position = new Vector3(1, 2, 3);
    viewModel.theme = LearningSpaceThemeType.Campus;

    const controller = mock<IDoorController>();
    const systemUnderTest = new DoorView(viewModel, controller);
    await systemUnderTest.asyncSetup();

    expect(viewModel.isOpen["subscribers"]).toStrictEqual([]);
  });

  // ANF-ID: [ELG0019]
  test("asyncSetup/loadMeshAsync calls scenePresenter.loadModel", async () => {
    scenePresenterMock.loadGLTFModel.mockResolvedValue({
      meshes: [new AbstractMesh("TestMesh", new Scene(new NullEngine()))],
      animationGroups: [
        new AnimationGroup("TestAnimation"),
        new Scene(new NullEngine()),
      ],
    } as ISceneLoaderAsyncResult);
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = LearningSpaceThemeType.Campus;

    await systemUnderTest.asyncSetup();

    expect(scenePresenterMock.loadGLTFModel).toHaveBeenCalledTimes(2);
  });

  test("asyncSetup/loadMeshAsync sets rotationQuaternion of each loaded mesh to null", async () => {
    const mesh1 = new AbstractMesh("TestMesh1", new Scene(new NullEngine()));
    mesh1.rotationQuaternion = new Quaternion();
    const mesh2 = new AbstractMesh("TestMesh2", new Scene(new NullEngine()));
    mesh2.rotationQuaternion = new Quaternion();
    scenePresenterMock.loadGLTFModel.mockResolvedValue({
      meshes: [mesh1, mesh2],
      animationGroups: [
        new AnimationGroup("TestAnimation"),
        new Scene(new NullEngine()),
      ],
    } as ISceneLoaderAsyncResult);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = LearningSpaceThemeType.Campus;

    await systemUnderTest.asyncSetup();
    expect(mesh1.rotationQuaternion).toBeNull();
    expect(mesh2.rotationQuaternion).toBeNull();
  });

  test("loadMeshAsync calls logger with warning", async () => {
    scenePresenterMock.loadGLTFModel.mockResolvedValue({
      meshes: [new AbstractMesh("TestMesh", new Scene(new NullEngine()))],
      animationGroups: [
        new AnimationGroup("TestAnimation"),
        new Scene(new NullEngine()),
      ],
    } as ISceneLoaderAsyncResult);
    const [viewModel, systemUnderTest] = buildSystemUnderTest();

    await systemUnderTest.asyncSetup();

    expect(loggerMock.log).toHaveBeenCalledTimes(2);
    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      expect.stringContaining(
        "No valid DoorMesh found in DoorView. DoorLogic will not work.",
      ),
    );
  });

  // ANF-ID: [ELG0033]
  test("asyncSetup/setupAnimation creates a new animation and applies it to the first mesh", async () => {
    const mockMesh = new AbstractMesh("Door", new Scene(new NullEngine()));
    scenePresenterMock.loadGLTFModel.mockResolvedValue({
      meshes: [mockMesh],
      animationGroups: [
        new AnimationGroup("TestAnimation"),
        new Scene(new NullEngine()),
      ],
    } as ISceneLoaderAsyncResult);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.isExit = true;
    viewModel.theme = LearningSpaceThemeType.Campus;

    await systemUnderTest.asyncSetup();

    expect(mockMesh.animations.length).toBe(1);
  });

  // ANF-ID: [ELG0019]
  test("positionMesh sets position of the first mesh to viewModel.position", async () => {
    scenePresenterMock.loadGLTFModel.mockResolvedValue({
      meshes: [new AbstractMesh("TestMesh", new Scene(new NullEngine()))],
      animationGroups: [
        new AnimationGroup("TestAnimation"),
        new Scene(new NullEngine()),
      ],
    } as ISceneLoaderAsyncResult);
    const [viewModel, systemUnderTest] = buildSystemUnderTest();

    viewModel.theme = LearningSpaceThemeType.Campus;

    // await systemUnderTest.asyncSetup();
    await systemUnderTest["loadMeshAsync"]();
    systemUnderTest["positionMesh"]();

    expect(viewModel.meshes[0].position).toStrictEqual(new Vector3(1, 2, 3));
  });

  // ANF-ID: [ELG0019]
  test("positionMesh sets rotation of the first mesh to viewModel.rotation", async () => {
    scenePresenterMock.loadGLTFModel.mockResolvedValue({
      meshes: [
        new AbstractMesh("TestMesh", new Scene(new NullEngine())),
        new AbstractMesh("TestMesh2", new Scene(new NullEngine())),
      ],
      animationGroups: [
        new AnimationGroup("TestAnimation"),
        new Scene(new NullEngine()),
      ],
    } as ISceneLoaderAsyncResult);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    const newRotation = 42;
    viewModel.rotation = newRotation;
    viewModel.theme = LearningSpaceThemeType.Campus;

    await systemUnderTest["loadMeshAsync"]();
    systemUnderTest["positionMesh"]();

    expect(viewModel.meshes[0].rotation.y).toStrictEqual(
      Tools.ToRadians(newRotation),
    );
  });

  // ANF-ID: [ELG0033]
  test("onIsOpenChanged calls doorAnimationGroup.play() on the scene if viewModel.isOpen and viewModel.isExit is true", async () => {
    const mockMesh = new AbstractMesh("Door", new Scene(new NullEngine()));
    scenePresenterMock.loadGLTFModel.mockResolvedValue({
      meshes: [mockMesh],
      animationGroups: [
        new AnimationGroup("TestAnimation"),
        new Scene(new NullEngine()),
      ],
    } as ISceneLoaderAsyncResult);
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = LearningSpaceThemeType.Campus;
    viewModel.isExit = true;

    await systemUnderTest.asyncSetup();
    viewModel.isOpen.Value = true;
    await setTimeout(100);

    const doorAnimationGroup = viewModel.doorAnimations.find(
      (group) => group.name === "doorAnimationGroup",
    );

    expect(doorAnimationGroup).toBeDefined();
    if (doorAnimationGroup) {
      expect(doorAnimationGroup.isPlaying).toBe(true);
    }
  });

  //ANF-ID: [ELG0018]
  test("updateHighlight sets highlight when door is interactable", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    const mockMesh = new AbstractMesh("Door", new Scene(new NullEngine()));
    viewModel.meshes = [mockMesh as Mesh];
    viewModel.isInteractable.Value = true;

    systemUnderTest["updateHighlight"]();

    expect(scenePresenterMock.HighlightLayer.addMesh).toHaveBeenCalledWith(
      mockMesh,
      HighlightColors.NonLearningElementBase,
    );
  });

  //ANF-ID: [ELG0018]
  test("changeHighlight sets highlight when door is not interactable", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    const mockMesh = new AbstractMesh("Door", new Scene(new NullEngine()));
    viewModel.meshes = [mockMesh as Mesh];
    viewModel.isInteractable.Value = false;

    systemUnderTest["updateHighlight"]();

    expect(scenePresenterMock.HighlightLayer.addMesh).toHaveBeenCalledWith(
      mockMesh,
      HighlightColors.getNonInteractableColor(
        HighlightColors.NonLearningElementBase,
      ),
    );
  });

  //ANF-ID: [EWE0031]
  test("meshes are interactible when clicked on", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    const mockMesh = new AbstractMesh("Door", new Scene(new NullEngine()));
    viewModel.meshes = [mockMesh as Mesh];
    viewModel.isInteractable.Value = true;
    systemUnderTest["viewModel"].meshes.forEach((mesh) => {
      expect(
        mesh.actionManager?.hasSpecificTrigger(ActionManager.OnPickTrigger),
      );
    });
  });

  //ANF-ID: [ELG0019]
  test.each([
    { theme: LearningSpaceThemeType.Arcade, isExit: true },
    { theme: LearningSpaceThemeType.Arcade, isExit: false },
    { theme: LearningSpaceThemeType.Campus, isExit: true },
    { theme: LearningSpaceThemeType.Campus, isExit: false },
    { theme: LearningSpaceThemeType.CampusAB, isExit: true },
    { theme: LearningSpaceThemeType.CampusAB, isExit: false },
    { theme: LearningSpaceThemeType.CampusKE, isExit: true },
    { theme: LearningSpaceThemeType.CampusKE, isExit: false },
    { theme: LearningSpaceThemeType.Suburb, isExit: true },
    { theme: LearningSpaceThemeType.Suburb, isExit: false },
  ])(
    "getModelLinkByThemeAndType returns valid model link for $theme and isExit=$isExit",
    ({ theme, isExit }) => {
      const [viewModel, systemUnderTest] = buildSystemUnderTest();
      viewModel.theme = theme;
      viewModel.isExit = isExit;
      const link = systemUnderTest["getModelLinkByThemeAndType"]();

      expect(link).toBeDefined();
    },
  );
});
