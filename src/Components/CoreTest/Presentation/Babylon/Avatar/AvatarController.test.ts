import {
  EventState,
  ICrowd,
  IMouseEvent,
  KeyboardEventTypes,
  KeyboardInfo,
  MeshBuilder,
  PickingInfo,
  PointerEventTypes,
  PointerInfo,
  RecastJSPlugin,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import mock, { mockDeep } from "jest-mock-extended/lib/Mock";
import { config } from "../../../../../config";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import AvatarController from "../../../../Core/Presentation/Babylon/Avatar/AvatarController";
import AvatarViewModel from "../../../../Core/Presentation/Babylon/Avatar/AvatarViewModel";
import INavigation from "../../../../Core/Presentation/Babylon/Navigation/INavigation";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import ILearningSpacePresenter from "../../../../Core/Presentation/Babylon/LearningSpaces/ILearningSpacePresenter";
import exp from "constants";

jest.mock("@babylonjs/core/Meshes");
jest.mock("@babylonjs/core/Materials");

const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

const recastJSPluginMock = mock<RecastJSPlugin>();
const crowdMock = mock<ICrowd>();
const navigationMock = mock<INavigation>();
// apply mocks to the readonly properties (getters)
Object.defineProperty(navigationMock, "Plugin", { value: recastJSPluginMock });
Object.defineProperty(navigationMock, "Crowd", { value: crowdMock });

// creates a new PointerInfo object with given paramters for use in testing
function setupMockedPointerInfo(
  type: number = PointerEventTypes.POINTERTAP,
  isPickInfoNull: boolean = false,
  pickedPoint: Vector3 | null = new Vector3(42, 42, 42)
): PointerInfo {
  const mouseEventMock = mock<IMouseEvent>();

  let pickInfoMock: PickingInfo | null;
  if (!isPickInfoNull) {
    pickInfoMock = mock<PickingInfo>();
    pickInfoMock.pickedPoint = pickedPoint;
  } else pickInfoMock = null;

  //@ts-ignore
  const pointerInfo: PointerInfo = {
    type: type,
    event: mouseEventMock,
    pickInfo: pickInfoMock,
  };

  return pointerInfo;
}

describe("AvatarController", () => {
  let systemUnderTest: AvatarController;
  let viewModel: AvatarViewModel;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock
    );
    CoreDIContainer.rebind<INavigation>(CORE_TYPES.INavigation).toConstantValue(
      navigationMock
    );
  });

  beforeEach(() => {
    viewModel = new AvatarViewModel();
    viewModel.agentIndex = 0;

    systemUnderTest = new AvatarController(viewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  describe("callbacks", () => {
    test("observer callback is added to onPointerObservable in the constructor", () => {
      expect(
        scenePresenterMock.Scene.onPointerObservable.add
      ).toHaveBeenCalledWith(systemUnderTest["processPointerEvent"]);
    });

    test.skip("observer callback is added to onKeyboardObservable in the constructor", () => {
      expect(
        scenePresenterMock.Scene.onKeyboardObservable.add
      ).toHaveBeenCalledWith(systemUnderTest["processKeyboardEvent"]);
    });

    test("observer callback is added to onBeforeRenderObservable in the constructor", () => {
      expect(
        scenePresenterMock.Scene.onBeforeRenderObservable.add
      ).toHaveBeenCalledWith(systemUnderTest["applyInputs"]);
    });
  });

  describe("position broadcast", () => {
    test("broadcastNewAvatarPosition broadcasts the new avatar position if no lastFramePosition is set", () => {
      viewModel.parentNode = new TransformNode("mockParentNode");
      viewModel.parentNode.position = new Vector3(42, 42, 42);
      systemUnderTest["lastFramePosition"] = null;
      const mockLearningSpacePresenter = mockDeep<ILearningSpacePresenter>();
      systemUnderTest["learningSpacePresenter"] = mockLearningSpacePresenter;

      systemUnderTest["broadcastNewAvatarPosition"]();

      expect(
        mockLearningSpacePresenter.broadcastAvatarPosition
      ).toHaveBeenCalledTimes(1);
      expect(
        mockLearningSpacePresenter.broadcastAvatarPosition
      ).toHaveBeenCalledWith(new Vector3(42, 42, 42), expect.any(Number));
    });

    test("broadcastNewAvatarPosition broadcasts the new avatar position if the distance between lastFramePosition and current position is greater than the broadcastThreshold", () => {
      viewModel.parentNode = new TransformNode("mockParentNode");
      viewModel.parentNode.position = new Vector3(42, 42, 42);
      systemUnderTest["lastFramePosition"] = new Vector3(0, 0, 0);
      const mockLearningSpacePresenter = mockDeep<ILearningSpacePresenter>();
      systemUnderTest["learningSpacePresenter"] = mockLearningSpacePresenter;

      systemUnderTest["broadcastNewAvatarPosition"]();

      expect(
        mockLearningSpacePresenter.broadcastAvatarPosition
      ).toHaveBeenCalledTimes(1);
      expect(
        mockLearningSpacePresenter.broadcastAvatarPosition
      ).toHaveBeenCalledWith(new Vector3(42, 42, 42), expect.any(Number));
    });
  });

  describe("input handling", () => {
    test(
      "applyInputs applies the pointerMovementTarget to the avatar " +
        "when keyMovementTarget is zero and pointerMovementTarget is non-zero",
      () => {
        const target = new Vector3(42, 42, 42);
        viewModel.movementTarget.Value = null;
        systemUnderTest["keyMovementTarget"] = null;
        systemUnderTest["pointerMovementTarget"] = target;
        viewModel.parentNode = new TransformNode("parentNode");
        viewModel.parentNode.position = new Vector3(1, 1, 1);

        systemUnderTest["applyInputs"]();

        expect(crowdMock.agentGoto).toHaveBeenCalledTimes(1);
        expect(crowdMock.agentGoto).toHaveBeenCalledWith(
          viewModel.agentIndex,
          target
        );
      }
    );

    test("applyInputs does not apply the pointerMovementTarget to the avatar when the movement distance is below the movementThreshold", () => {
      systemUnderTest["pointerMovementTarget"] = new Vector3(42, 42, 42);
      viewModel.parentNode = new TransformNode("parentNode");
      viewModel.parentNode.position = new Vector3(42, 42, 42);

      systemUnderTest["applyInputs"]();

      expect(crowdMock.agentGoto).toHaveBeenCalledTimes(0);
    });

    test(
      "applyInputs applies the keyMovementTarget to the avatar " +
        "when keyMovementTarget is non-zero",
      () => {
        const target = new Vector3(41, 41, 41);
        systemUnderTest["pointerMovementTarget"] = null;
        systemUnderTest["keyMovementTarget"] = target;
        viewModel.parentNode = new TransformNode("parentNode");
        viewModel.parentNode.position = new Vector3(1, 1, 1);

        systemUnderTest["applyInputs"]();

        expect(crowdMock.agentGoto).toHaveBeenCalledTimes(1);
        expect(crowdMock.agentGoto).toHaveBeenCalledWith(
          viewModel.agentIndex,
          target
        );
      }
    );

    test("applyInputs resets keyMovementTarget and pointerMovementTarget to null", () => {
      systemUnderTest["keyMovementTarget"] = new Vector3(41, 41, 41);
      systemUnderTest["pointerMovementTarget"] = new Vector3(42, 42, 42);
      viewModel.parentNode = new TransformNode("parentNode");
      viewModel.parentNode.position = new Vector3(1, 1, 1);

      systemUnderTest["applyInputs"]();

      expect(systemUnderTest["keyMovementTarget"]).toBeNull();
      expect(systemUnderTest["pointerMovementTarget"]).toBeNull();
    });

    test("processKeyboardEvent returns if the keyboard event type isn't KEYDOWN", () => {
      const keyboardInfoMock = mock<KeyboardInfo>();
      keyboardInfoMock.type = KeyboardEventTypes.KEYUP;
      const eventStateMock = mock<EventState>();
      systemUnderTest["keyMovementTarget"] = Vector3.Zero();

      systemUnderTest["processKeyboardEvent"](keyboardInfoMock, eventStateMock);

      expect(systemUnderTest["keyMovementTarget"].x).toBe(0);
      expect(systemUnderTest["keyMovementTarget"].y).toBe(0);
      expect(systemUnderTest["keyMovementTarget"].z).toBe(0);
    });

    test("processKeyboardEvent returns if the keyboard event key isn't a valid key", () => {
      const keyboardInfoMock = mock<KeyboardInfo>();
      keyboardInfoMock.type = KeyboardEventTypes.KEYDOWN;
      keyboardInfoMock.event.key = "z";
      const eventStateMock = mock<EventState>();
      systemUnderTest["keyMovementTarget"] = Vector3.Zero();

      systemUnderTest["processKeyboardEvent"](keyboardInfoMock, eventStateMock);

      expect(systemUnderTest["keyMovementTarget"].x).toBe(0);
      expect(systemUnderTest["keyMovementTarget"].y).toBe(0);
      expect(systemUnderTest["keyMovementTarget"].z).toBe(0);
    });

    // TODO: fix test with correct camera setup on the parentNode
    test.skip("processKeyboardEvent sets the keyMovementTarget in the viewModel", () => {
      const keyboardInfoMock = mock<KeyboardInfo>();
      keyboardInfoMock.type = KeyboardEventTypes.KEYDOWN;
      keyboardInfoMock.event.key = "w";
      const eventStateMock = mock<EventState>();
      systemUnderTest["keyMovementTarget"] = Vector3.Zero();
      viewModel.parentNode = new TransformNode("mockParentNode");
      // viewModel.parentNode.Value

      systemUnderTest["processKeyboardEvent"](keyboardInfoMock, eventStateMock);

      expect(systemUnderTest["keyMovementTarget"].x).toBe(0);
      expect(systemUnderTest["keyMovementTarget"].y).toBe(0);
      expect(systemUnderTest["keyMovementTarget"].z).toBe(1);
      expect(recastJSPluginMock.getClosestPoint).toHaveBeenCalledTimes(1);
      expect(recastJSPluginMock.getClosestPoint).toHaveBeenCalledWith(
        new Vector3(42, 42, 42)
      );
    });

    test.each([
      ["w", Vector3.Up()],
      ["a", Vector3.Left()],
      ["s", Vector3.Down()],
      ["d", Vector3.Right()],
      ["x", Vector3.Zero()],
    ])(
      'getReferenceAxisByKey returns the correct axis for key "%s"',
      (key, expected) => {
        const result = systemUnderTest["getReferenceAxisByKey"](key);

        expect(result.x).toEqual(expected.x);
        expect(result.y).toEqual(expected.y);
        expect(result.z).toEqual(expected.z);
      }
    );

    test("processPointerEvent returns when pointer event type isn't POINTERTAP", () => {
      let invalidPointerInfo = setupMockedPointerInfo(
        PointerEventTypes.POINTERMOVE,
        false,
        new Vector3(0, 0, 0)
      );

      systemUnderTest["processPointerEvent"](invalidPointerInfo);

      expect(recastJSPluginMock.getClosestPoint).not.toHaveBeenCalled();
      expect(crowdMock.agentGoto).not.toHaveBeenCalled();
    });

    test("processPointerEvent returns when pickInfo is null", () => {
      let invalidPointerInfo = setupMockedPointerInfo(
        PointerEventTypes.POINTERTAP,
        true,
        new Vector3(0, 0, 0)
      );

      systemUnderTest["processPointerEvent"](invalidPointerInfo);

      expect(recastJSPluginMock.getClosestPoint).not.toHaveBeenCalled();
      expect(crowdMock.agentGoto).not.toHaveBeenCalled();
    });

    test("processPointerEvent returns when pickInfo.pickedPoint is null", () => {
      let invalidPointerInfo = setupMockedPointerInfo(
        PointerEventTypes.POINTERTAP,
        false,
        null
      );

      systemUnderTest["processPointerEvent"](invalidPointerInfo);

      expect(recastJSPluginMock.getClosestPoint).not.toHaveBeenCalled();
      expect(crowdMock.agentGoto).not.toHaveBeenCalled();
    });

    test("processPointerEvent sets the pointerMovementTarget in the viewModel", () => {
      // prevent execution of debug code
      config.isDebug = false;

      const pointerInfo = setupMockedPointerInfo(
        PointerEventTypes.POINTERTAP,
        false,
        new Vector3(42, 42, 42)
      );
      recastJSPluginMock.getClosestPoint.mockReturnValueOnce(
        new Vector3(42, 42, 42)
      );

      systemUnderTest["processPointerEvent"](pointerInfo);

      expect(systemUnderTest["pointerMovementTarget"]).not.toBeNull();
      expect(systemUnderTest["pointerMovementTarget"]!.x).toBe(42);
      expect(systemUnderTest["pointerMovementTarget"]!.y).toBe(42);
      expect(systemUnderTest["pointerMovementTarget"]!.z).toBe(42);
      expect(recastJSPluginMock.getClosestPoint).toHaveBeenCalledTimes(1);
      expect(recastJSPluginMock.getClosestPoint).toHaveBeenCalledWith(
        new Vector3(42, 0, 42)
      );
      //might need to add the last 2 expects to process keyboard event too.
    });
  });

  describe("debug code", () => {
    test("debug_drawPath returns when config.isDebug is set false", () => {
      config.isDebug = false;

      systemUnderTest["debug_drawPath"](new Vector3(1, 2, 3));

      expect(recastJSPluginMock.computePath).toHaveBeenCalledTimes(0);
    });

    test("debug_drawPath computes a path and draws it when config.isDebug is set true", () => {
      config.isDebug = true;

      systemUnderTest["debug_drawPath"](new Vector3(1, 2, 3));

      expect(recastJSPluginMock.computePath).toHaveBeenCalledTimes(1);
      expect(MeshBuilder.CreateDashedLines).toHaveBeenCalledTimes(1);
    });
  });
});
