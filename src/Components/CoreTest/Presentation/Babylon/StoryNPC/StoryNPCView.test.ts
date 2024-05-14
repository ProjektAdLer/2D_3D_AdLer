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

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;
// @ts-ignore
scenePresenterMock.Scene = new Scene(new NullEngine());
const storyElementPresenterMock = mock<IStoryElementPresenter>();
const navigationMock = mockDeep<INavigation>();
const characterAnimatorMock = mock<ICharacterAnimator>();
const characterNavigatorMock = mock<ICharacterNavigator>();
// @ts-ignore
characterNavigatorMock.IsReady = Promise.resolve();

describe("StoryNPCView", () => {
  let systemUnderTest: StoryNPCView;
  let viewModel: StoryNPCViewModel;
  let controllerMock: IStoryNPCController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock
    );
    CoreDIContainer.rebind(
      PRESENTATION_TYPES.ICharacterAnimator
    ).toConstantValue(characterAnimatorMock);
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IStoryElementPresenter
    ).toConstantValue(storyElementPresenterMock);
    CoreDIContainer.rebind(CORE_TYPES.INavigation).toConstantValue(
      navigationMock
    );
    CoreDIContainer.rebind(
      PRESENTATION_TYPES.ICharacterNavigator
    ).toConstantValue(characterNavigatorMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    viewModel = new StoryNPCViewModel();
    viewModel.avatarPosition = new Vector3(0, 0, 0);
    controllerMock = mock<IStoryNPCController>();
    systemUnderTest = new StoryNPCView(viewModel, controllerMock);
  });

  describe("setup", () => {
    test("asyncSetupStoryNPC does not throw", async () => {
      const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
      const mockIdleAnimationGroup = new AnimationGroup(
        "anim_idle",
        new Scene(new NullEngine())
      );
      const mockWalkAnimationGroup = new AnimationGroup(
        "anim_walk",
        new Scene(new NullEngine())
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
        (vector: Vector3) => vector
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
        "anim_idle",
        new Scene(new NullEngine())
      );
      const mockLoadingResult = mockDeep<ISceneLoaderAsyncResult>();
      // @ts-ignore
      mockLoadingResult.meshes = [mockMesh];
      // @ts-ignore
      mockLoadingResult.animationGroups = [mockIdleAnimationGroup];
      scenePresenterMock.loadGLTFModel.mockResolvedValue(mockLoadingResult);

      await systemUnderTest["loadElementModel"]();

      expect(systemUnderTest["idleAnimation"]).toBe(mockIdleAnimationGroup);
    });

    // ANF-ID: [EZZ0022]
    test("loadElementModel gets walkAnimation from loading results", async () => {
      const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
      const mockWalkAnimationGroup = new AnimationGroup(
        "anim_walk",
        new Scene(new NullEngine())
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
      scenePresenterMock.loadModel.mockResolvedValue([mockMesh]);

      await systemUnderTest["loadIconModel"]();

      expect(scenePresenterMock.loadModel).toHaveBeenCalledTimes(1);
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
        new Scene(new NullEngine())
      );

      systemUnderTest["createParentNode"]();

      expect(viewModel.parentNode).toBeDefined();
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
    });

    // ANF-ID: [EZZ0023]
    test("setSpawnLocation sets the position and rotation to value from viewModel when state is Idle", () => {
      viewModel.modelRootNode = new TransformNode(
        "mockRootNode",
        new Scene(new NullEngine())
      );
      viewModel.parentNode = new TransformNode(
        "mockParentNode",
        new Scene(new NullEngine())
      );
      viewModel.state.Value = StoryNPCState.Idle;
      viewModel.storyType = StoryElementType.Intro;
      viewModel.introIdlePosition = new Vector3(4, 2, 0);
      viewModel.introIdlePosRotation = (3 / 4) * Math.PI;

      systemUnderTest["setSpawnLocation"]();

      expect(viewModel.parentNode.position).toEqual(new Vector3(4, 2, 0));
      expect(viewModel.modelRootNode.rotationQuaternion).toEqual(
        Quaternion.RotationAxis(Vector3.Up(), (3 / 4) * Math.PI)
      );
    });

    // ANF-ID: [EZZ0023]
    test("setSpawnLocation calcualtes spawn location when state is not Idle", () => {
      viewModel.modelRootNode = new TransformNode(
        "mockRootNode",
        new Scene(new NullEngine())
      );
      viewModel.parentNode = new TransformNode(
        "mockParentNode",
        new Scene(new NullEngine())
      );
      viewModel.state.Value = StoryNPCState.CutScene;
      viewModel.avatarPosition = new Vector3(10, 0, 0);
      // @ts-ignore
      viewModel.introSpawnPositionOffsetFromAvatar = new Vector3(1, 0, 0);
      viewModel.parentNode.position = new Vector3(0, 0, 0);
      viewModel.storyType = StoryElementType.Intro;

      systemUnderTest["setSpawnLocation"]();

      expect(viewModel.parentNode.position).toEqual(new Vector3(11, 0, 0));
      expect(viewModel.modelRootNode.rotationQuaternion).toEqual(
        Quaternion.RotationAxis(Vector3.Up(), Math.PI)
      );
    });

    test("createCharacterAnimator creates and sets up a new CharacterAnimator ", () => {
      const mockIdleAnimation = mock<AnimationGroup>();
      systemUnderTest["idleAnimation"] = mockIdleAnimation;
      const mockWalkAnimation = mock<AnimationGroup>();
      systemUnderTest["walkAnimation"] = mockWalkAnimation;
      const mockInteractionAnimation = mock<AnimationGroup>();
      systemUnderTest["interactionAnimation"] = mockInteractionAnimation;

      const mockModelRootNode = new TransformNode(
        "mockRootNode",
        new Scene(new NullEngine())
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
        new Scene(new NullEngine())
      );
      viewModel.parentNode = mockParentNode;
      const mockModelRootNode = new TransformNode(
        "mockRootNode",
        new Scene(new NullEngine())
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
        expect.any(Boolean)
      );
    });

    test("setupCleanup sets up a callback to stop movement when isInCutScene changes to false", () => {
      systemUnderTest["setupCleanup"]();

      expect(scenePresenterMock.addDisposeSceneCallback).toHaveBeenCalledTimes(
        1
      );
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
        ActionManager.OnPickTrigger
      );

      expect(controllerMock.picked).toHaveBeenCalledTimes(1);
    });

    //ANF-ID: [ELG0031]
    test("async setup adds mesh to the scene presenters HighlightLayer", async () => {
      viewModel.modelMeshes = [
        new Mesh("mockMesh", new Scene(new NullEngine())),
      ];

      viewModel.iconMeshes = [];

      systemUnderTest["addMeshesToHighlightLayer"]();

      expect(scenePresenterMock.HighlightLayer.addMesh).toBeCalledWith(
        viewModel.modelMeshes[0],
        expect.any(Color3)
      );
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

    // ANF-ID: [EZZ0025]
    // needs special handling for bound private method
    test("onStateChanged calls startRandomMovementIdleTimeout when state is changed to RandomMovement", () => {
      viewModel.state.Value = StoryNPCState.Idle;
      const startRandomMovementIdleTimeoutMock = jest.spyOn(
        systemUnderTest,
        // @ts-ignore
        "startRandomMovementIdleTimeout",
        "get"
      );

      systemUnderTest["onStateChanged"](StoryNPCState.RandomMovement);

      expect(startRandomMovementIdleTimeoutMock).toHaveBeenCalledTimes(1);
    });

    // ANF-ID: [EZZ0024]
    test("moveToIdlePosition calls startMovement on the characterNavigator with the idle position", () => {
      viewModel.characterNavigator = characterNavigatorMock;
      viewModel.storyType = StoryElementType.Intro;
      viewModel.introIdlePosition = new Vector3(4, 2, 0);

      systemUnderTest["moveToIdlePosition"]();

      expect(characterNavigatorMock.startMovement).toBeCalledTimes(1);
      expect(characterNavigatorMock.startMovement).toBeCalledWith(
        new Vector3(4, 2, 0),
        expect.any(Function)
      );
    });

    // ANF-ID: [EZZ0024]
    test("moveToIdlePosition sets idlePosRotation on modelRootNode when idle position is reached", () => {
      viewModel.storyType = StoryElementType.Intro;
      viewModel.introIdlePosition = new Vector3(4, 2, 0);
      viewModel.introIdlePosRotation = Math.PI;
      viewModel.modelRootNode = new TransformNode(
        "mockRootNode",
        new Scene(new NullEngine())
      );

      viewModel.characterNavigator = characterNavigatorMock;
      characterNavigatorMock.startMovement.mockImplementationOnce(
        (target: Vector3, callback?: () => void) => {
          viewModel.modelRootNode.position = target;
          callback!();
        }
      );

      systemUnderTest["moveToIdlePosition"]();

      expect(viewModel.modelRootNode.rotationQuaternion).toEqual(
        Quaternion.RotationAxis(Vector3.Up(), Math.PI)
      );
    });

    test("startCutSceneMovement calls startMovement on the characterNavigator after timeout", () => {
      viewModel.characterNavigator = characterNavigatorMock;
      viewModel.storyType = StoryElementType.Intro;
      viewModel.avatarPosition = new Vector3(10, 0, 0);
      viewModel.parentNode = new TransformNode(
        "mockParentNode",
        new Scene(new NullEngine())
      );
      viewModel.parentNode.position = new Vector3(0, 0, 0);

      jest.useFakeTimers();
      systemUnderTest["startCutSceneMovement"]();

      expect(characterNavigatorMock.startMovement).not.toBeCalled();
      jest.advanceTimersByTime(viewModel.cutSceneStartDelay);

      expect(characterNavigatorMock.startMovement).toBeCalledTimes(1);
    });

    test("startCutSceneMovement calls open on the storyElementPresenter after cutscene position reached", () => {
      viewModel.storyType = StoryElementType.Intro;
      viewModel.avatarPosition = new Vector3(10, 0, 0);
      viewModel.parentNode = new TransformNode(
        "mockParentNode",
        new Scene(new NullEngine())
      );
      viewModel.parentNode.position = new Vector3(0, 0, 0);

      viewModel.characterNavigator = characterNavigatorMock;
      characterNavigatorMock.startMovement.mockImplementationOnce(
        (target: Vector3, callback?: () => void) => {
          callback!();
        }
      );

      jest.useFakeTimers();
      systemUnderTest["startCutSceneMovement"]();
      jest.advanceTimersByTime(viewModel.cutSceneStartDelay);

      expect(storyElementPresenterMock.open).toBeCalledTimes(1);
      expect(storyElementPresenterMock.open).toBeCalledWith(
        StoryElementType.Intro
      );
    });

    // ANF-ID: [EZZ0025]
    test("setRandomMovementTarget calls startMovement on the characterNavigator with a target", () => {
      navigationMock.Plugin.getRandomPointAround.mockReturnValue(
        new Vector3(2, 0, 2)
      );
      viewModel.parentNode = new TransformNode(
        "mockParentNode",
        new Scene(new NullEngine())
      );
      viewModel.parentNode.position = new Vector3(0, 0, 0);
      viewModel.characterNavigator = characterNavigatorMock;
      viewModel.state.Value = StoryNPCState.RandomMovement;

      systemUnderTest["setRandomMovementTarget"]();

      expect(characterNavigatorMock.startMovement).toBeCalledTimes(1);
      expect(characterNavigatorMock.startMovement).toBeCalledWith(
        expect.any(Vector3),
        systemUnderTest["startRandomMovementIdleTimeout"]
      );
    });

    // ANF-ID: [EZZ0025]
    test("startRandomMovementIdleTimeout calls setRandomTarget after the idleTime", () => {
      navigationMock.Plugin.getRandomPointAround.mockReturnValue(
        new Vector3(2, 0, 2)
      );
      viewModel.parentNode = new TransformNode(
        "mockParentNode",
        new Scene(new NullEngine())
      );
      viewModel.parentNode.position = new Vector3(0, 0, 0);
      viewModel.characterNavigator = characterNavigatorMock;

      jest.useFakeTimers();
      const setRandomMovementTargetMock = jest.spyOn(
        systemUnderTest,
        // prevent incorrect ts error for spying on private method
        // @ts-ignore
        "setRandomMovementTarget"
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
        new Vector3(2, 0, 2)
      );
      viewModel.parentNode = new TransformNode(
        "mockParentNode",
        new Scene(new NullEngine())
      );
      viewModel.parentNode.position = new Vector3(0, 0, 0);
      viewModel.characterNavigator = characterNavigatorMock;

      systemUnderTest["setRandomMovementTarget"]();

      expect(characterNavigatorMock.startMovement).not.toBeCalled();
    });
  });
});
