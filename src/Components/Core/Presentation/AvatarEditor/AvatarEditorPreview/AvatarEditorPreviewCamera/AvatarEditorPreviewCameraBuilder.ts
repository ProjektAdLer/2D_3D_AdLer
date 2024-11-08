import { injectable } from "inversify";
import AvatarEditorPreviewCameraController from "./AvatarEditorPreviewCameraController";
import IAvatarEditorPreviewCameraController from "./IAvatarEditorPreviewCameraController";
import AvatarEditorPreviewCameraViewModel from "./AvatarEditorPreviewCameraViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import AvatarEditorPreviewCameraView from "./AvatarEditorPreviewCameraView";

@injectable()
export default class AvatarEditorPreviewCameraBuilder extends PresentationBuilder<
  AvatarEditorPreviewCameraViewModel,
  IAvatarEditorPreviewCameraController,
  AvatarEditorPreviewCameraView,
  undefined
> {
  constructor() {
    super(
      AvatarEditorPreviewCameraViewModel,
      AvatarEditorPreviewCameraController,
      AvatarEditorPreviewCameraView,
      undefined,
    );
  }
}
