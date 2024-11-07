import IAvatarEditorPreviewCameraPresenter from "./IAvatarEditorPreviewCameraPresenter";
import AvatarEditorPreviewCameraViewModel from "./AvatarEditorPreviewCameraViewModel";

export default class AvatarEditorPreviewCameraPresenter
  implements IAvatarEditorPreviewCameraPresenter
{
  constructor(private viewModel: AvatarEditorPreviewCameraViewModel) {}
}
