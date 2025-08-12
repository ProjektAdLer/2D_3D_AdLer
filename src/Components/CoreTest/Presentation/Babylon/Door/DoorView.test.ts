import {
  AbstractMesh,
  ActionManager,
  AnimationGroup,
  ISceneLoaderAsyncResult,
  Mesh,
  NullEngine,
  Scene,
  Tools,
  Vector3,
} from "@babylonjs/core";
import { mock, mockDeep } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import DoorView from "../../../../Core/Presentation/Babylon/Door/DoorView";
import DoorViewModel from "../../../../Core/Presentation/Babylon/Door/DoorViewModel";
import IDoorController from "../../../../Core/Presentation/Babylon/Door/IDoorController";
import ElevatorLogic from "../../../../Core/Presentation/Babylon/Door/DoorLogic/ElevatorLogic";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import { ThemeType } from "../../../../Core/Domain/Types/ThemeTypes";
import ILoggerPort from "../../../../Core/Application/Ports/Interfaces/ILoggerPort";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";
import HighlightColors from "../../../../Core/Presentation/Babylon/HighlightColors";
import exp from "constants";

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
    viewModel.theme = ThemeType.Campus;

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
    viewModel.theme = ThemeType.Campus;

    await systemUnderTest.asyncSetup();

    expect(scenePresenterMock.loadGLTFModel).toHaveBeenCalledTimes(2);
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

    viewModel.theme = ThemeType.Campus;

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
    viewModel.theme = ThemeType.Campus;

    await systemUnderTest["loadMeshAsync"]();
    systemUnderTest["positionMesh"]();

    expect(viewModel.meshes[0].rotation.y).toStrictEqual(
      Tools.ToRadians(newRotation),
    );
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
    { theme: ThemeType.Arcade, isExit: true },
    { theme: ThemeType.Arcade, isExit: false },
    { theme: ThemeType.Campus, isExit: true },
    { theme: ThemeType.Campus, isExit: false },
    { theme: ThemeType.CampusAB, isExit: true },
    { theme: ThemeType.CampusAB, isExit: false },
    { theme: ThemeType.CampusKE, isExit: true },
    { theme: ThemeType.CampusKE, isExit: false },
    { theme: ThemeType.Suburb, isExit: true },
    { theme: ThemeType.Suburb, isExit: false },
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

  test("instatiate ElevatorLogic for elevator Mesh", async () => {
    scenePresenterMock.loadGLTFModel.mockResolvedValue({
      meshes: [new AbstractMesh("elevator", new Scene(new NullEngine()))],
      animationGroups: [
        new AnimationGroup("TestAnimation"),
        new Scene(new NullEngine()),
      ],
    } as ISceneLoaderAsyncResult);
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = ThemeType.Campus;

    await systemUnderTest.asyncSetup();

    expect(viewModel.doorLogic).toBeInstanceOf(ElevatorLogic);
  });

  test("dispose old icon meshes on score change", async () => {
    const scene = new Scene(new NullEngine());
    const oldIcon = new Mesh("oldIcon", scene);
    const disposeSpy = jest.spyOn(oldIcon, "dispose");
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.iconMeshes = [oldIcon];
    const newMesh = new Mesh("newMesh", scene);
    scenePresenterMock.loadGLTFModel.mockResolvedValue({
      meshes: [newMesh],
      animationGroups: [new AnimationGroup("TestAnimation", scene)],
    } as unknown as ISceneLoaderAsyncResult);

    await systemUnderTest.asyncSetup();

    expect(disposeSpy).toHaveBeenCalled();
  });

  test("doorLogic.open() is called if viewModel.isOpen turns true and Door is exit", async () => {
    scenePresenterMock.loadGLTFModel.mockResolvedValue({
      meshes: [new AbstractMesh("elevator", new Scene(new NullEngine()))],
      animationGroups: [
        new AnimationGroup("TestAnimation"),
        new Scene(new NullEngine()),
      ],
    } as ISceneLoaderAsyncResult);
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.isOpen.Value = false;
    viewModel.isExit = true;

    await systemUnderTest.asyncSetup();
    const openSpy = jest.spyOn(viewModel.doorLogic, "open");
    systemUnderTest["onIsOpenChanged"](true);
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(openSpy).toHaveBeenCalled();
  });

  test("elevator proximity animation behaviour is working correctly", async () => {
    scenePresenterMock.loadGLTFModel.mockResolvedValue({
      meshes: [new AbstractMesh("elevator", new Scene(new NullEngine()))],
      animationGroups: [
        new AnimationGroup("elevator_open"),
        new AnimationGroup("elevator_drive_up_open"),
        new Scene(new NullEngine()),
      ],
    } as ISceneLoaderAsyncResult);
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.isOpen.Value = false;

    await systemUnderTest.asyncSetup();
    const spyOnClose = jest.spyOn(viewModel.doorLogic, "avatarClose");
    const spyOnFar = jest.spyOn(viewModel.doorLogic, "avatarFar");

    await systemUnderTest["isInteractableAnimation"](true);
    expect(spyOnClose).toHaveBeenCalledTimes(1);

    await systemUnderTest["isInteractableAnimation"](false);
    expect(spyOnFar).toHaveBeenCalledTimes(1);
  });

  test("toogle of icon float animation works correctly", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    const mockAnimation = new AnimationGroup("TestAnimation");
    mockAnimation.restart = jest.fn();
    mockAnimation.pause = jest.fn();
    viewModel.iconFloatingAnimation = mockAnimation;

    systemUnderTest["toggleIconFloatAnimation"](true);
    expect(viewModel.iconFloatingAnimation.restart).toHaveBeenCalled();

    systemUnderTest["toggleIconFloatAnimation"](false);
    expect(viewModel.iconFloatingAnimation.pause).toHaveBeenCalled();
  });
});
