import {
  AbstractMesh,
  NullEngine,
  Scene,
  TransformNode,
} from "@babylonjs/core";
import { waitFor } from "@testing-library/react";
import { mock, mockDeep } from "jest-mock-extended";
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

// setup scene presenter mock
const scene = new Scene(new NullEngine());
scene.getTransformNodeByName = jest
  .fn()
  .mockReturnValue(new TransformNode("AvatarParentNode", scene));
const scenePresenterMock = mockDeep<IScenePresenter>();

const scenePresenterFactoryMock = () => scenePresenterMock;

// setup return values for mocked dependencies
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
    // set return value before each test to prevent resetting between tests
    scenePresenterMock.loadModel.mockResolvedValue(loadModelMockReturnValue);

    // reset navigation ready event
    navigationMock.onNavigationReadyObservable = new SimpleEvent();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("constructor calls the scenePresenter to load avatar models", async () => {
    systemUnderTest = createAvatarView();

    waitFor(() => {
      expect(systemUnderTest["viewModel"].meshes.Value).toHaveLength(1);
    });
  });

  test("constructor registeres callback for navigation setup", () => {
    systemUnderTest = createAvatarView();

    expect(
      navigationMock.onNavigationReadyObservable["subscribers"]
    ).toHaveLength(1);
  });

  test("setupAvatarNavigation is called when the event in the navigation is fired", async () => {
    navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);

    systemUnderTest = createAvatarView();
    navigationMock.onNavigationReadyObservable.notifySubscribers();

    waitFor(() => {
      expect(systemUnderTest["viewModel"].agentIndex).toBe(42);
      expect(
        navigationMock.onNavigationReadyObservable["subscribers"]
      ).toHaveLength(0);
    });
  });

  test.skip("moveAvatar gets new position and velocity from navigation crowd", async () => {
    navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
    navigationMock.onNavigationReadyObservable.notifySubscribers();
    systemUnderTest = createAvatarView();

    navigationMock.Crowd.getAgentPosition = jest
      .fn()
      .mockReturnValue([1, 2, 3]);
    navigationMock.Crowd.getAgentVelocity = jest
      .fn()
      .mockReturnValue([4, 5, 6]);

    systemUnderTest["moveAvatar"]();

    expect(navigationMock.Crowd.getAgentPosition).toBeCalledWith(42);
    expect(navigationMock.Crowd.getAgentVelocity).toBeCalledWith(42);
  });
});
