import {
  ArcRotateCamera,
  NullEngine,
  Scene,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import { mock, mockDeep } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import AvatarCameraController from "../../../../Core/Presentation/Babylon/AvatarCamera/AvatarCameraController";
import AvatarCameraView from "../../../../Core/Presentation/Babylon/AvatarCamera/AvatarCameraView";
import AvatarCameraViewModel from "../../../../Core/Presentation/Babylon/AvatarCamera/AvatarCameraViewModel";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";

jest.mock("@babylonjs/core/Cameras");

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

describe("AvatarCameraView", () => {
  let systemUnderTest: AvatarCameraView;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("constructor calls subscribe on the parentNode observable in the viewModel", () => {
    const viewModel = new AvatarCameraViewModel();
    const subscribeMock = jest.fn();
    viewModel.parentNode.subscribe = subscribeMock;

    systemUnderTest = new AvatarCameraView(
      viewModel,
      mock<AvatarCameraController>
    );

    expect(systemUnderTest).toBeDefined();
    expect(subscribeMock).toHaveBeenCalledTimes(1);
  });

  test("createCamera creates a camera", () => {
    const viewModel = new AvatarCameraViewModel();
    const scene = new Scene(new NullEngine());
    const mockedParentNode = mockDeep<TransformNode>();
    mockedParentNode.position = mockDeep<Vector3>();
    viewModel.parentNode.Value = mockedParentNode;
    //@ts-ignore
    scenePresenterMock.Scene = scene;
    systemUnderTest = new AvatarCameraView(
      viewModel,
      mock<AvatarCameraController>
    );

    systemUnderTest["createCamera"](mockedParentNode);

    expect(viewModel.camera.Value).toBeDefined();
  });

  // ANF-ID: [EZZ0020]
  test("createCamera sets the camera parent to the parentNode", () => {
    const viewModel = new AvatarCameraViewModel();
    const scene = new Scene(new NullEngine());
    const mockedParentNode = mockDeep<TransformNode>();
    mockedParentNode.position = mockDeep<Vector3>();
    viewModel.parentNode.Value = mockedParentNode;
    //@ts-ignore
    scenePresenterMock.Scene = scene;
    systemUnderTest = new AvatarCameraView(
      viewModel,
      mock<AvatarCameraController>
    );

    systemUnderTest["createCamera"](mockedParentNode);

    expect(viewModel.camera.Value?.parent).toBe(mockedParentNode);
  });

  // ANF-ID: [EZZ0020]
  test("createCamera returns without creating a camera when viewModel.parentNode is undefined", () => {
    const viewModel = new AvatarCameraViewModel();
    systemUnderTest = new AvatarCameraView(
      viewModel,
      mock<AvatarCameraController>
    );

    //@ts-ignore
    systemUnderTest["createCamera"](undefined);

    expect(viewModel.camera.Value).not.toBeDefined();
  });
});
