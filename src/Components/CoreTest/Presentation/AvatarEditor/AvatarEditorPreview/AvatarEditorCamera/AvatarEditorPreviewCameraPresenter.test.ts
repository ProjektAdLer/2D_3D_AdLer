import {
  ArcRotateCamera,
  Camera,
  NullEngine,
  Scene,
  Vector3,
} from "@babylonjs/core";
import Observable from "../../../../../../Lib/Observable";
import AvatarEditorPreviewCameraPresenter from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewCamera/AvatarEditorPreviewCameraPresenter";
import AvatarEditorPreviewCameraViewModel from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewCamera/AvatarEditorPreviewCameraViewModel";
import { mock, mockDeep } from "jest-mock-extended";
import IScenePresenter from "../../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import ScenePresenter from "../../../../../Core/Presentation/Babylon/SceneManagement/ScenePresenter";

const scenePresenterMock = mockDeep<ScenePresenter>();
//const scenePresenterFactoryMock = () => scenePresenterMock;

describe("AvatarEditorPreviewCameraPresenter", () => {
  let systemUnderTest: AvatarEditorPreviewCameraPresenter;
  let viewModel: AvatarEditorPreviewCameraViewModel;

  beforeEach(() => {
    viewModel = new AvatarEditorPreviewCameraViewModel();
    systemUnderTest = new AvatarEditorPreviewCameraPresenter(viewModel);
  });

  test("zoomInOnFace calls adds method to onBeforeAnimationObservable of scene", () => {
    // @ts-ignore
    scenePresenterMock.Scene = mockDeep<Scene>();
    const vm = new AvatarEditorPreviewCameraViewModel();
    vm.camera = new Observable<ArcRotateCamera>();
    vm.camera.Value = new ArcRotateCamera(
      "camera",
      1,
      1,
      3,
      new Vector3(0, 0, 0),
      new Scene(new NullEngine()),
    );
    systemUnderTest = new AvatarEditorPreviewCameraPresenter(vm);
    systemUnderTest["scenePresenter"] = scenePresenterMock;
    systemUnderTest.zoomInOnFace();

    expect(
      scenePresenterMock.Scene.onBeforeAnimationsObservable.add,
    ).toHaveBeenCalledWith(systemUnderTest["zoomIn"]);
  });

  test("zoomOutOnFace removes callbacks of onBeforeAnimationObservable of scene", () => {
    // @ts-ignore
    scenePresenterMock.Scene = mockDeep<Scene>();
    const vm = new AvatarEditorPreviewCameraViewModel();
    vm.camera = new Observable<ArcRotateCamera>();
    vm.camera.Value = new ArcRotateCamera(
      "camera",
      1,
      1,
      3,
      new Vector3(0, 0, 0),
      new Scene(new NullEngine()),
    );
    systemUnderTest = new AvatarEditorPreviewCameraPresenter(vm);
    systemUnderTest["scenePresenter"] = scenePresenterMock;
    systemUnderTest.zoomOutOnFace();

    expect(
      scenePresenterMock.Scene.onBeforeAnimationsObservable.removeCallback,
    ).toHaveBeenCalledWith(systemUnderTest["zoomIn"]);
    expect(
      scenePresenterMock.Scene.onBeforeAnimationsObservable.removeCallback,
    ).toHaveBeenCalledWith(systemUnderTest["zoomOut"]);
  });

  test("zoomOutOnFace adds callback of onBeforeAnimationObservable of scene", () => {
    // @ts-ignore
    scenePresenterMock.Scene = mockDeep<Scene>();
    const vm = new AvatarEditorPreviewCameraViewModel();
    vm.camera = new Observable<ArcRotateCamera>();
    vm.camera.Value = new ArcRotateCamera(
      "camera",
      1,
      1,
      3,
      new Vector3(0, 0, 0),
      new Scene(new NullEngine()),
    );
    vm.camera.Value.radius = 1;
    systemUnderTest = new AvatarEditorPreviewCameraPresenter(vm);
    systemUnderTest["scenePresenter"] = scenePresenterMock;
    systemUnderTest["finalZoom"] = 1;
    systemUnderTest.zoomOutOnFace();

    expect(
      scenePresenterMock.Scene.onBeforeAnimationsObservable.add,
    ).toHaveBeenCalledWith(systemUnderTest["zoomOut"]);
  });

  test("zoomIn removes itself as callback of onBeforeAnimationObservable", () => {
    // @ts-ignore
    scenePresenterMock.Scene = mockDeep<Scene>();
    const vm = new AvatarEditorPreviewCameraViewModel();
    vm.camera = new Observable<ArcRotateCamera>();
    vm.camera.Value = new ArcRotateCamera(
      "camera",
      1,
      1,
      3,
      new Vector3(0, 0, 0),
      new Scene(new NullEngine()),
    );
    vm.camera.Value.radius = 1;
    vm.camera.Value.alpha = Math.PI / 2;
    systemUnderTest = new AvatarEditorPreviewCameraPresenter(vm);
    systemUnderTest["scenePresenter"] = scenePresenterMock;
    systemUnderTest["zoomIn"]();

    expect(
      scenePresenterMock.Scene.onBeforeAnimationsObservable.removeCallback,
    ).toHaveBeenCalledWith(systemUnderTest["zoomIn"]);
  });

  test("zoomOut removes itself as callback of onBeforeAnimationObservable", () => {
    // @ts-ignore
    scenePresenterMock.Scene = mockDeep<Scene>();
    const vm = new AvatarEditorPreviewCameraViewModel();
    vm.camera = new Observable<ArcRotateCamera>();
    vm.camera.Value = new ArcRotateCamera(
      "camera",
      1,
      1,
      3,
      new Vector3(0, 0, 0),
      new Scene(new NullEngine()),
    );
    vm.camera.Value.radius = 1;
    vm.camera.Value.alpha = Math.PI / 2;
    systemUnderTest = new AvatarEditorPreviewCameraPresenter(vm);
    systemUnderTest["scenePresenter"] = scenePresenterMock;
    systemUnderTest["zoomOut"]();

    expect(
      scenePresenterMock.Scene.onBeforeAnimationsObservable.removeCallback,
    ).toHaveBeenCalledWith(systemUnderTest["zoomOut"]);
  });
});
