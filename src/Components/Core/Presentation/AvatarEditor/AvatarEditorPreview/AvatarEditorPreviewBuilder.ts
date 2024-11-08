import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import AvatarEditorPreviewViewModel from "./AvatarEditorPreviewViewModel";
import IAvatarEditorPreviewController from "./IAvatarEditorPreviewController";
import AvatarEditorPreviewController from "./AvatarEditorPreviewController";

@injectable()
export default class AvatarEditorPreviewBuilder extends PresentationBuilder<
  AvatarEditorPreviewViewModel,
  IAvatarEditorPreviewController,
  undefined,
  undefined
> {
  constructor() {
    super(
      AvatarEditorPreviewViewModel,
      AvatarEditorPreviewController,
      undefined,
      undefined,
    );
  }
}
