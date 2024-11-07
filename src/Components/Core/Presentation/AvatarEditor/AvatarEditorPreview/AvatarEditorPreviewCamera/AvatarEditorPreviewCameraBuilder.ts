import { injectable } from "inversify";
import AvatarEditorPreviewCameraController from "./AvatarEditorPreviewCameraController";
import AvatarEditorPreviewCameraPresenter from "./AvatarEditorPreviewCameraPresenter";
import IAvatarEditorPreviewCameraController from "./IAvatarEditorPreviewCameraController";
import IAvatarEditorPreviewCameraPresenter from "./IAvatarEditorPreviewCameraPresenter";
import AvatarEditorPreviewCameraViewModel from "./AvatarEditorPreviewCameraViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import AvatarEditorPreviewCameraView from "./AvatarEditorPreviewCameraView";

/*
This Template Provides the whole scaffolding for a React Component.
Copy below lines in the DI Container and its Types

bind<IPresentationBuilder>(BUILDER_TYPES.IAvatarEditorPreviewCameraBuilder).to(AvatarEditorPreviewCameraBuilder);
IAvatarEditorPreviewCameraBuilder: Symbol("IAvatarEditorPreviewCameraBuilder"),

director.Builder = CoreDIContainer.get<IPresentationBuilder>(
  BUILDER_TYPES.IAvatarEditorPreviewCameraBuilder
);
director.build();
*/

@injectable()
export default class AvatarEditorPreviewCameraBuilder extends PresentationBuilder<
  AvatarEditorPreviewCameraViewModel,
  IAvatarEditorPreviewCameraController,
  AvatarEditorPreviewCameraView,
  IAvatarEditorPreviewCameraPresenter
> {
  constructor() {
    super(
      AvatarEditorPreviewCameraViewModel,
      AvatarEditorPreviewCameraController,
      AvatarEditorPreviewCameraView,
      AvatarEditorPreviewCameraPresenter,
    );
  }
}
