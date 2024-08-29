import AvatarCameraViewModel from "../../../../Core/Presentation/Babylon/AvatarCamera/AvatarCameraViewModel";
import AvatarCameraController from "../../../../Core/Presentation/Babylon/AvatarCamera/AvatarCameraController";
import {
  ArcRotateCamera,
  ArcRotateCameraPointersInput,
  DeviceSourceManager,
  DeviceType,
} from "@babylonjs/core";
import { mockDeep } from "jest-mock-extended";
import { DeepMockProxy } from "jest-mock-extended/lib/Mock";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import type { DeviceSourceType } from "@babylonjs/core/DeviceInput/internalDeviceSourceManager";

jest.mock("@babylonjs/core/DeviceInput/InputDevices/DeviceSourceManager");

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

describe("AvatarCameraController", () => {
  let systemUnderTest: AvatarCameraController;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new AvatarCameraController(new AvatarCameraViewModel());

    // @ts-ignore
    DeviceSourceManager.prototype.onDeviceConnectedObservable = {
      add: jest.fn(),
    };
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("constructor calls subscribe on the camera observable in the viewModel", () => {
    const viewModel = new AvatarCameraViewModel();
    const subscribeMock = jest.fn();
    viewModel.camera.subscribe = subscribeMock;

    systemUnderTest = new AvatarCameraController(viewModel);

    expect(systemUnderTest).toBeDefined();
    expect(subscribeMock).toHaveBeenCalledTimes(1);
  });

  test("updateCameraControls sets rotation buttons when mouse is detected", () => {
    const viewModel = new AvatarCameraViewModel();
    const camera = mockDeep<ArcRotateCamera>();
    viewModel.camera.Value = camera;
    systemUnderTest = new AvatarCameraController(viewModel);

    let mockDeviceSource = mockDeep<DeviceSourceType>();
    // @ts-ignore
    mockDeviceSource.deviceType = DeviceType.Mouse;

    systemUnderTest["updateCameraControls"](mockDeviceSource);

    expect(
      // @ts-ignore
      (camera.inputs.attached.pointers as ArcRotateCameraPointersInput).buttons
    ).toEqual(viewModel.rotationButtons);
  });

  test("updateCameraControls attaches keyboard controls when keyboard is detected", () => {
    const viewModel = new AvatarCameraViewModel();
    const camera = mockDeep<ArcRotateCamera>();
    viewModel.camera.Value = camera;
    systemUnderTest = new AvatarCameraController(viewModel);

    let mockDeviceSource = mockDeep<DeviceSourceType>();
    // @ts-ignore
    mockDeviceSource.deviceType = DeviceType.Keyboard;

    systemUnderTest["updateCameraControls"](mockDeviceSource);

    expect(camera.inputs.attached.keyboard.attachControl).toHaveBeenCalledTimes(
      1
    );
  });

  // ANF-ID: [EZZ0021]
  test("applyCameraControls applies lowerRadiusLimit from viewModel to camera", () => {
    const viewModel = new AvatarCameraViewModel();
    const camera = mockDeep<ArcRotateCamera>();
    systemUnderTest = new AvatarCameraController(viewModel);

    systemUnderTest["applyCameraControls"](camera);

    expect(camera.lowerRadiusLimit).toBe(viewModel.lowerRadiusLimit);
  });

  // ANF-ID: [EZZ0021]
  test("applyCameraControls applies upperRadiusLimit from viewModel to camera", () => {
    const viewModel = new AvatarCameraViewModel();
    const camera = mockDeep<ArcRotateCamera>();
    systemUnderTest = new AvatarCameraController(viewModel);

    systemUnderTest["applyCameraControls"](camera);

    expect(camera.upperRadiusLimit).toBe(viewModel.upperRadiusLimit);
  });

  // ANF-ID: [EZZ0021]
  test("applyCameraControls applies wheelDeltaPercentage from viewModel to camera", () => {
    const viewModel = new AvatarCameraViewModel();
    const camera = mockDeep<ArcRotateCamera>();
    systemUnderTest = new AvatarCameraController(viewModel);

    systemUnderTest["applyCameraControls"](camera);

    expect(camera.wheelDeltaPercentage).toBe(viewModel.wheelDeltaPercentage);
  });

  // ANF-ID: [EZZ0021]
  test("applyCameraControls attaches mousewheel zoom controls to camera", () => {
    const viewModel = new AvatarCameraViewModel();
    const camera = mockDeep<ArcRotateCamera>();
    systemUnderTest = new AvatarCameraController(viewModel);

    systemUnderTest["applyCameraControls"](camera);

    expect(
      camera.inputs.attached.mousewheel.attachControl
    ).toHaveBeenCalledTimes(1);
  });

  // ANF-ID: [EZZ0021]
  test("applyCameraControls attaches pointer controls to camera", () => {
    const viewModel = new AvatarCameraViewModel();
    const camera = mockDeep<ArcRotateCamera>();
    systemUnderTest = new AvatarCameraController(viewModel);

    systemUnderTest["applyCameraControls"](camera);

    expect(camera.inputs.attached.pointers.attachControl).toHaveBeenCalledTimes(
      1
    );
  });

  // ANF-ID: [EZZ0021]
  test("applyCameraControls sets multiTouchPanAndZoom to true on pointers input", () => {
    const viewModel = new AvatarCameraViewModel();
    const camera = mockDeep<ArcRotateCamera>();
    systemUnderTest = new AvatarCameraController(viewModel);

    systemUnderTest["applyCameraControls"](camera);

    const pointersInput = camera.inputs.attached
      .pointers as DeepMockProxy<ArcRotateCameraPointersInput>;

    expect(pointersInput.multiTouchPanAndZoom).toBe(true);
  });

  // ANF-ID: [EZZ0021]
  test("applyCameraControls sets pinchZoom to true on pointers input", () => {
    const viewModel = new AvatarCameraViewModel();
    const camera = mockDeep<ArcRotateCamera>();
    systemUnderTest = new AvatarCameraController(viewModel);

    systemUnderTest["applyCameraControls"](camera);

    const pointersInput = camera.inputs.attached
      .pointers as DeepMockProxy<ArcRotateCameraPointersInput>;

    expect(pointersInput.pinchZoom).toBe(true);
  });

  // ANF-ID: [EZZ0030]
  test("applyCameraControls sets angularSensibilityX", () => {
    const viewModel = new AvatarCameraViewModel();
    const camera = mockDeep<ArcRotateCamera>();
    systemUnderTest = new AvatarCameraController(viewModel);

    systemUnderTest["applyCameraControls"](camera);

    expect(camera.angularSensibilityX).toBe(viewModel.rotationSesibility);
  });

  // ANF-ID: [EZZ0030]
  test("applyCameraControls sets alpha limits", () => {
    const viewModel = new AvatarCameraViewModel();
    const camera = mockDeep<ArcRotateCamera>();
    systemUnderTest = new AvatarCameraController(viewModel);
    // @ts-ignore
    viewModel.defaultAlphaRotation = 0;

    systemUnderTest["applyCameraControls"](camera);

    expect(camera.upperAlphaLimit).toBe(viewModel.alphaLimitOffset);
    expect(camera.lowerAlphaLimit).toBe(-viewModel.alphaLimitOffset);
  });
});
