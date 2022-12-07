import AvatarCameraViewModel from "../../../../Core/Presentation/Babylon/AvatarCamera/AvatarCameraViewModel";
import AvatarCameraController from "../../../../Core/Presentation/Babylon/AvatarCamera/AvatarCameraController";
import { ArcRotateCamera } from "@babylonjs/core";
import { mockDeep } from "jest-mock-extended";

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

  test("applyCameraControls applies lowerRadiusLimit from viewModel to camera", () => {
    const viewModel = new AvatarCameraViewModel();
    const camera = mockDeep<ArcRotateCamera>();
    systemUnderTest = new AvatarCameraController(viewModel);

    systemUnderTest["applyCameraControls"](camera);

    expect(camera.lowerRadiusLimit).toBe(viewModel.lowerRadiusLimit);
  });

  test("applyCameraControls applies upperRadiusLimit from viewModel to camera", () => {
    const viewModel = new AvatarCameraViewModel();
    const camera = mockDeep<ArcRotateCamera>();
    systemUnderTest = new AvatarCameraController(viewModel);

    systemUnderTest["applyCameraControls"](camera);

    expect(camera.upperRadiusLimit).toBe(viewModel.upperRadiusLimit);
  });

  test("applyCameraControls applies wheelDeltaPercentage from viewModel to camera", () => {
    const viewModel = new AvatarCameraViewModel();
    const camera = mockDeep<ArcRotateCamera>();
    systemUnderTest = new AvatarCameraController(viewModel);

    systemUnderTest["applyCameraControls"](camera);

    expect(camera.wheelDeltaPercentage).toBe(viewModel.wheelDeltaPercentage);
  });
});
