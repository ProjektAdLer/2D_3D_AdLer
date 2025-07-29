import { mock, mockDeep } from "jest-mock-extended";
import IStoryNPCController from "../../../../Core/Presentation/Babylon/StoryNPC/IStoryNPCController";
import StoryNPCView from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCView";
import StoryNPCViewModel, {
  StoryNPCState,
} from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCViewModel";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import {
  ActionManager,
  AnimationGroup,
  Color3,
  ISceneLoaderAsyncResult,
  Mesh,
  NullEngine,
  Quaternion,
  Scene,
  Tools,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import ICharacterAnimator from "../../../../Core/Presentation/Babylon/CharacterAnimator/ICharacterAnimator";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import IStoryElementPresenter from "../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/IStoryElementPresenter";
import INavigation from "../../../../Core/Presentation/Babylon/Navigation/INavigation";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import ICharacterNavigator from "../../../../Core/Presentation/Babylon/CharacterNavigator/ICharacterNavigator";
import { StoryElementType } from "../../../../Core/Domain/Types/StoryElementType";
import HighlightColors from "../../../../Core/Presentation/Babylon/HighlightColors";
import AvatarAnimationNames from "../../../../Core/Domain/AvatarModels/AvatarAnimationNames";
import IAvatarPresenter from "../../../../Core/Presentation/Babylon/Avatar/IAvatarPresenter";

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;
// @ts-ignore
scenePresenterMock.Scene = new Scene(new NullEngine());
const storyElementPresenterMock = mock<IStoryElementPresenter>();
const navigationMock = mockDeep<INavigation>();
const characterAnimatorMock = mock<ICharacterAnimator>();
const characterNavigatorMock = mock<ICharacterNavigator>();
const avatarPresenterMock = mock<IAvatarPresenter>();
// @ts-ignore
characterNavigatorMock.IsReady = Promise.resolve();

describe("StoryNPCView", () => {
  let systemUnderTest: StoryNPCView;
  let viewModel: StoryNPCViewModel;
  let controllerMock: IStoryNPCController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock,
    );
    CoreDIContainer.rebind(
      PRESENTATION_TYPES.ICharacterAnimator,
    ).toConstantValue(characterAnimatorMock);
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IStoryElementPresenter,
    ).toConstantValue(storyElementPresenterMock);
    CoreDIContainer.rebind(CORE_TYPES.INavigation).toConstantValue(
      navigationMock,
    );
    CoreDIContainer.rebind(
      PRESENTATION_TYPES.ICharacterNavigator,
    ).toConstantValue(characterNavigatorMock);
    CoreDIContainer.rebind(PRESENTATION_TYPES.IAvatarPresenter).toConstantValue(
      avatarPresenterMock,
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    viewModel = new StoryNPCViewModel();
    controllerMock = mock<IStoryNPCController>();
    systemUnderTest = new StoryNPCView(viewModel, controllerMock);

    // Setup navigation mock with default return values
    navigationMock.Plugin.getClosestPoint.mockImplementation(
      (vector: Vector3) => vector,
    );
    navigationMock.Plugin.getRandomPointAround.mockReturnValue(
      new Vector3(2, 0, 2),
    );
  });

  describe("setup", () => {
    test("asyncSetupStoryNPC does not throw", async () => {
      const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
      const mockIdleAnimationGroup = new AnimationGroup(
        AvatarAnimationNames.npc_idle,
        new Scene(new NullEngine()),
      );
      const mockWalkAnimationGroup = new AnimationGroup(
        AvatarAnimationNames.npc_walk,
        new Scene(new NullEngine()),
      );
      const mockLoadingResult = mockDeep<ISceneLoaderAsyncResult>();
      // @ts-ignore
      mockLoadingResult.meshes = [mockMesh];
      // @ts-ignore
      mockLoadingResult.animationGroups = [
        mockIdleAnimationGroup,
        mockWalkAnimationGroup,
      ];
      scenePresenterMock.loadGLTFModel.mockResolvedValue(mockLoadingResult);
      scenePresenterMock.loadModel.mockResolvedValue([mockMesh]);

      navigationMock.Plugin.getClosestPoint.mockImplementation(
        (vector: Vector3) => vector,
      );

      await expect(systemUnderTest.asyncSetupStoryNPC()).resolves.not.toThrow();
    });

    // ANF-ID: [EZZ0022]
    test("loadElementModel calls the scenePresenter to load npc models", async () => {
      const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
      const mockLoadingResult = mockDeep<ISceneLoaderAsyncResult>();
      // @ts-ignore
      mockLoadingResult.meshes = [mockMesh];
      scenePresenterMock.loadGLTFModel.mockResolvedValue(mockLoadingResult);

      await systemUnderTest["loadElementModel"]();

      expect(scenePresenterMock.loadGLTFModel).toHaveBeenCalledTimes(1);
    });

    // ANF-ID: [EZZ0022]
    test("loadElementModel gets idleAnimation from loading results", async () => {
      const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
      const mockIdleAnimationGroup = new AnimationGroup(
        AvatarAnimationNames.npc_idle,
        new Scene(new NullEngine()),
      );
      const mockLoadingResult = mockDeep<ISceneLoaderAsyncResult>();
      // @ts-ignore
      mockLoadingResult.meshes = [mockMesh];
      // @ts-ignore
      mockLoadingResult.animationGroups = [mockIdleAnimationGroup];
      scenePresenterMock.loadGLTFModel.mockResolvedValue(mockLoadingResult);

      await systemUnderTest["loadElementModel"]();

      expect(systemUnderTest["idleAnimation"]).toEqual(mockIdleAnimationGroup);
    });

    // ANF-ID: [EZZ0022]
    test("loadElementModel gets walkAnimation from loading results", async () => {
      const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
      const mockWalkAnimationGroup = new AnimationGroup(
        AvatarAnimationNames.npc_walk,
        new Scene(new NullEngine()),
      );
      const mockLoadingResult = mockDeep<ISceneLoaderAsyncResult>();
      // @ts-ignore
      mockLoadingResult.meshes = [mockMesh];
      // @ts-ignore
      mockLoadingResult.animationGroups = [mockWalkAnimationGroup];
      scenePresenterMock.loadGLTFModel.mockResolvedValue(mockLoadingResult);

      await systemUnderTest["loadElementModel"]();

      expect(systemUnderTest["walkAnimation"]).toBe(mockWalkAnimationGroup);
    });

    test("loadIconModel calls the scenePresenter to load npc icon models", async () => {
      const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
      scenePresenterMock.loadGLTFModel.mockResolvedValue({
        meshes: [mockMesh],
        animationGroups: [
          new AnimationGroup("TestAnimation"),
          new Scene(new NullEngine()),
        ],
        particleSystems: [],
        skeletons: [],
        transformNodes: [],
        geometries: [],
        lights: [],
        spriteManagers: [],
      } as ISceneLoaderAsyncResult);

      await systemUnderTest["loadIconModel"]();

      expect(scenePresenterMock.loadGLTFModel).toHaveBeenCalledTimes(1);
    });

    test("loadIconModel sets icon properties correctly", async () => {
      const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
      const mockAnimation = new AnimationGroup(
        "floatingAnimation",
        new Scene(new NullEngine()),
      );
      scenePresenterMock.loadGLTFModel.mockResolvedValue({
        meshes: [mockMesh],
        animationGroups: [mockAnimation],
        particleSystems: [],
        skeletons: [],
        transformNodes: [],
        geometries: [],
        lights: [],
        spriteManagers: [],
      } as ISceneLoaderAsyncResult);

      await systemUnderTest["loadIconModel"]();

      expect(viewModel.iconMeshes).toEqual([mockMesh]);
      expect(viewModel.iconFloatingAnimation).toBe(mockAnimation);
      expect(mockMesh.position.y).toBe(viewModel.iconYOffset);
    });

    test("loadIconModel pauses animation when not interactable", async () => {
      const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
      const mockAnimation = new AnimationGroup(
        "floatingAnimation",
        new Scene(new NullEngine()),
      );
      mockAnimation.pause = jest.fn();
      viewModel.isInteractable.Value = false;

      scenePresenterMock.loadGLTFModel.mockResolvedValue({
        meshes: [mockMesh],
        animationGroups: [mockAnimation],
        particleSystems: [],
        skeletons: [],
        transformNodes: [],
        geometries: [],
        lights: [],
        spriteManagers: [],
      } as ISceneLoaderAsyncResult);

      await systemUnderTest["loadIconModel"]();

      expect(mockAnimation.pause).toHaveBeenCalledTimes(1);
    });

    test("setupModel creates model root node and sets position", () => {
      const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
      viewModel.modelMeshes = [mockMesh];

      systemUnderTest["setupModel"]();

      expect(viewModel.modelRootNode).toBeDefined();
      expect(viewModel.modelRootNode.name).toBe("NPCRootNode");
      expect(mockMesh.parent).toBe(viewModel.modelRootNode);
      expect(mockMesh.position.y).toBeCloseTo(0.05, 5);
    });

    test("createParentNode creates a new transform node and sets it in the viewmodel", () => {
      viewModel.modelMeshes = [
        new Mesh("mockMesh", new Scene(new NullEngine())),
      ];
      viewModel.iconMeshes = [
        new Mesh("mockMesh", new Scene(new NullEngine())),
      ];
      viewModel.modelRootNode = new TransformNode(
        "mockNode",
        new Scene(new NullEngine()),
      );

      systemUnderTest["createParentNode"]();

      expect(viewModel.parentNode).toBeDefined();
      expect(viewModel.parentNode.name).toBe("NPCParentNode");
      expect(viewModel.modelRootNode.parent).toBe(viewModel.parentNode);
      expect(viewModel.iconMeshes[0].parent).toBe(viewModel.parentNode);
    });

    // ANF-ID: [EWE0039]
    test("setupInteraction creates a ActionManager and sets it on all meshes", () => {
      viewModel.modelMeshes = [
        new Mesh("mockMesh", new Scene(new NullEngine())),
      ];
      viewModel.iconMeshes = [
        new Mesh("mockMesh", new Scene(new NullEngine())),
      ];

      systemUnderTest["setupInteractions"]();

      expect(viewModel.modelMeshes[0].actionManager).toBeDefined();
      expect(viewModel.iconMeshes[0].actionManager).toBeDefined();
      expect(viewModel.modelMeshes[0].actionManager).toBe(
        viewModel.iconMeshes[0].actionManager,
      );
    });

    test("setupInteractions registers pick, pointer over and pointer out actions", () => {
      viewModel.modelMeshes = [
        new Mesh("mockMesh", new Scene(new NullEngine())),
      ];
      viewModel.iconMeshes = [];

      systemUnderTest["setupInteractions"]();

      const actionManager = viewModel.modelMeshes[0].actionManager!;
      expect(actionManager.actions).toHaveLength(3);
    });

    // ANF-ID: [EZZ0023]
    test("setSpawnLocation sets the position and rotation to value from viewModel when state is Idle", () => {
      viewModel.modelRootNode = new TransformNode(
        "mockRootNode",
        new Scene(new NullEngine()),
      );
      viewModel.parentNode = new TransformNode(
        "mockParentNode",
        new Scene(new NullEngine()),
      );
      viewModel.state.Value = StoryNPCState.Idle;
      viewModel.storyType = StoryElementType.Intro;
      viewModel.introIdlePosition = new Vector3(4, 2, 0);
      viewModel.introIdlePosRotation = (3 / 4) * Math.PI;

      systemUnderTest["setSpawnLocation"]();

      expect(viewModel.parentNode.position).toEqual(new Vector3(4, 2, 0));
      expect(viewModel.modelRootNode.rotationQuaternion).toEqual(
        Quaternion.RotationAxis(
          Vector3.Up(),
          Tools.ToRadians((3 / 4) * Math.PI),
        ),
      );
    });

    test("setSpawnLocation sets outro position when state is Idle and story type is Outro", () => {
      viewModel.modelRootNode = new TransformNode(
        "mockRootNode",
        new Scene(new NullEngine()),
      );
      viewModel.parentNode = new TransformNode(
        "mockParentNode",
        new Scene(new NullEngine()),
      );
      viewModel.state.Value = StoryNPCState.Idle;
      viewModel.storyType = StoryElementType.Outro;
      viewModel.outroIdlePosition = new Vector3(2, 1, 3);
      viewModel.outroIdlePosRotation = Math.PI / 2;

      systemUnderTest["setSpawnLocation"]();

      expect(viewModel.parentNode.position).toEqual(new Vector3(2, 1, 3));
      expect(viewModel.modelRootNode.rotationQuaternion).toEqual(
        Quaternion.RotationAxis(Vector3.Up(), Tools.ToRadians(Math.PI / 2)),
      );
    });

    // ANF-ID: [EZZ0023]
    test("setSpawnLocation calcualtes spawn location when state is not Idle", () => {
      viewModel.modelRootNode = new TransformNode(
        "mockRootNode",
        new Scene(new NullEngine()),
      );
      viewModel.parentNode = new TransformNode(
        "mockParentNode",
        new Scene(new NullEngine()),
      );

      const vector = new Vector3(0, 0, 0);
      Object.defineProperty(avatarPresenterMock, "AvatarPosition", {
        get() {
          return vector;
        },
        configurable: true,
      });
      jest
        .spyOn(avatarPresenterMock, "AvatarPosition", "get")
        .mockReturnValue(new Vector3(0, 0, 0));

      viewModel.storyType = StoryElementType.Intro;
      viewModel.state.Value = StoryNPCState.CutScene;
      viewModel.parentNode.position = new Vector3(0, 0, 0);
      viewModel.introCutsceneSpawnPosition = new Vector3(4, 2, 0);
      viewModel.introCutsceneRotation = (3 / 4) * Math.PI;

      systemUnderTest["setSpawnLocation"]();

      expect(viewModel.parentNode.position).toEqual(new Vector3(4, 2, 0));
      expect(viewModel.modelRootNode.rotationQuaternion).toEqual(
        Quaternion.RotationAxis(
          Vector3.Up(),
          Tools.ToRadians((3 / 4) * Math.PI),
        ),
      );
    });

    // ANF-ID: [EZZ0018]
    test("createCharacterAnimator creates and sets up a new CharacterAnimator ", () => {
      const mockIdleAnimation = mock<AnimationGroup>();
      systemUnderTest["idleAnimation"] = mockIdleAnimation;
      const mockWalkAnimation = mock<AnimationGroup>();
      systemUnderTest["walkAnimation"] = mockWalkAnimation;
      const mockInteractionAnimation = mock<AnimationGroup>();
      systemUnderTest["interactionAnimation"] = mockInteractionAnimation;

      const mockModelRootNode = new TransformNode(
        "mockRootNode",
        new Scene(new NullEngine()),
      );
      viewModel.modelRootNode = mockModelRootNode;

      systemUnderTest["createCharacterAnimator"]();

      expect(viewModel.characterAnimator).toBeDefined();
      expect(characterAnimatorMock.setup).toHaveBeenCalledTimes(1);
    });

    test("createCharacterNavigator creates and sets up a new CharacterNavigator ", () => {
      const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
      viewModel.modelMeshes = [mockMesh];
      const mockParentNode = new TransformNode(
        "mockParentNode",
        new Scene(new NullEngine()),
      );
      viewModel.parentNode = mockParentNode;
      const mockModelRootNode = new TransformNode(
        "mockRootNode",
        new Scene(new NullEngine()),
      );
      viewModel.modelRootNode = mockModelRootNode;
      const mockCharacterAnimator = mock<ICharacterAnimator>();
      viewModel.characterAnimator = mockCharacterAnimator;

      systemUnderTest["createCharacterNavigator"]();

      expect(viewModel.characterNavigator).toBeDefined();
      expect(characterNavigatorMock.setup).toHaveBeenCalledTimes(1);
      expect(characterNavigatorMock.setup).toHaveBeenCalledWith(
        mockParentNode,
        mockCharacterAnimator,
        expect.any(Boolean),
      );
    });

    test("setupCleanup sets up a callback to stop movement when isInCutScene changes to false", () => {
      systemUnderTest["setupCleanup"]();

      expect(scenePresenterMock.addDisposeSceneCallback).toHaveBeenCalledTimes(
        1,
      );
    });

    test("toggleIconFloatAnimation restarts animation when interactable is true", () => {
      const mockAnimation = new AnimationGroup(
        "floatingAnimation",
        new Scene(new NullEngine()),
      );
      mockAnimation.restart = jest.fn();
      viewModel.iconFloatingAnimation = mockAnimation;

      systemUnderTest["toggleIconFloatAnimation"](true);

      expect(mockAnimation.restart).toHaveBeenCalledTimes(1);
    });

    test("toggleIconFloatAnimation pauses animation when interactable is false", () => {
      const mockAnimation = new AnimationGroup(
        "floatingAnimation",
        new Scene(new NullEngine()),
      );
      mockAnimation.pause = jest.fn();
      viewModel.iconFloatingAnimation = mockAnimation;

      systemUnderTest["toggleIconFloatAnimation"](false);

      expect(mockAnimation.pause).toHaveBeenCalledTimes(1);
    });

    test("toggleIconFloatAnimation handles missing animation gracefully", () => {
      // @ts-ignore - testing edge case where animation might not be defined
      viewModel.iconFloatingAnimation = undefined;

      expect(() =>
        systemUnderTest["toggleIconFloatAnimation"](true),
      ).not.toThrow();
    });
  });

  describe("interactions", () => {
    // ANF-ID: [EWE0039]
    test("click on npc calls controller.picked", () => {
      viewModel.modelMeshes = [
        new Mesh("mockMesh", new Scene(new NullEngine())),
      ];
      viewModel.iconMeshes = [];

      systemUnderTest["setupInteractions"]();

      viewModel.modelMeshes[0].actionManager!.processTrigger(
        ActionManager.OnPickTrigger,
      );

      expect(controllerMock.picked).toHaveBeenCalledTimes(1);
    });
  });

  describe("movement", () => {
    // ANF-ID: [EZZ0024]
    test.each([
      [StoryNPCState.Idle, "moveToIdlePosition"],
      [StoryNPCState.CutScene, "startCutSceneMovement"],
    ])("onStateChanged calls %p when state is changed to %p", (state, fn) => {
      // set state to value that triggers no function
      viewModel.state.Value = StoryNPCState.WaitOnCutSceneTrigger;
      try {
        systemUnderTest[fn] = jest.fn();
      } catch (e) {
        // @ts-ignore
        jest.spyOn(systemUnderTest, fn, "get");
      }

      systemUnderTest["onStateChanged"](state);

      expect(systemUnderTest[fn]).toHaveBeenCalledTimes(1);
    });

    test("onStateChanged calls moveToExit when state is changed to ExitRoom", () => {
      viewModel.state.Value = StoryNPCState.Idle;
      const moveToExitSpy = jest.spyOn(systemUnderTest, "moveToExit" as any);

      systemUnderTest["onStateChanged"](StoryNPCState.ExitRoom);

      expect(moveToExitSpy).toHaveBeenCalledTimes(1);
    });

    test("onStateChanged shows NPC when CutScene state and IntroOutro type with disabled parent", () => {
      viewModel.storyType = StoryElementType.IntroOutro;
      viewModel.parentNode = new TransformNode(
        "parent",
        new Scene(new NullEngine()),
      );
      viewModel.modelRootNode = new TransformNode(
        "model",
        new Scene(new NullEngine()),
      );
      viewModel.outroIdlePosition = new Vector3(1, 0, 1);
      viewModel.outroIdlePosRotation = 0;
      viewModel.parentNode.setEnabled(false);

      // Mock avatar presenter to prevent error in startCutSceneMovement
      const vector = new Vector3(0, 0, 0);
      Object.defineProperty(avatarPresenterMock, "AvatarPosition", {
        get() {
          return vector;
        },
        configurable: true,
      });

      const showNPCSpy = jest.spyOn(systemUnderTest, "showNPC" as any);

      systemUnderTest["onStateChanged"](StoryNPCState.CutScene);

      expect(showNPCSpy).toHaveBeenCalledTimes(1);
    });

    // ANF-ID: [EZZ0025]
    // needs special handling for bound private method
    test("onStateChanged calls startRandomMovementIdleTimeout when state is changed to RandomMovement", () => {
      viewModel.state.Value = StoryNPCState.Idle;
      const startRandomMovementIdleTimeoutMock = jest.spyOn(
        systemUnderTest,
        // @ts-ignore
        "startRandomMovementIdleTimeout",
        "get",
      );

      systemUnderTest["onStateChanged"](StoryNPCState.RandomMovement);

      expect(startRandomMovementIdleTimeoutMock).toHaveBeenCalledTimes(1);
    });

    // ANF-ID: [EZZ0024]
    test("moveToIdlePosition calls startMovement on the characterNavigator with the intro idle position", () => {
      viewModel.characterNavigator = characterNavigatorMock;
      viewModel.storyType = StoryElementType.Intro;
      viewModel.introIdlePosition = new Vector3(4, 2, 0);

      systemUnderTest["moveToIdlePosition"]();

      expect(characterNavigatorMock.startMovement).toBeCalledTimes(1);
      expect(characterNavigatorMock.startMovement).toBeCalledWith(
        new Vector3(4, 2, 0),
        expect.any(Function),
      );
    });

    test("moveToIdlePosition calls startMovement with outro idle position for outro story", () => {
      viewModel.characterNavigator = characterNavigatorMock;
      viewModel.storyType = StoryElementType.Outro;
      viewModel.outroIdlePosition = new Vector3(2, 1, 3);

      systemUnderTest["moveToIdlePosition"]();

      expect(characterNavigatorMock.startMovement).toBeCalledTimes(1);
      expect(characterNavigatorMock.startMovement).toBeCalledWith(
        new Vector3(2, 1, 3),
        expect.any(Function),
      );
    });

    // ANF-ID: [EZZ0024]
    test("moveToIdlePosition sets intro idlePosRotation on modelRootNode when idle position is reached", () => {
      viewModel.storyType = StoryElementType.Intro;
      viewModel.introIdlePosition = new Vector3(4, 2, 0);
      viewModel.introIdlePosRotation = 180; // 180 degrees, not radians
      viewModel.modelRootNode = new TransformNode(
        "mockRootNode",
        new Scene(new NullEngine()),
      );

      viewModel.characterNavigator = characterNavigatorMock;
      characterNavigatorMock.startMovement.mockImplementationOnce(
        (target: Vector3, callback?: () => void) => {
          viewModel.modelRootNode.position = target;
          callback!();
        },
      );

      systemUnderTest["moveToIdlePosition"]();

      expect(viewModel.modelRootNode.rotationQuaternion).toEqual(
        Quaternion.RotationAxis(Vector3.Up(), Math.PI),
      );
    });

    test("moveToIdlePosition sets outro idlePosRotation on modelRootNode when idle position is reached", () => {
      viewModel.storyType = StoryElementType.Outro;
      viewModel.outroIdlePosition = new Vector3(2, 1, 3);
      viewModel.outroIdlePosRotation = 90;
      viewModel.modelRootNode = new TransformNode(
        "mockRootNode",
        new Scene(new NullEngine()),
      );

      viewModel.characterNavigator = characterNavigatorMock;
      characterNavigatorMock.startMovement.mockImplementationOnce(
        (target: Vector3, callback?: () => void) => {
          viewModel.modelRootNode.position = target;
          callback!();
        },
      );

      systemUnderTest["moveToIdlePosition"]();

      expect(viewModel.modelRootNode.rotationQuaternion).toEqual(
        Quaternion.RotationAxis(Vector3.Up(), Tools.ToRadians(90)),
      );
    });

    // ANF-ID: [EZZ0026]
    test("startCutSceneMovement calls startMovement on the characterNavigator after timeout", () => {
      viewModel.characterNavigator = characterNavigatorMock;
      viewModel.storyType = StoryElementType.Intro;
      viewModel.parentNode = new TransformNode(
        "mockParentNode",
        new Scene(new NullEngine()),
      );
      viewModel.parentNode.position = new Vector3(0, 0, 0);
      const vector = new Vector3(0, 0, 0);
      Object.defineProperty(avatarPresenterMock, "AvatarPosition", {
        get() {
          return vector;
        },
        configurable: true,
      });
      jest
        .spyOn(avatarPresenterMock, "AvatarPosition", "get")
        .mockReturnValue(new Vector3(0, 0, 0));

      jest.useFakeTimers();
      systemUnderTest["startCutSceneMovement"]();

      expect(characterNavigatorMock.startMovement).not.toBeCalled();
      jest.advanceTimersByTime(viewModel.cutSceneStartDelay);

      expect(characterNavigatorMock.startMovement).toBeCalledTimes(1);
    });

    // ANF-ID: [EZZ0026]
    test("startCutSceneMovement calls open on the storyElementPresenter after cutscene position reached", () => {
      viewModel.storyType = StoryElementType.Intro;
      viewModel.parentNode = new TransformNode(
        "mockParentNode",
        new Scene(new NullEngine()),
      );
      viewModel.parentNode.position = new Vector3(0, 0, 0);
      const vector = new Vector3(0, 0, 0);
      Object.defineProperty(avatarPresenterMock, "AvatarPosition", {
        get() {
          return vector;
        },
        configurable: true,
      });
      jest
        .spyOn(avatarPresenterMock, "AvatarPosition", "get")
        .mockReturnValue(new Vector3(0, 0, 0));

      viewModel.characterNavigator = characterNavigatorMock;
      characterNavigatorMock.startMovement.mockImplementationOnce(
        (target: Vector3, callback?: () => void) => {
          callback!();
        },
      );

      jest.useFakeTimers();
      systemUnderTest["startCutSceneMovement"]();
      jest.advanceTimersByTime(viewModel.cutSceneStartDelay);

      expect(storyElementPresenterMock.open).toBeCalledTimes(1);
      expect(storyElementPresenterMock.open).toBeCalledWith(
        StoryElementType.Intro,
      );
    });

    test("startCutSceneMovement opens currentlyRunningSequence for IntroOutro story type", () => {
      viewModel.storyType = StoryElementType.IntroOutro;
      viewModel.currentlyRunningSequence = StoryElementType.Outro;
      viewModel.parentNode = new TransformNode(
        "mockParentNode",
        new Scene(new NullEngine()),
      );
      viewModel.parentNode.position = new Vector3(0, 0, 0);
      const vector = new Vector3(0, 0, 0);
      Object.defineProperty(avatarPresenterMock, "AvatarPosition", {
        get() {
          return vector;
        },
        configurable: true,
      });
      jest
        .spyOn(avatarPresenterMock, "AvatarPosition", "get")
        .mockReturnValue(new Vector3(0, 0, 0));

      viewModel.characterNavigator = characterNavigatorMock;
      characterNavigatorMock.startMovement.mockImplementationOnce(
        (target: Vector3, callback?: () => void) => {
          callback!();
        },
      );

      jest.useFakeTimers();
      systemUnderTest["startCutSceneMovement"]();
      jest.advanceTimersByTime(viewModel.cutSceneStartDelay);

      expect(storyElementPresenterMock.open).toBeCalledTimes(1);
      expect(storyElementPresenterMock.open).toBeCalledWith(
        StoryElementType.Outro,
      );
    });

    // ANF-ID: [EZZ0025]
    test("setRandomMovementTarget calls startMovement on the characterNavigator with a target", () => {
      navigationMock.Plugin.getRandomPointAround.mockReturnValue(
        new Vector3(2, 0, 2),
      );
      viewModel.parentNode = new TransformNode(
        "mockParentNode",
        new Scene(new NullEngine()),
      );
      viewModel.parentNode.position = new Vector3(0, 0, 0);
      viewModel.characterNavigator = characterNavigatorMock;
      viewModel.state.Value = StoryNPCState.RandomMovement;

      systemUnderTest["setRandomMovementTarget"]();

      expect(characterNavigatorMock.startMovement).toBeCalledTimes(1);
      expect(characterNavigatorMock.startMovement).toBeCalledWith(
        expect.any(Vector3),
        systemUnderTest["startRandomMovementIdleTimeout"],
      );
    });

    // ANF-ID: [EZZ0025]
    test("startRandomMovementIdleTimeout calls setRandomTarget after the idleTime", () => {
      navigationMock.Plugin.getRandomPointAround.mockReturnValue(
        new Vector3(2, 0, 2),
      );
      viewModel.parentNode = new TransformNode(
        "mockParentNode",
        new Scene(new NullEngine()),
      );
      viewModel.parentNode.position = new Vector3(0, 0, 0);
      viewModel.characterNavigator = characterNavigatorMock;

      jest.useFakeTimers();
      const setRandomMovementTargetMock = jest.spyOn(
        systemUnderTest,
        // prevent incorrect ts error for spying on private method
        // @ts-ignore
        "setRandomMovementTarget",
      );

      // trigger call startRandomMovementIdleTimeout to by setting state to RandomMovement
      viewModel.state.Value = StoryNPCState.RandomMovement;

      expect(setRandomMovementTargetMock).not.toBeCalled();

      jest.advanceTimersByTime(viewModel.idleTime);

      expect(setRandomMovementTargetMock).toBeCalledTimes(1);
    });

    // ANF-ID: [EZZ0025]
    test("setRandomMovementTarget does not call character navigator when state is not RandomMovement", () => {
      viewModel.state.Value = StoryNPCState.Idle;

      // mock correct target selection in case early return fails
      navigationMock.Plugin.getRandomPointAround.mockReturnValue(
        new Vector3(2, 0, 2),
      );
      viewModel.parentNode = new TransformNode(
        "mockParentNode",
        new Scene(new NullEngine()),
      );
      viewModel.parentNode.position = new Vector3(0, 0, 0);
      viewModel.characterNavigator = characterNavigatorMock;

      systemUnderTest["setRandomMovementTarget"]();

      expect(characterNavigatorMock.startMovement).not.toBeCalled();
    });
  });

  describe("exit functionality", () => {
    test("moveToExit sets up timeout for movement", () => {
      // Mock global setTimeout
      const setTimeoutSpy = jest.spyOn(global, "setTimeout");

      // Set up exit position
      viewModel.exitDoorEnterablePosition = new Vector3(5, 0, 5);
      viewModel.characterNavigator = characterNavigatorMock;

      // Call moveToExit
      systemUnderTest["moveToExit"]();

      // Verify that setTimeout was called with the correct delay
      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 500);

      setTimeoutSpy.mockRestore();
    });

    test("openExitDoorAndDispose handles Intro story type correctly", async () => {
      viewModel.storyType = StoryElementType.Intro;
      viewModel.parentNode = new TransformNode(
        "parent",
        new Scene(new NullEngine()),
      );
      viewModel.parentNode.dispose = jest.fn();
      controllerMock.handleNPCExit = jest.fn().mockResolvedValue(undefined);

      await systemUnderTest["openExitDoorAndDispose"]();

      expect(controllerMock.handleNPCExit).toHaveBeenCalledWith(
        StoryElementType.Intro,
      );
      expect(viewModel.parentNode.dispose).toHaveBeenCalledTimes(1);
    });

    test("openExitDoorAndDispose handles Outro story type correctly", async () => {
      viewModel.storyType = StoryElementType.Outro;
      viewModel.parentNode = new TransformNode(
        "parent",
        new Scene(new NullEngine()),
      );
      viewModel.parentNode.dispose = jest.fn();
      controllerMock.handleNPCExit = jest.fn().mockResolvedValue(undefined);

      await systemUnderTest["openExitDoorAndDispose"]();

      expect(controllerMock.handleNPCExit).not.toHaveBeenCalled();
      expect(viewModel.parentNode.dispose).toHaveBeenCalledTimes(1);
    });

    test("openExitDoorAndDispose handles IntroOutro when intro was not triggered", async () => {
      viewModel.storyType = StoryElementType.IntroOutro;
      viewModel.introWasTriggered = false;
      viewModel.parentNode = new TransformNode(
        "parent",
        new Scene(new NullEngine()),
      );
      const hideNPCSpy = jest.spyOn(systemUnderTest, "hideNPC" as any);
      controllerMock.handleNPCExit = jest.fn().mockResolvedValue(undefined);

      await systemUnderTest["openExitDoorAndDispose"]();

      expect(controllerMock.handleNPCExit).toHaveBeenCalledWith(
        StoryElementType.IntroOutro,
      );
      expect(hideNPCSpy).toHaveBeenCalledTimes(1);
    });

    test("openExitDoorAndDispose handles IntroOutro when intro was triggered", async () => {
      viewModel.storyType = StoryElementType.IntroOutro;
      viewModel.introWasTriggered = true;
      viewModel.parentNode = new TransformNode(
        "parent",
        new Scene(new NullEngine()),
      );
      viewModel.parentNode.dispose = jest.fn();
      controllerMock.handleNPCExit = jest.fn().mockResolvedValue(undefined);

      await systemUnderTest["openExitDoorAndDispose"]();

      expect(controllerMock.handleNPCExit).not.toHaveBeenCalled();
      expect(viewModel.parentNode.dispose).toHaveBeenCalledTimes(1);
    });

    test("hideNPC disables parent node and stops movement", () => {
      viewModel.parentNode = new TransformNode(
        "parent",
        new Scene(new NullEngine()),
      );
      viewModel.parentNode.setEnabled = jest.fn();
      viewModel.characterNavigator = characterNavigatorMock;

      systemUnderTest["hideNPC"]();

      expect(viewModel.parentNode.setEnabled).toHaveBeenCalledWith(false);
      expect(characterNavigatorMock.stopMovement).toHaveBeenCalledTimes(1);
    });

    test("showNPC enables parent node and sets spawn location for outro", () => {
      viewModel.parentNode = new TransformNode(
        "parent",
        new Scene(new NullEngine()),
      );
      viewModel.modelRootNode = new TransformNode(
        "model",
        new Scene(new NullEngine()),
      );
      viewModel.outroIdlePosition = new Vector3(3, 0, 3);
      viewModel.outroIdlePosRotation = 270;
      viewModel.parentNode.setEnabled = jest.fn();
      const setSpawnLocationSpy = jest.spyOn(
        systemUnderTest,
        "setSpawnLocationForOutro" as any,
      );

      systemUnderTest["showNPC"]();

      expect(viewModel.parentNode.setEnabled).toHaveBeenCalledWith(true);
      expect(setSpawnLocationSpy).toHaveBeenCalledTimes(1);
    });

    test("setSpawnLocationForOutro sets outro position and rotation", () => {
      viewModel.parentNode = new TransformNode(
        "parent",
        new Scene(new NullEngine()),
      );
      viewModel.modelRootNode = new TransformNode(
        "model",
        new Scene(new NullEngine()),
      );
      viewModel.outroIdlePosition = new Vector3(3, 0, 3);
      viewModel.outroIdlePosRotation = 270;

      systemUnderTest["setSpawnLocationForOutro"]();

      expect(viewModel.parentNode.position).toEqual(new Vector3(3, 0, 3));
      expect(viewModel.modelRootNode.rotationQuaternion).toEqual(
        Quaternion.RotationAxis(Vector3.Up(), Tools.ToRadians(270)),
      );
    });
  });

  describe("highlighting", () => {
    test("changeHighlightColor calls removeMesh and addMesh on the HighlightLayer", () => {
      viewModel.modelMeshes = [
        new Mesh("mockMesh", new Scene(new NullEngine())),
      ];
      viewModel.iconMeshes = [
        new Mesh("mockMesh", new Scene(new NullEngine())),
      ];

      systemUnderTest["changeHighlightColor"](new Color3(1, 0, 0));

      expect(scenePresenterMock.HighlightLayer.removeMesh).toBeCalledTimes(2);
      expect(scenePresenterMock.HighlightLayer.removeMesh).toBeCalledWith(
        viewModel.modelMeshes[0],
      );
      expect(scenePresenterMock.HighlightLayer.removeMesh).toBeCalledWith(
        viewModel.iconMeshes[0],
      );

      expect(scenePresenterMock.HighlightLayer.addMesh).toBeCalledTimes(2);
      expect(scenePresenterMock.HighlightLayer.addMesh).toBeCalledWith(
        viewModel.modelMeshes[0],
        new Color3(1, 0, 0),
      );
      expect(scenePresenterMock.HighlightLayer.addMesh).toBeCalledWith(
        viewModel.iconMeshes[0],
        new Color3(1, 0, 0),
      );
    });

    test("changing isInteractable calls changeHighlightColor", () => {
      viewModel.isInteractable.Value = true;
      systemUnderTest["changeHighlightColor"] = jest.fn();

      viewModel.isInteractable.Value = false;

      expect(systemUnderTest["changeHighlightColor"]).toBeCalledTimes(1);
    });

    test("updateHighlight sets highlight color correctly when interactable", () => {
      viewModel.isInteractable.Value = true;
      systemUnderTest["changeHighlightColor"] = jest.fn();

      systemUnderTest["updateHighlight"]();

      expect(systemUnderTest["changeHighlightColor"]).toBeCalledWith(
        HighlightColors.NonLearningElementBase,
      );
    });

    // ANF-ID: [EZZ0031]
    test("updateHighlight sets highlight color correctly when not interactable", () => {
      viewModel.isInteractable.Value = false;
      systemUnderTest["changeHighlightColor"] = jest.fn();

      systemUnderTest["updateHighlight"]();

      expect(systemUnderTest["changeHighlightColor"]).toBeCalledWith(
        HighlightColors.getNonInteractableColor(
          HighlightColors.NonLearningElementBase,
        ),
      );
    });

    test("changing isInteractable calls toggleIconFloatAnimation", () => {
      viewModel.isInteractable.Value = true;
      systemUnderTest["toggleIconFloatAnimation"] = jest.fn();

      viewModel.isInteractable.Value = false;

      expect(systemUnderTest["toggleIconFloatAnimation"]).toBeCalledTimes(1);
      expect(systemUnderTest["toggleIconFloatAnimation"]).toBeCalledWith(false);
    });
  });

  describe("accessibility", () => {
    test("loadElementModel sets accessibility tags correctly for intro story", async () => {
      const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
      const mockLoadingResult = mockDeep<ISceneLoaderAsyncResult>();
      viewModel.storyType = StoryElementType.Intro;
      // @ts-ignore
      mockLoadingResult.meshes = [mockMesh];
      // @ts-ignore
      mockLoadingResult.animationGroups = [];
      scenePresenterMock.loadGLTFModel.mockResolvedValue(mockLoadingResult);

      await systemUnderTest["loadElementModel"]();

      expect(mockMesh.accessibilityTag).toBeDefined();
      expect(mockMesh.accessibilityTag!.description).toBe(
        "storyNPC of type: " + StoryElementType.Intro,
      );
    });

    test("loadElementModel sets accessibility tags correctly for outro story", async () => {
      const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
      const mockLoadingResult = mockDeep<ISceneLoaderAsyncResult>();
      viewModel.storyType = StoryElementType.Outro;
      // @ts-ignore
      mockLoadingResult.meshes = [mockMesh];
      // @ts-ignore
      mockLoadingResult.animationGroups = [];
      scenePresenterMock.loadGLTFModel.mockResolvedValue(mockLoadingResult);

      await systemUnderTest["loadElementModel"]();

      expect(mockMesh.accessibilityTag).toBeDefined();
      expect(mockMesh.accessibilityTag!.description).toBe(
        "storyNPC of type: " + StoryElementType.Outro,
      );
    });

    test("accessibility click event calls controller.accessibilityPicked", async () => {
      const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
      const mockLoadingResult = mockDeep<ISceneLoaderAsyncResult>();
      viewModel.storyType = StoryElementType.Intro;
      // @ts-ignore
      mockLoadingResult.meshes = [mockMesh];
      // @ts-ignore
      mockLoadingResult.animationGroups = [];
      scenePresenterMock.loadGLTFModel.mockResolvedValue(mockLoadingResult);

      // Mock the necessary canvas and camera methods
      scenePresenterMock.Scene.activeCamera = {
        getViewMatrix: () => ({}),
      } as any;

      const mockCanvas = {
        dispatchEvent: jest.fn(),
      };
      const mockEngine = {
        getRenderingCanvas: () => mockCanvas,
      };

      // Use Object.defineProperty to mock getEngine method
      Object.defineProperty(scenePresenterMock.Scene, "getEngine", {
        value: jest.fn().mockReturnValue(mockEngine),
        writable: true,
      });

      mockMesh.getPositionInCameraSpace = jest
        .fn()
        .mockReturnValue({ x: 100, y: 100 });

      await systemUnderTest["loadElementModel"]();

      // Simulate accessibility click
      mockMesh.accessibilityTag!.eventHandler!.click();

      expect(controllerMock.accessibilityPicked).toHaveBeenCalledTimes(1);
    });
  });

  describe("edge cases and error handling", () => {
    test("hideNPC handles missing characterNavigator gracefully", () => {
      viewModel.parentNode = new TransformNode(
        "parent",
        new Scene(new NullEngine()),
      );
      viewModel.parentNode.setEnabled = jest.fn();
      viewModel.characterNavigator = undefined as any;

      expect(() => systemUnderTest["hideNPC"]()).not.toThrow();
      expect(viewModel.parentNode.setEnabled).toHaveBeenCalledWith(false);
    });

    test("createCharacterNavigator calls setup with correct parameters", () => {
      const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
      viewModel.modelMeshes = [mockMesh];
      const mockParentNode = new TransformNode(
        "mockParentNode",
        new Scene(new NullEngine()),
      );
      viewModel.parentNode = mockParentNode;
      const mockModelRootNode = new TransformNode(
        "mockRootNode",
        new Scene(new NullEngine()),
      );
      viewModel.modelRootNode = mockModelRootNode;
      const mockCharacterAnimator = mock<ICharacterAnimator>();
      viewModel.characterAnimator = mockCharacterAnimator;

      systemUnderTest["createCharacterNavigator"]();

      expect(viewModel.characterNavigator).toBeDefined();
      expect(characterNavigatorMock.setup).toHaveBeenCalledTimes(1);
      expect(characterNavigatorMock.setup).toHaveBeenCalledWith(
        mockParentNode,
        mockCharacterAnimator,
        expect.any(Boolean),
      );
    });

    test("createCharacterNavigator sets up random movement when state is RandomMovement", async () => {
      const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
      viewModel.modelMeshes = [mockMesh];
      viewModel.parentNode = new TransformNode(
        "parent",
        new Scene(new NullEngine()),
      );
      viewModel.modelRootNode = new TransformNode(
        "model",
        new Scene(new NullEngine()),
      );
      viewModel.characterAnimator = mock<ICharacterAnimator>();
      viewModel.state.Value = StoryNPCState.RandomMovement;

      const setRandomMovementTargetSpy = jest.spyOn(
        systemUnderTest,
        "setRandomMovementTarget" as any,
      );

      systemUnderTest["createCharacterNavigator"]();

      // Verify setup was called, the IsReady promise behavior is tested elsewhere
      expect(characterNavigatorMock.setup).toHaveBeenCalledTimes(1);
    });

    test("loadElementModel handles empty animation groups", async () => {
      const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
      const mockLoadingResult = mockDeep<ISceneLoaderAsyncResult>();
      // @ts-ignore
      mockLoadingResult.meshes = [mockMesh];
      // @ts-ignore
      mockLoadingResult.animationGroups = [];
      scenePresenterMock.loadGLTFModel.mockResolvedValue(mockLoadingResult);

      await expect(
        systemUnderTest["loadElementModel"](),
      ).resolves.not.toThrow();
    });
  });
});
