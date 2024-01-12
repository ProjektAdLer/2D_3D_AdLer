import {
  MeshBuilder,
  NullEngine,
  Scene,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import ICharacterAnimator from "../../../../Core/Presentation/Babylon/CharacterAnimator/ICharacterAnimator";
import { mock, mockDeep } from "jest-mock-extended";
import INavigation from "../../../../Core/Presentation/Babylon/Navigation/INavigation";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import CharacterNavigator from "../../../../Core/Presentation/Babylon/CharacterNavigator/CharacterNavigator";
import CharacterAnimationActions from "../../../../Core/Presentation/Babylon/CharacterAnimator/CharacterAnimationActions";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";

jest.mock("@babylonjs/core/Meshes");

const navigationMock = mockDeep<INavigation>();

const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

describe("CharacterNavigator", () => {
  let systemUnderTest: CharacterNavigator;
  let characterAnimatorMock: ICharacterAnimator;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(CORE_TYPES.INavigation).toConstantValue(
      navigationMock
    );
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock
    );
  });

  beforeEach(async () => {
    characterAnimatorMock = mock<ICharacterAnimator>();

    // setup mock navigation so that it can be used in the setupCharacterNavigation method
    navigationMock.Crowd.addAgent.mockReturnValue(42);
    navigationMock.Plugin.getClosestPoint.mockReturnValue(Vector3.Zero());

    systemUnderTest = new CharacterNavigator(
      new TransformNode("mockParentNode", new Scene(new NullEngine())),
      new TransformNode("mockRotationNode", new Scene(new NullEngine())),
      characterAnimatorMock,
      false
    );

    // this is fine, jest doesn't recognize CharacterNavigator is Readyable for some reason
    // @ts-ignore
    await systemUnderTest.IsReady;
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("setupCharacterNavigation calls addAgent with the navigation crowd", () => {
    expect(systemUnderTest["agentIndex"]).toBe(42);
  });

  test("setupCharacterNavigation resolves isReady", () => {
    // @ts-ignore
    expect(systemUnderTest.IsReady).resolves.toBeUndefined();
  });

  test("CharacterVelocity returns the velocity from the navigation crowd", () => {
    const expectedVelocity = new Vector3(1, 2, 3);
    navigationMock.Crowd.getAgentVelocity.mockReturnValue(expectedVelocity);

    expect(systemUnderTest.CharacterVelocity).toBe(expectedVelocity);
  });

  test("startMovement calls agentGoto on the navigation crowd", () => {
    const expectedTarget = new Vector3(1, 2, 3);

    systemUnderTest.startMovement(expectedTarget);

    expect(navigationMock.Crowd.agentGoto).toHaveBeenCalledWith(
      systemUnderTest["agentIndex"],
      expectedTarget
    );
  });

  test("startMovement calls transition on the character animator with MovementStarted", () => {
    systemUnderTest.startMovement(Vector3.Zero());

    expect(characterAnimatorMock.transition).toHaveBeenCalledWith(
      CharacterAnimationActions.MovementStarted
    );
  });

  test("stopMovement calls agentTeleport on the navigation crowd", () => {
    systemUnderTest.stopMovement();

    expect(navigationMock.Crowd.agentTeleport).toHaveBeenCalledWith(
      systemUnderTest["agentIndex"],
      systemUnderTest["parentNode"].position
    );
  });

  test("stopMovement calls transition on the character animator with TargetReached", () => {
    systemUnderTest.stopMovement();

    expect(characterAnimatorMock.transition).toHaveBeenCalledWith(
      CharacterAnimationActions.TargetReached
    );
  });

  // TODO: finish this test
  test.skip("rotateCharacter rotates character according to its velocity", () => {
    const expectedVelocity = new Vector3(1, 0, 1);
    navigationMock.Crowd.getAgentVelocity.mockReturnValue(expectedVelocity);

    systemUnderTest["rotateCharacter"]();

    expect(systemUnderTest["characterRotationNode"].rotationQuaternion).toEqual(
      expectedVelocity.toQuaternion()
    );
  });

  test("debug_drawPath returns verbose is false", () => {
    systemUnderTest["verbose"] = false;

    systemUnderTest["debug_drawPath"](new Vector3(1, 2, 3));

    expect(navigationMock.Plugin.computePath).toHaveBeenCalledTimes(0);
  });

  test("debug_drawPath computes a path and draws it when verbose is set true", () => {
    systemUnderTest["verbose"] = true;

    systemUnderTest["debug_drawPath"](new Vector3(1, 2, 3));

    expect(navigationMock.Plugin.computePath).toHaveBeenCalledTimes(1);
    expect(MeshBuilder.CreateDashedLines).toHaveBeenCalledTimes(1);
  });
});
