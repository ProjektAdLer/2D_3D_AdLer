import { injectable } from "inversify";
import AvatarEditorPreviewCameraController from "./AvatarEditorPreviewCameraController";
import IAvatarEditorPreviewCameraController from "./IAvatarEditorPreviewCameraController";
import AvatarEditorPreviewCameraViewModel from "./AvatarEditorPreviewCameraViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import AvatarEditorPreviewCameraView from "./AvatarEditorPreviewCameraView";
import IAvatarEditorPreviewCameraPresenter from "./IAvatarEditorPreviewCameraPresenter";
import AvatarEditorPreviewCameraPresenter from "./AvatarEditorPreviewCameraPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
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

  override buildPresenter(): void {
    super.buildPresenter();
    if (
      CoreDIContainer.isBound(
        PRESENTATION_TYPES.IAvatarEditorPreviewCameraPresenter,
      )
    ) {
      CoreDIContainer.unbind(
        PRESENTATION_TYPES.IAvatarEditorPreviewCameraPresenter,
      );
    }

    CoreDIContainer.bind<IAvatarEditorPreviewCameraPresenter>(
      PRESENTATION_TYPES.IAvatarEditorPreviewCameraPresenter,
    ).toConstantValue(this.presenter!);
  }
}
