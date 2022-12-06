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
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import AvatarController from "../../../../Core/Presentation/Babylon/Avatar/AvatarController";
import AvatarViewModel from "../../../../Core/Presentation/Babylon/Avatar/AvatarViewModel";
import INavigation from "../../../../Core/Presentation/Babylon/Navigation/INavigation";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";

jest.mock("@babylonjs/core");

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
  pickedPoint: Vector3 | null = new Vector3(0, 0, 0)
): PointerInfo {
  const mouseEventMock = mock<IMouseEvent>();

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
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock
    );
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

    const pointerInfo = setupMockedPointerInfo();

    systemUnderTest["processPointerEvent"](pointerInfo);

    expect(recastJSPluginMock.getClosestPoint).toHaveBeenCalledTimes(1);
    expect(crowdMock.agentGoto).toHaveBeenCalledTimes(1);
  });

  test("processPointerEvent computes a path and draws it when config.isDebug is set true", () => {
    config.isDebug = true;

    const pointerInfo = setupMockedPointerInfo();

    systemUnderTest["processPointerEvent"](pointerInfo);

    expect(recastJSPluginMock.computePath).toHaveBeenCalledTimes(1);
    expect(MeshBuilder.CreateDashedLines).toHaveBeenCalledTimes(1);
  });
});
