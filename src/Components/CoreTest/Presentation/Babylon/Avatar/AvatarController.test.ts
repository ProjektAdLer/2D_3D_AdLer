import {
  ICrowd,
  IMouseEvent,
  IPointerEvent,
  MeshBuilder,
  PickingInfo,
  PointerEventTypes,
  PointerInfo,
  RecastJSPlugin,
  Vector3,
} from "@babylonjs/core";
import mock, { mockDeep } from "jest-mock-extended/lib/Mock";
import { config } from "../../../../../config";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import AvatarController from "../../../../Core/Presentation/Babylon/Avatar/AvatarController";
import AvatarViewModel from "../../../../Core/Presentation/Babylon/Avatar/AvatarViewModel";
import INavigation from "../../../../Core/Presentation/Babylon/Navigation/INavigation";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";

jest.mock("@babylonjs/core");

const scenePresenterMock = mockDeep<IScenePresenter>();

const recastJSPluginMock = mock<RecastJSPlugin>();
const crowdMock = mock<ICrowd>();
const navigationMock = mock<INavigation>();
// apply mocks to the readonly properties (getters)
Object.defineProperty(navigationMock, "Plugin", { value: recastJSPluginMock });
Object.defineProperty(navigationMock, "Crowd", { value: crowdMock });

// creates a new PointerInfo object with given paramters for use in testing
function setupMockedPointerInfo(
  type: number,
  button: number,
  isPickInfoNull: boolean,
  pickedPoint: Vector3 | null
): PointerInfo {
  const mouseEventMock = mock<IMouseEvent>();
  mouseEventMock.button = button;

  let pickInfoMock: PickingInfo | null;
  if (!isPickInfoNull) {
    pickInfoMock = mock<PickingInfo>();
    pickInfoMock.pickedPoint = pickedPoint;
  } else pickInfoMock = null;

  const pointerInfo: PointerInfo = {
    type: type,
    event: mouseEventMock,
    pickInfo: pickInfoMock,
  };

  return pointerInfo;
}

describe("AvatarController", () => {
  let systemUnderTest: AvatarController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IScenePresenter>(
      CORE_TYPES.IScenePresenter
    ).toConstantValue(scenePresenterMock);
    CoreDIContainer.rebind<INavigation>(CORE_TYPES.INavigation).toConstantValue(
      navigationMock
    );
  });

  beforeEach(() => {
    let viewModel = new AvatarViewModel();
    viewModel.agentIndex = 0;

    systemUnderTest = new AvatarController(viewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("observer callback is added to the onPointerObservable in the constructor", () => {
    expect(
      scenePresenterMock.Scene.onPointerObservable.add
    ).toHaveBeenCalledWith(systemUnderTest["processPointerEvent"]);
  });

  test("processPointerEvent returns when pointer event type isn't POINTERDOWN", () => {
    let invalidPointerInfo = setupMockedPointerInfo(
      PointerEventTypes.POINTERMOVE,
      0,
      false,
      new Vector3(0, 0, 0)
    );

    systemUnderTest["processPointerEvent"](invalidPointerInfo);

    expect(recastJSPluginMock.getClosestPoint).not.toHaveBeenCalled();
    expect(crowdMock.agentGoto).not.toHaveBeenCalled();
  });

  test("processPointerEvent returns when pointer event button isnt 2 (right mouse button)", () => {
    let invalidPointerInfo = setupMockedPointerInfo(
      PointerEventTypes.POINTERDOWN,
      1,
      false,
      new Vector3(0, 0, 0)
    );

    systemUnderTest["processPointerEvent"](invalidPointerInfo);

    expect(recastJSPluginMock.getClosestPoint).not.toHaveBeenCalled();
    expect(crowdMock.agentGoto).not.toHaveBeenCalled();
  });

  test("processPointerEvent returns when pickInfo is null", () => {
    let invalidPointerInfo = setupMockedPointerInfo(
      PointerEventTypes.POINTERDOWN,
      2,
      true,
      new Vector3(0, 0, 0)
    );

    systemUnderTest["processPointerEvent"](invalidPointerInfo);

    expect(recastJSPluginMock.getClosestPoint).not.toHaveBeenCalled();
    expect(crowdMock.agentGoto).not.toHaveBeenCalled();
  });

  test("processPointerEvent returns when pickInfo.pickedPoint is null", () => {
    let invalidPointerInfo = setupMockedPointerInfo(
      PointerEventTypes.POINTERDOWN,
      2,
      false,
      null
    );

    systemUnderTest["processPointerEvent"](invalidPointerInfo);

    expect(recastJSPluginMock.getClosestPoint).not.toHaveBeenCalled();
    expect(crowdMock.agentGoto).not.toHaveBeenCalled();
  });

  test("processPointerEvent calls navigation.Crowd.agentGoto", () => {
    // prevent execution of debug code
    config.isDebug = false;

    const pointerInfo = setupMockedPointerInfo(
      PointerEventTypes.POINTERDOWN,
      2,
      false,
      new Vector3(0, 0, 0)
    );

    systemUnderTest["processPointerEvent"](pointerInfo);

    expect(recastJSPluginMock.getClosestPoint).toHaveBeenCalledTimes(1);
    expect(crowdMock.agentGoto).toHaveBeenCalledTimes(1);
  });

  test("processPointerEvent computes a path and draws it when config.isDebug is set true", () => {
    config.isDebug = true;

    const pointerInfo = setupMockedPointerInfo(
      PointerEventTypes.POINTERDOWN,
      2,
      false,
      new Vector3(0, 0, 0)
    );

    systemUnderTest["processPointerEvent"](pointerInfo);

    expect(recastJSPluginMock.computePath).toHaveBeenCalledTimes(1);
    expect(MeshBuilder.CreateDashedLines).toHaveBeenCalledTimes(1);
  });
});
