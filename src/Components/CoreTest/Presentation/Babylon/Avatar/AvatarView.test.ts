import {
  AbstractMesh,
  Camera,
  CameraInputsManager,
  NullEngine,
  Quaternion,
  Scene,
} from "@babylonjs/core";
import { any, mock, mockDeep } from "jest-mock-extended";
import SimpleEvent from "../../../../../Lib/SimpleEvent";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import AvatarView from "../../../../Core/Presentation/Babylon/Avatar/AvatarView";
import AvatarViewModel from "../../../../Core/Presentation/Babylon/Avatar/AvatarViewModel";
import IAvatarController from "../../../../Core/Presentation/Babylon/Avatar/IAvatarController";
import INavigation from "../../../../Core/Presentation/Babylon/Navigation/INavigation";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";

jest.mock("@babylonjs/core");

// setup navigation mock
const navigationMock = mock<INavigation>();
navigationMock.onNavigationReadyObservable = new SimpleEvent();

// setup scene presenter mock
const scenePresenterMock = mock<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;
const loadModelMockReturnValue = [
  new AbstractMesh("TestMesh", new Scene(new NullEngine())),
];

// util function to create system under test
function createAvatarView(): AvatarView {
  const viewModel = new AvatarViewModel();
  const controller = mock<IAvatarController>();
  const avatarView = new AvatarView(viewModel, controller);
  return avatarView;
}

describe("AvatarView", () => {
  let systemUnderTest: AvatarView;

  beforeAll(() => {
    // setup dependency injection
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(CORE_TYPES.INavigation).toConstantValue(
      navigationMock
    );
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock
    );
  });

  beforeEach(() => {
    scenePresenterMock.loadModel.mockResolvedValue(loadModelMockReturnValue);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("constructor calls the scenePresenter to load avatar models", () => {
    systemUnderTest = createAvatarView();

    let quaternion = new Quaternion(0, 0, 0, 1);

    expect(systemUnderTest["viewModel"].meshes.Value).toHaveLength(1);
    expect(systemUnderTest["viewModel"].meshes.Value[0].name).toBe("TestMesh");
    expect(
      systemUnderTest["viewModel"].meshes.Value[0].rotationQuaternion?.x
    ).toEqual(quaternion.x);
    expect(
      systemUnderTest["viewModel"].meshes.Value[0].rotationQuaternion?.y
    ).toEqual(quaternion.y);
    expect(
      systemUnderTest["viewModel"].meshes.Value[0].rotationQuaternion?.z
    ).toEqual(quaternion.z);
    expect(
      systemUnderTest["viewModel"].meshes.Value[0].rotationQuaternion?.w
    ).toEqual(quaternion.w);
  });

  test.skip("constructor registeres callback for navigation setup", () => {
    systemUnderTest = createAvatarView();

    expect(
      navigationMock.onNavigationReadyObservable["subscribers"]
    ).toHaveLength(1);
  });

  test.skip("setupAvatarNavigation is called when the event in the navigation is fired", () => {
    systemUnderTest = createAvatarView();

    navigationMock.onNavigationReadyObservable.notifySubscribers();
    expect(systemUnderTest["viewModel"].agentIndex).toBe(42);
    expect(
      navigationMock.onNavigationReadyObservable["subscribers"]
    ).toHaveLength(0);
  });
});
