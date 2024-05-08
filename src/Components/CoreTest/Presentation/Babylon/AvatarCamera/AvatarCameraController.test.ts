import AvatarCameraViewModel from "../../../../Core/Presentation/Babylon/AvatarCamera/AvatarCameraViewModel";
import AvatarCameraController from "../../../../Core/Presentation/Babylon/AvatarCamera/AvatarCameraController";
import { ArcRotateCamera, ArcRotateCameraPointersInput } from "@babylonjs/core";
import { mockDeep } from "jest-mock-extended";
import { DeepMockProxy } from "jest-mock-extended/lib/Mock";

describe("AvatarCameraController", () => {
  let systemUnderTest: AvatarCameraController;

  test("constructor calls subsribe on the camer observable in the viewModel", () => {
    const viewModel = new AvatarCameraViewModel();
    const subscribeMock = jest.fn();
    viewModel.camera.subscribe = subscribeMock;

    systemUnderTest = new AvatarCameraController(viewModel);

    expect(systemUnderTest).toBeDefined();
    expect(subscribeMock).toHaveBeenCalledTimes(1);
  });

  // ANF-ID: [EZZ021]
  test("applyCameraControls applies lowerRadiusLimit from viewModel to camera", () => {
    const viewModel = new AvatarCameraViewModel();
    const camera = mockDeep<ArcRotateCamera>();
    systemUnderTest = new AvatarCameraController(viewModel);

    systemUnderTest["applyCameraControls"](camera);

    expect(camera.lowerRadiusLimit).toBe(viewModel.lowerRadiusLimit);
  });

  // ANF-ID: [EZZ021]
  test("applyCameraControls applies upperRadiusLimit from viewModel to camera", () => {
    const viewModel = new AvatarCameraViewModel();
    const camera = mockDeep<ArcRotateCamera>();
    systemUnderTest = new AvatarCameraController(viewModel);

    systemUnderTest["applyCameraControls"](camera);

    expect(camera.upperRadiusLimit).toBe(viewModel.upperRadiusLimit);
  });

  // ANF-ID: [EZZ021]
  test("applyCameraControls applies wheelDeltaPercentage from viewModel to camera", () => {
    const viewModel = new AvatarCameraViewModel();
    const camera = mockDeep<ArcRotateCamera>();
    systemUnderTest = new AvatarCameraController(viewModel);

    systemUnderTest["applyCameraControls"](camera);

    expect(camera.wheelDeltaPercentage).toBe(viewModel.wheelDeltaPercentage);
  });

  // ANF-ID: [EZZ021]
  test("applyCameraControls attaches mousewheel zoom controls to camera", () => {
    const viewModel = new AvatarCameraViewModel();
    const camera = mockDeep<ArcRotateCamera>();
    systemUnderTest = new AvatarCameraController(viewModel);

    systemUnderTest["applyCameraControls"](camera);

    expect(
      camera.inputs.attached.mousewheel.attachControl
    ).toHaveBeenCalledTimes(1);
  });

  // ANF-ID: [EZZ021]
  test("applyCameraControls attaches pointer controls to camera", () => {
    const viewModel = new AvatarCameraViewModel();
    const camera = mockDeep<ArcRotateCamera>();
    systemUnderTest = new AvatarCameraController(viewModel);

    systemUnderTest["applyCameraControls"](camera);

    expect(camera.inputs.attached.pointers.attachControl).toHaveBeenCalledTimes(
      1
    );
  });

  // ANF-ID: [EZZ021]
  test("applyCameraControls sets multiTouchPanAndZoom to true on pointers input", () => {
    const viewModel = new AvatarCameraViewModel();
    const camera = mockDeep<ArcRotateCamera>();
    systemUnderTest = new AvatarCameraController(viewModel);

    systemUnderTest["applyCameraControls"](camera);

    const pointersInput = camera.inputs.attached
      .pointers as DeepMockProxy<ArcRotateCameraPointersInput>;

    expect(pointersInput.multiTouchPanAndZoom).toBe(true);
  });

  // ANF-ID: [EZZ021]
  test("applyCameraControls sets pinchZoom to true on pointers input", () => {
    const viewModel = new AvatarCameraViewModel();
    const camera = mockDeep<ArcRotateCamera>();
    systemUnderTest = new AvatarCameraController(viewModel);

    systemUnderTest["applyCameraControls"](camera);

    const pointersInput = camera.inputs.attached
      .pointers as DeepMockProxy<ArcRotateCameraPointersInput>;

    expect(pointersInput.pinchZoom).toBe(true);
  });

  test.skip("applyCameraControls applies upperBetaLimit from viewModel to camera", () => {
    const viewModel = new AvatarCameraViewModel();
    const camera = mockDeep<ArcRotateCamera>();
    systemUnderTest = new AvatarCameraController(viewModel);

    systemUnderTest["applyCameraControls"](camera);

    expect(camera.upperBetaLimit).toBe(viewModel.upperBetaLimit);
  });
});
