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
navigationMock.Plugin.getClosestPoint = jest
  .fn()
  .mockReturnValue(Vector3.Zero());

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
    systemUnderTest = createAvatarView();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    CoreDIContainer.restore();
  });

  test("async setup calls the scenePresenter to load avatar models", async () => {
    navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
    //@ts-ignore
    navigationMock.IsReady = Promise.resolve();

    scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
      new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
    );
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

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
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    await systemUnderTest.asyncSetup();

    expect(
      scenePresenterMock.Scene.getTransformNodeByName
    ).toHaveBeenCalledWith("AvatarParentNode");
  });

  test("async setup sets the parent node as parent of the first loaded mesh", async () => {
    navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
    //@ts-ignore
    navigationMock.IsReady = Promise.resolve();

    scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
      new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
    );
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    await systemUnderTest.asyncSetup();

    expect(systemUnderTest["viewModel"].meshes[0].parent as TransformNode).toBe(
      systemUnderTest["viewModel"].parentNode
    );
  });

  test("async setup calls addAgent with the navigation crowd", async () => {
    navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
    //@ts-ignore
    navigationMock.IsReady = Promise.resolve();

    scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
      new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
    );
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    await systemUnderTest.asyncSetup();

    expect(systemUnderTest["viewModel"].agentIndex).toBe(42);
  });

  test("async setup doesn't calls addAgent with the navigation crowd until navigation is ready", async () => {
    navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
    scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
      new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
    );
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    expect(systemUnderTest["viewModel"].agentIndex).toBeUndefined();

    //@ts-ignore
    navigationMock.IsReady = Promise.resolve();

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
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

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
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

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
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

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

    expect(systemUnderTest["viewModel"].meshes[0].rotationQuaternion).not.toBe(
      oldRotation
    );
  });

  test("debug_displayVelocity calls MeshBuilder.CreateDashedLines", async () => {
    navigationMock.Crowd.addAgent = jest.fn().mockReturnValue(42);
    //@ts-ignore
    navigationMock.IsReady = Promise.resolve();

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

    await systemUnderTest.asyncSetup();
    systemUnderTest["viewModel"].parentNode.position = new Vector3(0, 0, 0); // reset position to unsnapped position

    systemUnderTest["debug_displayVelocity"](
      systemUnderTest["viewModel"],
      systemUnderTest["scenePresenter"],
      new Vector3(1, 2, 3),
      0
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
    scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(parentNode);
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

    await systemUnderTest.asyncSetup();
    systemUnderTest["viewModel"].parentNode.position = new Vector3(0, 0, 0); // reset position to unsnapped position

    systemUnderTest["debug_displayVelocity"](
      systemUnderTest["viewModel"],
      systemUnderTest["scenePresenter"],
      new Vector3(1, 2, 3),
      0
    );

    expect(logger.log).toHaveBeenCalledTimes(1);
  });
});
