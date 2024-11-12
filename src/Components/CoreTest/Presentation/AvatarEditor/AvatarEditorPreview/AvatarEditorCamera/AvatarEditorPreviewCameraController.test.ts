import { mockDeep } from "jest-mock-extended";
import AvatarEditorPreviewCameraController from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewCamera/AvatarEditorPreviewCameraController";
import AvatarEditorPreviewCameraViewModel from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewCamera/AvatarEditorPreviewCameraViewModel";
import { ArcRotateCamera, ArcRotateCameraPointersInput } from "@babylonjs/core";

describe("AvatarEditorPreviewCameraController", () => {
  let systemUnderTest: AvatarEditorPreviewCameraController;
  let viewModel: AvatarEditorPreviewCameraViewModel;

  beforeEach(() => {
    viewModel = new AvatarEditorPreviewCameraViewModel();
    systemUnderTest = new AvatarEditorPreviewCameraController(viewModel);
  });

  test("updateCameraControls applies controls when camera is set", () => {
    const camera = mockDeep<ArcRotateCamera>();
    const attachControlSpy = jest.spyOn(
      camera.inputs.attached.mousewheel,
      "attachControl",
    );
    const attachControlSpy2 = jest.spyOn(
      camera.inputs.attached.pointers,
      "attachControl",
    );
    const pointersInput = camera.inputs.attached.pointers as any;

    viewModel.camera.Value = camera;

    expect(attachControlSpy).toHaveBeenCalledTimes(1);
    expect(attachControlSpy2).toHaveBeenCalledTimes(1);
    expect(pointersInput.multiTouchPanAndZoom).toBe(true);
    expect(pointersInput.pinchZoom).toBe(true);
  });
});
