import {
  AbstractMesh,
  MeshBuilder,
  NullEngine,
  Scene,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import { mock, mockDeep } from "jest-mock-extended";
import { config } from "../../../../../config";
import { logger } from "../../../../../Lib/Logger";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import AvatarView from "../../../../Core/Presentation/Babylon/Avatar/AvatarView";
import AvatarViewModel from "../../../../Core/Presentation/Babylon/Avatar/AvatarViewModel";
import IAvatarController from "../../../../Core/Presentation/Babylon/Avatar/IAvatarController";
import INavigation from "../../../../Core/Presentation/Babylon/Navigation/INavigation";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";

jest.mock("../../../../../Lib/Logger");

// setup navigation mock
const navigationMock = mock<INavigation>();

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

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
  });

  afterAll(() => {
    jest.restoreAllMocks();
    CoreDIContainer.restore();
  });

  test("async setup calls the scenePresenter to load avatar models", async () => {
    navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
    navigationMock.isReady = Promise.resolve();

    scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
      new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
    );
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    systemUnderTest = createAvatarView();

    await systemUnderTest.isReady.then(() => {
      expect(scenePresenterMock.loadModel).toHaveBeenCalledTimes(1);
    });
  });

  test("async setup gets the parent node for the avatar", async () => {
    navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
    navigationMock.isReady = Promise.resolve();

    scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
      new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
    );
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    systemUnderTest = createAvatarView();

    await systemUnderTest.isReady.then(() => {
      expect(
        scenePresenterMock.Scene.getTransformNodeByName
      ).toHaveBeenCalledWith("AvatarParentNode");
    });
  });

  test("async setup sets the parent node as parent of the first loaded mesh", async () => {
    navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
    navigationMock.isReady = Promise.resolve();

    scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
      new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
    );
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    systemUnderTest = createAvatarView();

    await systemUnderTest.isReady.then(() => {
      expect(
        systemUnderTest["viewModel"].meshes.Value[0].parent as TransformNode
      ).toBe(systemUnderTest["viewModel"].parentNode.Value);
    });
  });

  test("async setup calls addAgent with the navigation crowd", async () => {
    navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
    navigationMock.isReady = Promise.resolve();

    scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
      new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
    );
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    systemUnderTest = createAvatarView();

    await systemUnderTest.isReady.then(() => {
      expect(systemUnderTest["viewModel"].agentIndex).toBe(42);
    });
  });

  test("async setup doesn't calls addAgent with the navigation crowd until navigation is ready", async () => {
    navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
    scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
      new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
    );
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    systemUnderTest = createAvatarView();

    expect(systemUnderTest["viewModel"].agentIndex).toBeUndefined();

    navigationMock.isReady = Promise.resolve();

    await systemUnderTest.isReady.then(() => {
      expect(systemUnderTest["viewModel"].agentIndex).toBe(42);
    });
  });

  test("moveAvatar gets new position and velocity from navigation crowd", async () => {
    config.isDebug = false;

    navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
    navigationMock.isReady = Promise.resolve();

    scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
      new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
    );
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    navigationMock.Crowd.getAgentPosition = jest
      .fn()
      .mockReturnValue(new Vector3(0, 0, 0));
    navigationMock.Crowd.getAgentVelocity = jest
      .fn()
      .mockReturnValue(new Vector3(0, 0, 0));

    systemUnderTest = createAvatarView();

    await systemUnderTest.isReady.then(() => {
      systemUnderTest["moveAvatar"]();

      expect(navigationMock.Crowd.getAgentPosition).toBeCalledWith(42);
      expect(navigationMock.Crowd.getAgentVelocity).toBeCalledWith(42);
    });
  });

  test("async setup doesn't calls addAgent with the navigation crowd until navigation is ready", async () => {
    navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
    scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
      new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
    );
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    systemUnderTest = createAvatarView();

    expect(systemUnderTest["viewModel"].agentIndex).toBeUndefined();

    navigationMock.isReady = Promise.resolve();

    await systemUnderTest.isReady.then(() => {
      expect(systemUnderTest["viewModel"].agentIndex).toBe(42);
    });
  });

  test("moveAvatar sets new avatar rotation", async () => {
    config.isDebug = false;

    navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
    navigationMock.isReady = Promise.resolve();

    scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
      new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
    );
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    navigationMock.Crowd.getAgentPosition = jest
      .fn()
      .mockReturnValue(new Vector3(1, 2, 3));
    navigationMock.Crowd.getAgentVelocity = jest
      .fn()
      .mockReturnValue(new Vector3(1, 2, 3));

    systemUnderTest = createAvatarView();

    await systemUnderTest.isReady.then(() => {
      const oldRotation =
        systemUnderTest["viewModel"].meshes.Value[0].rotationQuaternion;

      systemUnderTest["moveAvatar"]();

      expect(
        systemUnderTest["viewModel"].meshes.Value[0].rotationQuaternion
      ).not.toBe(oldRotation);
    });
  });

  test("debug_displayVelocity calls MeshBuilder.CreateDashedLines", async () => {
    navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
    navigationMock.isReady = Promise.resolve();

    scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
      new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
    );
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    navigationMock.Crowd.getAgentPosition = jest
      .fn()
      .mockReturnValue(new Vector3(1, 2, 3));
    navigationMock.Crowd.getAgentVelocity = jest
      .fn()
      .mockReturnValue(new Vector3(1, 2, 3));

    MeshBuilder.CreateDashedLines = jest.fn();

    systemUnderTest = createAvatarView();

    await systemUnderTest.isReady.then(() => {
      systemUnderTest["debug_displayVelocity"](
        systemUnderTest["viewModel"],
        systemUnderTest["scenePresenter"],
        new Vector3(1, 2, 3),
        0
      );

      expect(MeshBuilder.CreateDashedLines).toHaveBeenCalledTimes(1);
    });
  });

  test("debug_displayVelocity calls logger.log", async () => {
    navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
    navigationMock.isReady = Promise.resolve();

    scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
      new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
    );
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    navigationMock.Crowd.getAgentPosition = jest
      .fn()
      .mockReturnValue(new Vector3(1, 2, 3));
    navigationMock.Crowd.getAgentVelocity = jest
      .fn()
      .mockReturnValue(new Vector3(1, 2, 3));

    MeshBuilder.CreateDashedLines = jest.fn();

    systemUnderTest = createAvatarView();

    await systemUnderTest.isReady.then(() => {
      systemUnderTest["debug_displayVelocity"](
        systemUnderTest["viewModel"],
        systemUnderTest["scenePresenter"],
        new Vector3(1, 2, 3),
        0
      );

      expect(logger.log).toHaveBeenCalledTimes(1);
    });
  });
});
