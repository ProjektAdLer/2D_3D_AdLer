import {
  Color3,
  EventState,
  Mesh,
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
jest.mock("@babylonjs/core/Materials");

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

    systemUnderTest = new CharacterNavigator();
    systemUnderTest.setup(
      new TransformNode("mockParentNode", new Scene(new NullEngine())),
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
    navigationMock.Plugin.getClosestPoint.mockReturnValue(expectedTarget);

    systemUnderTest.startMovement(new Vector3(4, 2, 0));

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

  test("startMovement's onReachTargetObservable callback calls given onTargetReachedCallback", () => {
    const onTargetReachedCallback = jest.fn();
    navigationMock.Crowd.onReachTargetObservable.add.mockImplementation(
      (cb) => {
        cb(
          {
            agentIndex: systemUnderTest["agentIndex"],
            destination: Vector3.Zero(),
          },
          mock<EventState>()
        );
        return null;
      }
    );

    systemUnderTest.startMovement(Vector3.Zero(), onTargetReachedCallback);

    expect(onTargetReachedCallback).toHaveBeenCalledTimes(1);
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

  // ANF-ID: [EZZ019]
  test("checkEarlyStopping increases earlyStoppingCounter when velocity is under threshold", () => {
    navigationMock.Crowd.getAgentVelocity.mockReturnValue(
      new Vector3(0.1, 0, 0)
    );
    const sceneMock = mockDeep<Scene>();
    sceneMock.deltaTime = 1;

    systemUnderTest["checkEarlyStopping"](sceneMock);

    expect(systemUnderTest["earlyStoppingCounter"]).toBe(1);
  });

  // ANF-ID: [EZZ019]
  test("checkEarlyStopping resets earlyStoppingCounter when velocity is above threshold", () => {
    navigationMock.Crowd.getAgentVelocity.mockReturnValue(new Vector3(1, 0, 0));
    const sceneMock = mockDeep<Scene>();
    sceneMock.deltaTime = 1;

    systemUnderTest["checkEarlyStopping"](sceneMock);

    expect(systemUnderTest["earlyStoppingCounter"]).toBe(0);
  });

  // ANF-ID: [EZZ019]
  test("checkEarlyStopping calls targetReachedCallback when earlyStoppingPatience is exceeded", () => {
    const sceneMock = mockDeep<Scene>();
    sceneMock.deltaTime = 1;
    navigationMock.Crowd.getAgentVelocity.mockReturnValue(new Vector3(0, 0, 0));

    systemUnderTest["earlyStoppingCounter"] = 500;
    const targetReachedCallback = jest.fn();
    systemUnderTest["targetReachedCallback"] = targetReachedCallback;

    systemUnderTest["checkEarlyStopping"](sceneMock);

    expect(targetReachedCallback).toHaveBeenCalledTimes(1);
  });

  test("debug_drawPath does nothing when verbose is false", () => {
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

  test("debug_drawCircle does nothing when verbose is false", () => {
    systemUnderTest["verbose"] = false;

    systemUnderTest["debug_drawCircle"](1);

    expect(MeshBuilder.CreateTorus).toHaveBeenCalledTimes(0);
  });

  test("debug_drawCircle draws a circle when verbose is set true", () => {
    systemUnderTest["verbose"] = true;
    const mockParentNode = new TransformNode(
      "mockParentNode",
      new Scene(new NullEngine())
    );
    systemUnderTest["parentNode"] = mockParentNode;
    MeshBuilder.CreateTorus = jest
      .fn()
      .mockReturnValue(new Mesh("mockMesh", new Scene(new NullEngine())));

    systemUnderTest["debug_drawCircle"](1);

    expect(MeshBuilder.CreateTorus).toHaveBeenCalledTimes(1);
  });

  test("debug_drawCircle sets a color on the created circle if color is given", () => {
    // arange
    systemUnderTest["verbose"] = true;

    const mockParentNode = new TransformNode(
      "mockParentNode",
      new Scene(new NullEngine())
    );
    systemUnderTest["parentNode"] = mockParentNode;

    const mockCircle = new Mesh("mockMesh", new Scene(new NullEngine()));
    MeshBuilder.CreateTorus = jest.fn().mockReturnValue(mockCircle);

    // act
    expect(mockCircle.material).toBeUndefined();

    systemUnderTest["debug_drawCircle"](1, new Color3(1, 1, 1));

    expect(mockCircle.material).toBeDefined();
  });
});
