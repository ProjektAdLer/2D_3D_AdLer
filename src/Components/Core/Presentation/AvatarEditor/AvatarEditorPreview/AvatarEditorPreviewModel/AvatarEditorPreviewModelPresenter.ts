import IAvatarEditorPreviewModelPresenter from "./IAvatarEditorPreviewModelPresenter";
import AvatarEditorPreviewModelViewModel from "./AvatarEditorPreviewModelViewModel";

export default class AvatarEditorPreviewModelPresenter
  implements IAvatarEditorPreviewModelPresenter
{
  constructor(private viewModel: AvatarEditorPreviewModelViewModel) {}
}
