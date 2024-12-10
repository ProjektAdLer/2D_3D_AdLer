import IAvatarEditorPreviewModelPresenter from "./IAvatarEditorPreviewModelPresenter";
import AvatarEditorPreviewModelViewModel from "./AvatarEditorPreviewModelViewModel";
import AvatarConfigTO from "src/Components/Core/Application/DataTransferObjects/AvatarConfigTO";

export default class AvatarEditorPreviewModelPresenter
  implements IAvatarEditorPreviewModelPresenter
{
  constructor(private viewModel: AvatarEditorPreviewModelViewModel) {}

  onAvatarConfigChanged(
    newAvatarConfig: AvatarConfigTO,
    avatarConfigDiff: Partial<AvatarConfigTO>,
  ): void {
    this.viewModel.currentAvatarConfig.Value = newAvatarConfig;
    this.viewModel.avatarConfigDiff.Value = avatarConfigDiff;
  }
}
