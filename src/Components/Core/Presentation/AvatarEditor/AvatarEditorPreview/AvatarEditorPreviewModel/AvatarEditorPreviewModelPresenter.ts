import IAvatarEditorPreviewModelPresenter from "./IAvatarEditorPreviewModelPresenter";
import AvatarEditorPreviewModelViewModel from "./AvatarEditorPreviewModelViewModel";
import AvatarConfigTO from "src/Components/Core/Application/DataTransferObjects/AvatarConfigTO";

export default class AvatarEditorPreviewModelPresenter
  implements IAvatarEditorPreviewModelPresenter
{
  constructor(private viewModel: AvatarEditorPreviewModelViewModel) {}

  onAvatarConfigChanged(newAvatarConfig: AvatarConfigTO): void {
    this.viewModel.avatarConfig.Value = newAvatarConfig;

    // TODO: Implement the logic to update the avatar model based on the new config
  }
}
