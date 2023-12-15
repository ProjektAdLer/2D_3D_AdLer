import {
  AnimationGroup,
  EventState,
  Material,
  Mesh,
  MeshBuilder,
  NullEngine,
  Nullable,
  Observable,
  Observer,
  Scene,
  Texture,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import { mock, mockDeep } from "jest-mock-extended";
import { config } from "../../../../../config";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import AvatarView from "../../../../Core/Presentation/Babylon/Avatar/AvatarView";
import AvatarViewModel, {
  AvatarAnimationAction,
  AvatarAnimationState,
} from "../../../../Core/Presentation/Babylon/Avatar/AvatarViewModel";
import IAvatarController from "../../../../Core/Presentation/Babylon/Avatar/IAvatarController";
import INavigation from "../../../../Core/Presentation/Babylon/Navigation/INavigation";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import IMovementIndicator from "../../../../Core/Presentation/Babylon/MovementIndicator/IMovementIndicator";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import MovementIndicator from "../../../../Core/Presentation/Babylon/MovementIndicator/MovementIndicator";
import Logger from "../../../../Core/Adapters/Logger/Logger";
import { LearningSpaceTemplateType } from "../../../../Core/Domain/Types/LearningSpaceTemplateType";
import StateMachine from "../../../../Core/Presentation/Utils/StateMachine/StateMachine";

const movementIndicatorMock = mock<MovementIndicator>();

// setup navigation mock
const navigationMock = mock<INavigation>();
navigationMock.Plugin.getClosestPoint = jest
  .fn()
  .mockReturnValue(Vector3.Zero());
navigationMock.Crowd.onReachTargetObservable = new Observable();
navigationMock.Crowd.onReachTargetObservable.add = jest.fn();
navigationMock.Crowd.agentTeleport = jest.fn();

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

// util function to create system under test
function createAvatarView(): [AvatarView, AvatarViewModel] {
  const viewModel = new AvatarViewModel();
  viewModel.learningSpaceTemplateType = LearningSpaceTemplateType.L;
  const controller = mock<IAvatarController>();
  const avatarView = new AvatarView(viewModel, controller);
  return [avatarView, viewModel];
}

function setupMockedMesh(): Mesh {
  const mockMesh = mockDeep<Mesh>();
  mockMesh.material = mockDeep<Material>();
  mockMesh.material.name = "Eyes_mat";
  mockMesh.material.getActiveTextures.mockReturnValue([]);
  scenePresenterMock.loadModel.mockResolvedValue([mockMesh]);
  return mockMesh;
}

describe("AvatarView", () => {
  let systemUnderTest: AvatarView;
  let viewModel: AvatarViewModel;

  beforeAll(() => {
    // setup dependency injection
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(CORE_TYPES.INavigation).toConstantValue(
      navigationMock
    );
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock
    );
    CoreDIContainer.rebind<IMovementIndicator>(
      PRESENTATION_TYPES.IMovementIndicator
    ).toConstantValue(movementIndicatorMock);
  });

  beforeEach(() => {
    [systemUnderTest, viewModel] = createAvatarView();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
    CoreDIContainer.restore();
  });

  describe("body animations", () => {
    test("async setup gets the animations from the scene", async () => {
      navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
      //@ts-ignore
      navigationMock.IsReady = Promise.resolve();

      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
      );
      scenePresenterMock.Scene.getAnimationGroupByName.mockReturnValue(
        mockDeep<AnimationGroup>()
      );

      setupMockedMesh();

      await systemUnderTest.asyncSetup();

      expect(systemUnderTest["viewModel"].idleAnimation).toBeDefined();
      expect(systemUnderTest["viewModel"].walkAnimation).toBeDefined();
    });

    test("setupAvatarAnimations starts idle and walking animation and sets weights", () => {
      scenePresenterMock.Scene.getAnimationGroupByName
        .mockReturnValueOnce(mockDeep<AnimationGroup>())
        .mockReturnValueOnce(mockDeep<AnimationGroup>())
        .mockReturnValueOnce(mockDeep<AnimationGroup>());

      systemUnderTest["setupAvatarAnimations"]();

      expect(
        systemUnderTest["viewModel"].idleAnimation.play
      ).toHaveBeenCalledTimes(1);
      expect(
        systemUnderTest["viewModel"].walkAnimation.play
      ).toHaveBeenCalledTimes(1);
      expect(
        systemUnderTest["viewModel"].idleAnimation.setWeightForAllAnimatables
      ).toHaveBeenCalledTimes(1);
      expect(
        systemUnderTest["viewModel"].walkAnimation.setWeightForAllAnimatables
      ).toHaveBeenCalledTimes(1);
    });

    test("onBeforeAnimationTransitionObserver removes the given observer from the onBeforeAniamtionObservable of the scene when the transition is done", () => {
      const fromAnimation = mock<AnimationGroup>();
      const toAnimation = mock<AnimationGroup>();
      const mockObserver = mock<Nullable<Observer<Scene>>>();

      systemUnderTest["onBeforeAnimationTransitionObserver"](
        fromAnimation,
        toAnimation,
        mockObserver,
        () => 1 // transition is done within the first call
      );

      expect(
        scenePresenterMock.Scene.onBeforeAnimationsObservable.remove
      ).toHaveBeenCalledTimes(1);
      expect(
        scenePresenterMock.Scene.onBeforeAnimationsObservable.remove
      ).toHaveBeenCalledWith(mockObserver);
    });

    test("onBeforeAnimationTransitionObserver sets from animation weight to 0 and to animation weigth to 1 when transition is done", () => {
      const fromAnimation = mock<AnimationGroup>();
      const toAnimation = mock<AnimationGroup>();
      const mockObserver = mock<Nullable<Observer<Scene>>>();

      systemUnderTest["onBeforeAnimationTransitionObserver"](
        fromAnimation,
        toAnimation,
        mockObserver,
        () => 1 // transition is done within the first call
      );

      expect(fromAnimation.setWeightForAllAnimatables).toHaveBeenCalledTimes(1);
      expect(fromAnimation.setWeightForAllAnimatables).toHaveBeenCalledWith(0);
      expect(toAnimation.setWeightForAllAnimatables).toHaveBeenCalledTimes(1);
      expect(toAnimation.setWeightForAllAnimatables).toHaveBeenCalledWith(1);
    });

    test("onBeforeAnimationTransitionObserver sets from animation weight to 1-increment and to animation weigth to increment for one step of the transition", () => {
      const fromAnimation = mock<AnimationGroup>();
      const toAnimation = mock<AnimationGroup>();
      const mockObserver = mock<Nullable<Observer<Scene>>>();

      systemUnderTest["onBeforeAnimationTransitionObserver"](
        fromAnimation,
        toAnimation,
        mockObserver,
        () => 0.1
      );

      expect(fromAnimation.setWeightForAllAnimatables).toHaveBeenCalledTimes(1);
      expect(fromAnimation.setWeightForAllAnimatables).toHaveBeenCalledWith(
        0.9
      );
      expect(toAnimation.setWeightForAllAnimatables).toHaveBeenCalledTimes(1);
      expect(toAnimation.setWeightForAllAnimatables).toHaveBeenCalledWith(0.1);
    });

    test("transitionFromIdleToWalk resets animationBlendValue to 0", () => {
      systemUnderTest["transitionFromIdleToWalk"]();

      expect(systemUnderTest["animationBlendValue"]).toBe(0);
    });

    test("anonymous callback function on onBeforeAnimationsObservable in transitionFromIdleToWalk doesn't throw", () => {
      viewModel.idleAnimation = mock<AnimationGroup>();
      viewModel.walkAnimation = mock<AnimationGroup>();
      navigationMock.Crowd.getAgentVelocity = jest
        .fn()
        .mockReturnValue(new Vector3(1, 2, 3));

      // setup mock implementation to get a reference to the anonymous callback function
      let anonymousCallback: (eventData: Scene, eventState: EventState) => void;
      scenePresenterMock.Scene.onBeforeAnimationsObservable.add.mockImplementation(
        (callback) => {
          anonymousCallback = callback;
          return mock<Observer<Scene>>();
        }
      );
      systemUnderTest["transitionFromIdleToWalk"]();

      expect(() =>
        anonymousCallback!(mock<Scene>(), mock<EventState>())
      ).not.toThrow();
    });

    test("getTimedAnimationInterpolationIncrement returns a number", () => {
      navigationMock.Crowd.getAgentVelocity = jest
        .fn()
        .mockReturnValue(new Vector3(1, 2, 3));

      const result =
        systemUnderTest["getTimedAnimationInterpolationIncrement"](100);

      expect(typeof result).toBe("number");
    });

    test("transitionFromWalkToIdle resets animationBlendValue to 0", () => {
      systemUnderTest["transitionFromWalkToIdle"]();

      expect(systemUnderTest["animationBlendValue"]).toBe(0);
    });

    test("anonymous callback function on onBeforeAnimationsObservable in transitionFromWalkToIdle doesn't throw", () => {
      viewModel.idleAnimation = mock<AnimationGroup>();
      viewModel.walkAnimation = mock<AnimationGroup>();

      // setup mock implementation to get a reference to the anonymous callback function
      let anonymousCallback: (eventData: Scene, eventState: EventState) => void;
      scenePresenterMock.Scene.onBeforeAnimationsObservable.add.mockImplementation(
        (callback) => {
          anonymousCallback = callback;
          return mock<Observer<Scene>>();
        }
      );
      systemUnderTest["transitionFromWalkToIdle"]();

      expect(() =>
        anonymousCallback!(mock<Scene>(), mock<EventState>())
      ).not.toThrow();
    });

    test("getVelocityAnimationInterpolationIncrement returns the a number", () => {
      navigationMock.Crowd.getAgentVelocity = jest
        .fn()
        .mockReturnValue(new Vector3(1, 2, 3));

      const result =
        systemUnderTest["getVelocityAnimationInterpolationIncrement"]();

      expect(typeof result).toBe("number");
    });

    test("transitionFromIdleOrWalkToInteract resets animationBlendValue to 0", () => {
      systemUnderTest["viewModel"].animationStateMachine = new StateMachine<
        AvatarAnimationState,
        AvatarAnimationAction
      >(AvatarAnimationState.Idle, []);
      systemUnderTest["viewModel"].interactionAnimation =
        mock<AnimationGroup>();

      systemUnderTest["transitionFromIdleOrWalkToInteract"]();

      expect(systemUnderTest["animationBlendValue"]).toBe(0);
    });

    test("transitionFromIdleOrWalkToInteract plays the interactionAnimation non-looping", () => {
      viewModel.animationStateMachine = new StateMachine<
        AvatarAnimationState,
        AvatarAnimationAction
      >(AvatarAnimationState.Walking, []);
      viewModel.interactionAnimation = mock<AnimationGroup>();

      systemUnderTest["transitionFromIdleOrWalkToInteract"]();

      expect(viewModel.interactionAnimation.play).toHaveBeenCalledTimes(1);
      expect(viewModel.interactionAnimation.play).toHaveBeenCalledWith(false);
    });

    test("anonymous observer function on onBeforeAnimationsObservable in transitionFromIdleOrWalkToInteract doesn't throw", () => {
      viewModel.idleAnimation = mock<AnimationGroup>();
      viewModel.walkAnimation = mock<AnimationGroup>();
      viewModel.interactionAnimation = mock<AnimationGroup>();
      viewModel.animationStateMachine = new StateMachine<
        AvatarAnimationState,
        AvatarAnimationAction
      >(AvatarAnimationState.Idle, []);

      // setup mock implementation to get a reference to the anonymous callback function
      let anonymousCallback: (eventData: Scene, eventState: EventState) => void;
      scenePresenterMock.Scene.onBeforeAnimationsObservable.add.mockImplementation(
        (callback) => {
          anonymousCallback = callback;
          return mock<Observer<Scene>>();
        }
      );

      systemUnderTest["transitionFromIdleOrWalkToInteract"]();

      expect(() =>
        anonymousCallback!(mock<Scene>(), mock<EventState>())
      ).not.toThrow();
    });

    test("transitionFromInteractToIdle resets animationBlendValue to 0", () => {
      systemUnderTest["transitionFromInteractToIdle"]();

      expect(systemUnderTest["animationBlendValue"]).toBe(0);
    });

    test("anonymous observer function on onBeforeAnimationsObservable in transitionFromInteractToIdle doesn't throw", () => {
      viewModel.idleAnimation = mock<AnimationGroup>();
      viewModel.interactionAnimation = mock<AnimationGroup>();

      // setup mock implementation to get a reference to the anonymous callback function
      let anonymousCallback: (eventData: Scene, eventState: EventState) => void;
      scenePresenterMock.Scene.onBeforeAnimationsObservable.add.mockImplementation(
        (callback) => {
          anonymousCallback = callback;
          return mock<Observer<Scene>>();
        }
      );
      systemUnderTest["transitionFromInteractToIdle"]();

      expect(() =>
        anonymousCallback!(mock<Scene>(), mock<EventState>())
      ).not.toThrow();
    });
  });

  describe("blink animation", () => {
    test("setBlinkTimeout calls setTimeout with a number between blinkInterval and blinkInterval plus blickIntervalMaxOffset", () => {
      jest.useFakeTimers();
      const setTimeoutMock = jest.spyOn(global, "setTimeout");

      systemUnderTest["setBlinkTimeout"]();

      expect(setTimeoutMock).toHaveBeenCalledTimes(1);
      expect(setTimeoutMock.mock.calls[0][1]).toBeGreaterThanOrEqual(
        viewModel.blinkInterval
      );
      expect(setTimeoutMock.mock.calls[0][1]).toBeLessThanOrEqual(
        viewModel.blinkInterval + viewModel.blinkIntervalMaxOffset
      );

      setTimeoutMock.mockRestore();
      jest.clearAllTimers();
    });

    test("blink timeout sets the blinkTextureUOffset on the eye texture", () => {
      jest.useFakeTimers();
      const eyeTexture = new Texture("eyeTexture", new Scene(new NullEngine()));
      viewModel.eyeTextures = [eyeTexture];

      systemUnderTest["setBlinkTimeout"]();
      jest.runOnlyPendingTimers();

      expect(viewModel.eyeTextures[0].uOffset).toBe(
        viewModel.blinkTextureUOffset
      );

      jest.clearAllTimers();
    });

    test("blink timeout sets timeout to reset eye uvs", () => {
      jest.useFakeTimers();
      const setTimeoutMock = jest.spyOn(global, "setTimeout");
      const eyeTexture = new Texture("eyeTexture", new Scene(new NullEngine()));
      viewModel.eyeTextures = [eyeTexture];

      systemUnderTest["setBlinkTimeout"]();
      jest.runOnlyPendingTimers();

      expect(setTimeoutMock.mock.calls[2][1]).toBe(viewModel.blinkDuration);

      setTimeoutMock.mockRestore();
      jest.clearAllTimers();
    });

    test("blink timeout resets the blinkTextureUOffset on the eye texture", () => {
      jest.useFakeTimers();
      const eyeTexture = new Texture("eyeTexture", new Scene(new NullEngine()));
      viewModel.eyeTextures = [eyeTexture];

      systemUnderTest["setBlinkTimeout"]();
      jest.runOnlyPendingTimers();
      expect(viewModel.eyeTextures[0].uOffset).toBe(
        viewModel.blinkTextureUOffset
      );

      jest.runOnlyPendingTimers();
      expect(viewModel.eyeTextures[0].uOffset).toBe(0);

      jest.clearAllTimers();
    });
  });

  describe("model loading", () => {
    test("async setup calls the scenePresenter to load avatar models", async () => {
      navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
      //@ts-ignore
      navigationMock.IsReady = Promise.resolve();

      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
      );
      scenePresenterMock.Scene.getAnimationGroupByName.mockReturnValue(
        mockDeep<AnimationGroup>()
      );

      setupMockedMesh();

      await systemUnderTest.asyncSetup();

      expect(scenePresenterMock.loadModel).toHaveBeenCalledTimes(1);
    });

    test("async setup gets the parent node for the avatar", async () => {
      navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
      //@ts-ignore
      navigationMock.IsReady = Promise.resolve();

      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
      );
      scenePresenterMock.Scene.getAnimationGroupByName.mockReturnValue(
        mockDeep<AnimationGroup>()
      );

      setupMockedMesh();

      await systemUnderTest.asyncSetup();

      expect(
        scenePresenterMock.Scene.getTransformNodeByName
      ).toHaveBeenCalledWith("AvatarParentNode");
    });

    test("async setup sets the parent node as parent of the first loaded mesh", async () => {
      navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
      //@ts-ignore
      navigationMock.IsReady = Promise.resolve();

      const parentNode = new TransformNode(
        "AvatarParentNode",
        new Scene(new NullEngine())
      );
      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        parentNode
      );
      scenePresenterMock.Scene.getAnimationGroupByName.mockReturnValue(
        mockDeep<AnimationGroup>()
      );

      const mockMesh = setupMockedMesh();

      await systemUnderTest.asyncSetup();

      expect(mockMesh.setParent).toHaveBeenCalledTimes(1);
      expect(mockMesh.setParent).toHaveBeenCalledWith(parentNode);
    });
  });

  describe("navigation/movement", () => {
    test("async setup calls addAgent with the navigation crowd", async () => {
      navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
      //@ts-ignore
      navigationMock.IsReady = Promise.resolve();

      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
      );
      scenePresenterMock.Scene.getAnimationGroupByName.mockReturnValue(
        mockDeep<AnimationGroup>()
      );

      setupMockedMesh();

      await systemUnderTest.asyncSetup();

      expect(systemUnderTest["viewModel"].agentIndex).toBe(42);
    });

    test("async setup doesn't calls addAgent with the navigation crowd until navigation is ready", async () => {
      navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
      );
      scenePresenterMock.Scene.getAnimationGroupByName.mockReturnValue(
        mockDeep<AnimationGroup>()
      );

      expect(systemUnderTest["viewModel"].agentIndex).toBeUndefined();

      //@ts-ignore
      navigationMock.IsReady = Promise.resolve();

      setupMockedMesh();

      await systemUnderTest.asyncSetup();

      expect(systemUnderTest["viewModel"].agentIndex).toBe(42);
    });

    test("moveAvatar gets new position and velocity from navigation crowd", async () => {
      config.isDebug = false;

      navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
      //@ts-ignore
      navigationMock.IsReady = Promise.resolve();

      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
      );
      scenePresenterMock.Scene.getAnimationGroupByName.mockReturnValue(
        mockDeep<AnimationGroup>()
      );

      setupMockedMesh();

      navigationMock.Crowd.getAgentPosition = jest
        .fn()
        .mockReturnValue(new Vector3(0, 0, 0));
      navigationMock.Crowd.getAgentVelocity = jest
        .fn()
        .mockReturnValue(new Vector3(0, 0, 0));

      await systemUnderTest.asyncSetup();

      systemUnderTest["moveAvatar"]();

      expect(navigationMock.Crowd.getAgentVelocity).toBeCalledWith(42);
    });

    test("async setup doesn't calls addAgent with the navigation crowd until navigation is ready", async () => {
      navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
      );
      scenePresenterMock.Scene.getAnimationGroupByName.mockReturnValue(
        mockDeep<AnimationGroup>()
      );

      setupMockedMesh();

      expect(systemUnderTest["viewModel"].agentIndex).toBeUndefined();

      //@ts-ignore
      navigationMock.IsReady = Promise.resolve();

      await systemUnderTest.asyncSetup();

      expect(systemUnderTest["viewModel"].agentIndex).toBe(42);
    });

    test("moveAvatar sets new avatar rotation", async () => {
      config.isDebug = false;

      navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
      //@ts-ignore
      navigationMock.IsReady = Promise.resolve();

      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
      );
      scenePresenterMock.Scene.getAnimationGroupByName.mockReturnValue(
        mockDeep<AnimationGroup>()
      );

      setupMockedMesh();

      navigationMock.Crowd.getAgentPosition = jest
        .fn()
        .mockReturnValue(new Vector3(1, 2, 3));
      navigationMock.Crowd.getAgentVelocity = jest
        .fn()
        .mockReturnValue(new Vector3(1, 2, 3));

      await systemUnderTest.asyncSetup();

      const oldRotation =
        systemUnderTest["viewModel"].meshes[0].rotationQuaternion;

      systemUnderTest["moveAvatar"]();

      expect(
        systemUnderTest["viewModel"].meshes[0].rotationQuaternion
      ).not.toBe(oldRotation);
    });

    test("onMovementTargetChanged does nothing when the target is changed to null", () => {
      jest.spyOn(StateMachine.prototype, "applyAction");
      scenePresenterMock.Scene.getAnimationGroupByName.mockReturnValue(
        mockDeep<AnimationGroup>()
      );
      systemUnderTest["setupAvatarAnimations"]();

      systemUnderTest["onMovementTargetChanged"](null);

      expect(movementIndicatorMock.display).not.toHaveBeenCalled();
      expect(
        viewModel["animationStateMachine"].applyAction
      ).not.toHaveBeenCalled();
    });

    test("onMovementTargetChanged calls display on the movement indicator when the target is changed to a vector", () => {
      scenePresenterMock.Scene.getAnimationGroupByName.mockReturnValue(
        mockDeep<AnimationGroup>()
      );
      systemUnderTest["setupAvatarAnimations"]();
      const target = new Vector3(1, 1, 1);

      systemUnderTest["onMovementTargetChanged"](target);

      expect(movementIndicatorMock.display).toHaveBeenCalledTimes(1);
      expect(movementIndicatorMock.display).toHaveBeenCalledWith(target);
    });

    test("onMovementTargetChanged calls applyAction with the MovementStarted action on the animation state machine when the target is changed to a vector", () => {
      jest.spyOn(StateMachine.prototype, "applyAction");
      scenePresenterMock.Scene.getAnimationGroupByName.mockReturnValue(
        mockDeep<AnimationGroup>()
      );
      systemUnderTest["setupAvatarAnimations"]();

      systemUnderTest["onMovementTargetChanged"](new Vector3(1, 1, 1));

      expect(
        viewModel["animationStateMachine"].applyAction
      ).toHaveBeenCalledTimes(1);
      expect(
        viewModel["animationStateMachine"].applyAction
      ).toHaveBeenCalledWith(AvatarAnimationAction.MovementStarted);
    });

    test("onReachMovementTarget calls hide on the indicator when the parentNode position and the finalMovementTarget are close enough", () => {
      viewModel.movementTarget = new Vector3(1, 1, 1.2);
      viewModel.parentNode = new TransformNode(
        "parentNode",
        new Scene(new NullEngine())
      );
      viewModel.parentNode.position = new Vector3(1, 1, 1);
      scenePresenterMock.Scene.getAnimationGroupByName.mockReturnValue(
        mockDeep<AnimationGroup>()
      );
      systemUnderTest["setupAvatarAnimations"]();

      systemUnderTest["onReachMovementTarget"]();

      expect(movementIndicatorMock.hide).toHaveBeenCalledTimes(1);
    });

    test("onReachMovementTarget resets the movementTarget to null", () => {
      viewModel.movementTarget = new Vector3(1, 1, 1.2);
      viewModel.parentNode = new TransformNode(
        "parentNode",
        new Scene(new NullEngine())
      );
      viewModel.parentNode.position = new Vector3(1, 1, 1);
      scenePresenterMock.Scene.getAnimationGroupByName.mockReturnValue(
        mockDeep<AnimationGroup>()
      );
      systemUnderTest["setupAvatarAnimations"]();

      systemUnderTest["onReachMovementTarget"]();

      expect(viewModel.movementTarget.Value).toBeNull();
    });

    test("onReachMovementTarget calls navigation.Crowd.agentTeleport with the parentNode position", () => {
      viewModel.movementTarget = new Vector3(1, 1, 1.2);
      viewModel.parentNode = new TransformNode(
        "parentNode",
        new Scene(new NullEngine())
      );
      viewModel.parentNode.position = new Vector3(42, 43, 44);
      scenePresenterMock.Scene.getAnimationGroupByName.mockReturnValue(
        mockDeep<AnimationGroup>()
      );
      systemUnderTest["setupAvatarAnimations"]();

      systemUnderTest["onReachMovementTarget"]();

      expect(navigationMock.Crowd.agentTeleport).toHaveBeenCalledTimes(1);
      expect(navigationMock.Crowd.agentTeleport).toHaveBeenCalledWith(
        viewModel.agentIndex,
        viewModel.parentNode.position
      );
    });
  });

  describe("debug", () => {
    test("debug_displayVelocity calls MeshBuilder.CreateDashedLines", async () => {
      navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
      //@ts-ignore
      navigationMock.IsReady = Promise.resolve();

      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
      );
      scenePresenterMock.Scene.getAnimationGroupByName.mockReturnValue(
        mockDeep<AnimationGroup>()
      );

      setupMockedMesh();

      navigationMock.Crowd.getAgentPosition = jest
        .fn()
        .mockReturnValue(new Vector3(1, 2, 3));
      navigationMock.Crowd.getAgentVelocity = jest
        .fn()
        .mockReturnValue(new Vector3(1, 2, 3));

      MeshBuilder.CreateDashedLines = jest.fn();

      await systemUnderTest.asyncSetup();
      systemUnderTest["viewModel"].parentNode.position = new Vector3(0, 0, 0); // reset position to unsnapped position

      systemUnderTest["debug_displayVelocity"](
        systemUnderTest["viewModel"],
        systemUnderTest["scenePresenter"],
        new Vector3(1, 2, 3)
      );

      expect(MeshBuilder.CreateDashedLines).toHaveBeenCalledTimes(1);
    });

    test("debug_displayVelocity calls logger.log", async () => {
      navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
      //@ts-ignore
      navigationMock.IsReady = Promise.resolve();

      const parentNode = new TransformNode(
        "AvatarParentNode",
        new Scene(new NullEngine())
      );
      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        parentNode
      );
      scenePresenterMock.Scene.getAnimationGroupByName.mockReturnValue(
        mockDeep<AnimationGroup>()
      );

      setupMockedMesh();

      navigationMock.Crowd.getAgentPosition = jest
        .fn()
        .mockReturnValue(new Vector3(1, 2, 3));
      navigationMock.Crowd.getAgentVelocity = jest
        .fn()
        .mockReturnValue(new Vector3(1, 2, 3));

      MeshBuilder.CreateDashedLines = jest.fn();

      const loggerMock = jest.spyOn(Logger.prototype, "log");

      await systemUnderTest.asyncSetup();
      systemUnderTest["viewModel"].parentNode.position = new Vector3(0, 0, 0); // reset position to unsnapped position

      systemUnderTest["debug_displayVelocity"](
        systemUnderTest["viewModel"],
        systemUnderTest["scenePresenter"],
        new Vector3(1, 2, 3)
      );

      expect(loggerMock).toHaveBeenCalledTimes(1);
    });
  });
});
