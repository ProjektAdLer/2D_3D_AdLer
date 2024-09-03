import { mock, mockDeep } from "jest-mock-extended";
import Navigation from "../../../../Core/Presentation/Babylon/Navigation/Navigation";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import {
  AnimationGroup,
  EventState,
  NullEngine,
  Observer,
  Scene,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import CharacterAnimator from "../../../../Core/Presentation/Babylon/CharacterAnimator/CharacterAnimator";
import CharacterAnimationActions from "../../../../Core/Presentation/Babylon/CharacterAnimator/CharacterAnimationActions";
import StateMachine from "../../../../Core/Presentation/Utils/StateMachine/StateMachine";
import CharacterAnimationStates from "../../../../Core/Presentation/Babylon/CharacterAnimator/CharacterAnimationStates";

const navigationMock = mock<Navigation>();

const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

const mockIdleAnimation = mockDeep<AnimationGroup>();
const mockWalkAnimation = mockDeep<AnimationGroup>();
const mockInteractionAnimation = mockDeep<AnimationGroup>();

describe("CharacterAnimator", () => {
  let systemUnderTest: CharacterAnimator;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<Navigation>(CORE_TYPES.INavigation).toConstantValue(
      navigationMock
    );
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new CharacterAnimator();
    systemUnderTest.setup(
      () => new Vector3(1, 0, 0),
      new TransformNode("mockRotationNode", new Scene(new NullEngine())),
      mockIdleAnimation,
      mockWalkAnimation,
      mockInteractionAnimation
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("CurrentAnimationState returns current state from state machine", () => {
    systemUnderTest["stateMachine"]["currentState"] =
      CharacterAnimationStates.Walking;

    expect(systemUnderTest.CurrentAnimationState).toEqual(
      CharacterAnimationStates.Walking
    );
  });

  // ANF-ID: [EZZ0018]
  test("transition applies given action to state machine", () => {
    const applyActionMock = jest.spyOn(StateMachine.prototype, "applyAction");

    systemUnderTest.transition(CharacterAnimationActions.MovementStarted);

    expect(applyActionMock).toHaveBeenCalledTimes(1);
    expect(applyActionMock).toHaveBeenCalledWith(
      CharacterAnimationActions.MovementStarted
    );

    applyActionMock.mockRestore();
  });

  // ANF-ID: [EZZ0018]
  test("setup sets idle animation weight to 1 and plays animation", () => {
    expect(mockIdleAnimation.play).toHaveBeenCalledTimes(1);
    expect(mockIdleAnimation.setWeightForAllAnimatables).toHaveBeenCalledTimes(
      1
    );
    expect(mockIdleAnimation.setWeightForAllAnimatables).toHaveBeenCalledWith(
      1
    );
  });

  // ANF-ID: [EZZ0018]
  test("setup sets walk animation weight to 0 and plays animation", () => {
    expect(mockWalkAnimation.play).toHaveBeenCalledTimes(1);
    expect(mockWalkAnimation.setWeightForAllAnimatables).toHaveBeenCalledTimes(
      1
    );
    expect(mockWalkAnimation.setWeightForAllAnimatables).toHaveBeenCalledWith(
      0
    );
  });

  // ANF-ID: [EZZ0018]
  test("rotateCharacter rotates character according to its velocity", () => {
    systemUnderTest["rotateCharacter"](1);

    expect(systemUnderTest["characterRotationNode"].rotationQuaternion)
      .toMatchInlineSnapshot(`
      Quaternion {
        "_isDirty": true,
        "_w": 0.7071067811865476,
        "_x": 0,
        "_y": 0.7071067811865475,
        "_z": 0,
      }
    `);
  });

  test("walkingStateOnBeforeRenderCallback does nothing if current state isn't Walking", () => {
    systemUnderTest["stateMachine"]["currentState"] =
      CharacterAnimationStates.Idle;
    const mockGetCharacterVelocity = jest.fn();
    systemUnderTest["getCharacterVelocity"] = mockGetCharacterVelocity;

    systemUnderTest["walkingStateOnBeforeRenderCallback"]();

    expect(mockGetCharacterVelocity).not.toHaveBeenCalled();
  });

  test("walkingStateOnBeforeRenderCallback calls setWalkingAnimationSpeed and rotateCharacter if current state is Walking", () => {
    systemUnderTest["stateMachine"]["currentState"] =
      CharacterAnimationStates.Walking;
    const mockFunction = jest.fn();
    systemUnderTest["rotateCharacter"] = mockFunction;
    systemUnderTest["setWalkingAnimationSpeed"] = mockFunction;

    systemUnderTest["walkingStateOnBeforeRenderCallback"]();

    expect(mockFunction).toHaveBeenCalledTimes(2);
  });

  test("onBeforeAnimationTransitionObserver removes the given observer from the onBeforeAniamtionObservable of the scene when the transition is done", () => {
    const fromAnimation = mock<AnimationGroup>();
    const toAnimation = mock<AnimationGroup>();
    const blendValueObject = { value: 0 };

    const observerMock = mock<Observer<Scene>>();
    systemUnderTest["transitionObserverRef"] = observerMock;

    systemUnderTest["onBeforeAnimationTransitionObserver"](
      fromAnimation,
      toAnimation,
      blendValueObject,
      () => 1 // transition is done within the first call
    );

    expect(
      scenePresenterMock.Scene.onBeforeAnimationsObservable.remove
    ).toHaveBeenCalledTimes(1);
    expect(systemUnderTest["transitionObserverRef"]).toBeNull();
  });

  // ANF-ID: [EZZ0018]
  test("onBeforeAnimationTransitionObserver sets from animation weight to 0 and to animation weigth to 1 when transition is done", () => {
    const fromAnimation = mock<AnimationGroup>();
    const toAnimation = mock<AnimationGroup>();
    const blendValueObject = { value: 0 };

    systemUnderTest["onBeforeAnimationTransitionObserver"](
      fromAnimation,
      toAnimation,
      blendValueObject,
      () => 1 // transition is done within the first call
    );

    expect(fromAnimation.setWeightForAllAnimatables).toHaveBeenCalledTimes(1);
    expect(fromAnimation.setWeightForAllAnimatables).toHaveBeenCalledWith(0);
    expect(toAnimation.setWeightForAllAnimatables).toHaveBeenCalledTimes(1);
    expect(toAnimation.setWeightForAllAnimatables).toHaveBeenCalledWith(1);
  });

  // ANF-ID: [EZZ0018]
  test("onBeforeAnimationTransitionObserver sets from animation weight to 1-increment and to animation weigth to increment for one step of the transition", () => {
    const fromAnimation = mock<AnimationGroup>();
    const toAnimation = mock<AnimationGroup>();
    const blendValueObject = { value: 0 };

    systemUnderTest["onBeforeAnimationTransitionObserver"](
      fromAnimation,
      toAnimation,
      blendValueObject,
      () => 0.1
    );

    expect(fromAnimation.setWeightForAllAnimatables).toHaveBeenCalledTimes(1);
    expect(fromAnimation.setWeightForAllAnimatables).toHaveBeenCalledWith(0.9);
    expect(toAnimation.setWeightForAllAnimatables).toHaveBeenCalledTimes(1);
    expect(toAnimation.setWeightForAllAnimatables).toHaveBeenCalledWith(0.1);
  });

  test("anonymous callback function on onBeforeAnimationsObservable in transitionFromIdleToWalk doesn't throw", () => {
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

  test("anonymous callback function on onBeforeAnimationsObservable in transitionFromWalkToIdle doesn't throw", () => {
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

  test("transitionFromAnyToInteract plays the interactionAnimation", () => {
    systemUnderTest["transitionFromAnyToInteract"](mockIdleAnimation);

    expect(mockInteractionAnimation.play).toHaveBeenCalledTimes(1);
  });

  test("anonymous observer function on onBeforeAnimationsObservable in transitionFromIdleOrWalkToInteract doesn't throw", () => {
    // setup mock implementation to get a reference to the anonymous callback function
    let anonymousCallback: (eventData: Scene, eventState: EventState) => void;
    scenePresenterMock.Scene.onBeforeAnimationsObservable.add.mockImplementation(
      (callback) => {
        anonymousCallback = callback;
        return mock<Observer<Scene>>();
      }
    );

    systemUnderTest["transitionFromAnyToInteract"](mockIdleAnimation);

    expect(() =>
      anonymousCallback!(mock<Scene>(), mock<EventState>())
    ).not.toThrow();
  });

  test("transitionFromInteractToAny plays given animation", () => {
    // reset to exclude calls inside setup code
    mockIdleAnimation.play.mockReset();
    mockIdleAnimation.setWeightForAllAnimatables.mockReset();

    systemUnderTest["transitionFromInteractToAny"](mockIdleAnimation);

    expect(mockIdleAnimation.play).toHaveBeenCalledTimes(1);
    expect(mockIdleAnimation.play).toHaveBeenCalledWith(true);
    expect(mockIdleAnimation.setWeightForAllAnimatables).toHaveBeenCalledTimes(
      1
    );
    expect(mockIdleAnimation.setWeightForAllAnimatables).toHaveBeenCalledWith(
      1
    );
  });

  // ANF-ID: [EZZ0018]
  test("setWalkingAnimationSpeed sets the speedRatio of the walk animation to given absolue velocity", () => {
    systemUnderTest["stateMachine"]["currentState"] =
      CharacterAnimationStates.Walking;
    mockWalkAnimation.speedRatio = 0;

    systemUnderTest["setWalkingAnimationSpeed"](1);

    expect(mockWalkAnimation.speedRatio).toEqual(1);
  });

  // ANF-ID: [EZZ0018]
  test("setWalkingAnimationSpeed doesn't set the speedRation to less than 0.1", () => {
    systemUnderTest["stateMachine"]["currentState"] =
      CharacterAnimationStates.Walking;
    mockWalkAnimation.speedRatio = 0;

    systemUnderTest["setWalkingAnimationSpeed"](0.02);

    expect(mockWalkAnimation.speedRatio).toEqual(0.1);
  });
});
