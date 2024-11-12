import { ArcRotateCamera, NullEngine, Scene, Vector3 } from "@babylonjs/core";
import AvatarEditorPreviewCameraView from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewCamera/AvatarEditorPreviewCameraView";
import AvatarEditorPreviewCameraViewModel from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewCamera/AvatarEditorPreviewCameraViewModel";
import { mockDeep } from "jest-mock-extended";
import IScenePresenter from "../../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import SCENE_TYPES from "../../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

describe("AvatarEditorPreviewCameraView", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock,
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("constructor creates ArcRotateCamera", () => {
    // @ts-ignore
    scenePresenterMock.Scene = new Scene(new NullEngine());

    const viewModel = new AvatarEditorPreviewCameraViewModel();
    new AvatarEditorPreviewCameraView(viewModel);

    expect(viewModel.camera.value).toBeInstanceOf(ArcRotateCamera);
  });

  test("constructor adds updateCameraTarget to onBeforeRenderObservable", () => {
    // @ts-ignore
    scenePresenterMock.Scene = new Scene(new NullEngine());
    const addMock = jest.spyOn(
      scenePresenterMock.Scene.onBeforeRenderObservable,
      "add",
    );

    const viewModel = new AvatarEditorPreviewCameraViewModel();
    const systemUnderTest = new AvatarEditorPreviewCameraView(viewModel);

    expect(addMock).toHaveBeenCalledWith(systemUnderTest["updateCameraTarget"]);

    addMock.mockRestore();
  });

  test("updateCameraTarget updates camera target depending on zoom", () => {
    // @ts-ignore
    scenePresenterMock.Scene = new Scene(new NullEngine());
    const viewModel = new AvatarEditorPreviewCameraViewModel();
    const systemUnderTest = new AvatarEditorPreviewCameraView(viewModel);

    const camera = viewModel.camera.value as ArcRotateCamera;
    camera.lowerRadiusLimit = 0;
    camera.upperRadiusLimit = 10;
    camera.radius = 7;
    // @ts-ignore
    viewModel.zoomedInTarget = new Vector3(0, 0, 0);
    // @ts-ignore
    viewModel.zoomedOutTarget = new Vector3(10, 10, 10);

    systemUnderTest["updateCameraTarget"]();

    expect(camera.target).toEqual(new Vector3(7, 7, 7));
  });
});
