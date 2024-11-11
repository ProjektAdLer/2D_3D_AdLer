import { mock, mockDeep } from "jest-mock-extended";
import AvatarEditorPreviewController from "../../../../Core/Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewController";
import AvatarEditorPreviewViewModel from "../../../../Core/Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewViewModel";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import {
  ArcRotateCamera,
  EventState,
  NullEngine,
  Observer,
  Scene,
  Vector3,
} from "@babylonjs/core";

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

describe("AvatarEditorPreviewController", () => {
  let systemUnderTest: AvatarEditorPreviewController;
  let mockCamera: ArcRotateCamera;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock,
    );
  });

  beforeEach(() => {
    let viewModel = new AvatarEditorPreviewViewModel();
    systemUnderTest = new AvatarEditorPreviewController(viewModel);

    scenePresenterMock.Scene.onBeforeAnimationsObservable.add.mockImplementation(
      (callback) => {
        return new Observer<Scene>(callback!, 0, null);
      },
    );
    mockCamera = new ArcRotateCamera(
      "testCam",
      0,
      0,
      0,
      Vector3.Zero(),
      new Scene(new NullEngine()),
    );
    // @ts-ignore
    scenePresenterMock.Scene.activeCamera = mockCamera;
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("onTurnLeftDown appends observer to onBeforeAnimationsObservable on the scene", () => {
    systemUnderTest.onTurnLeftDown();

    expect(
      scenePresenterMock.Scene.onBeforeAnimationsObservable.add,
    ).toHaveBeenCalledTimes(1);
    expect(systemUnderTest["sceneObserver"]).toBeDefined();
  });

  test("onturnLeftDown observer updates the alpha of the camera", () => {
    systemUnderTest.onTurnLeftDown();
    systemUnderTest["sceneObserver"]!.callback(
      mock<Scene>(),
      mock<EventState>(),
    );

    expect(mockCamera.alpha).toBe(systemUnderTest["viewModel"].alphaStep);
  });

  test("onTurnLeftUp removes observer from onBeforeAnimationsObservable on the scene", () => {
    systemUnderTest.onTurnLeftDown();
    systemUnderTest.onTurnLeftUp();

    expect(
      scenePresenterMock.Scene.onBeforeAnimationsObservable.remove,
    ).toHaveBeenCalledTimes(1);
    expect(
      scenePresenterMock.Scene.onBeforeAnimationsObservable.remove,
    ).toHaveBeenCalledWith(systemUnderTest["sceneObserver"]);
  });

  test("onTurnRightDown appends observer to onBeforeAnimationsObservable on the scene", () => {
    systemUnderTest.onTurnRightDown();

    expect(
      scenePresenterMock.Scene.onBeforeAnimationsObservable.add,
    ).toHaveBeenCalledTimes(1);
    expect(systemUnderTest["sceneObserver"]).toBeDefined();
  });

  test("onturnRightDown observer updates the alpha of the camera", () => {
    systemUnderTest.onTurnRightDown();
    systemUnderTest["sceneObserver"]!.callback(
      mock<Scene>(),
      mock<EventState>(),
    );

    expect(mockCamera.alpha).toBe(-systemUnderTest["viewModel"].alphaStep);
  });

  test("onTurnRightUp removes observer from onBeforeAnimationsObservable on the scene", () => {
    systemUnderTest.onTurnRightDown();
    systemUnderTest.onTurnRightUp();

    expect(
      scenePresenterMock.Scene.onBeforeAnimationsObservable.remove,
    ).toHaveBeenCalledTimes(1);
    expect(
      scenePresenterMock.Scene.onBeforeAnimationsObservable.remove,
    ).toHaveBeenCalledWith(systemUnderTest["sceneObserver"]);
  });

  test("onZoomInDown appends observer to onBeforeAnimationsObservable on the scene", () => {
    systemUnderTest.onZoomInDown();

    expect(
      scenePresenterMock.Scene.onBeforeAnimationsObservable.add,
    ).toHaveBeenCalledTimes(1);
    expect(systemUnderTest["sceneObserver"]).toBeDefined();
  });

  test("onZoomInDown observer updates the radius of the camera", () => {
    systemUnderTest.onZoomInDown();
    systemUnderTest["sceneObserver"]!.callback(
      mock<Scene>(),
      mock<EventState>(),
    );

    expect(
      mockCamera.radius + systemUnderTest["viewModel"].zoomStep,
    ).toBeLessThanOrEqual(0.001);
  });

  test("onZoomInUp removes observer from onBeforeAnimationsObservable on the scene", () => {
    systemUnderTest.onZoomInDown();
    systemUnderTest.onZoomInUp();

    expect(
      scenePresenterMock.Scene.onBeforeAnimationsObservable.remove,
    ).toHaveBeenCalledTimes(1);
    expect(
      scenePresenterMock.Scene.onBeforeAnimationsObservable.remove,
    ).toHaveBeenCalledWith(systemUnderTest["sceneObserver"]);
  });

  test("onZoomOutDown appends observer to onBeforeAnimationsObservable on the scene", () => {
    systemUnderTest.onZoomOutDown();

    expect(
      scenePresenterMock.Scene.onBeforeAnimationsObservable.add,
    ).toHaveBeenCalledTimes(1);
    expect(systemUnderTest["sceneObserver"]).toBeDefined();
  });

  test("onZoomOutDown observer updates the radius of the camera", () => {
    systemUnderTest.onZoomOutDown();
    systemUnderTest["sceneObserver"]!.callback(
      mock<Scene>(),
      mock<EventState>(),
    );

    expect(
      mockCamera.radius - systemUnderTest["viewModel"].zoomStep,
    ).toBeLessThanOrEqual(0.001);
  });

  test("onZoomOutUp removes observer from onBeforeAnimationsObservable on the scene", () => {
    systemUnderTest.onZoomOutDown();
    systemUnderTest.onZoomOutUp();

    expect(
      scenePresenterMock.Scene.onBeforeAnimationsObservable.remove,
    ).toHaveBeenCalledTimes(1);
    expect(
      scenePresenterMock.Scene.onBeforeAnimationsObservable.remove,
    ).toHaveBeenCalledWith(systemUnderTest["sceneObserver"]);
  });
});
