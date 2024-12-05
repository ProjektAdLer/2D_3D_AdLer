import IAvatarEditorPreviewModelPresenter from "./IAvatarEditorPreviewModelPresenter";
import AvatarEditorPreviewModelViewModel from "./AvatarEditorPreviewModelViewModel";
import AvatarConfigTO from "src/Components/Core/Application/DataTransferObjects/AvatarConfigTO";

export default class AvatarEditorPreviewModelPresenter
  implements IAvatarEditorPreviewModelPresenter
{
  constructor(private viewModel: AvatarEditorPreviewModelViewModel) {}

  onAvatarConfigChanged(newAvatarConfig: AvatarConfigTO): void {
    if (!this.viewModel.currentAvatarConfig.Value) {
      this.viewModel.avatarConfigDiff.Value = newAvatarConfig;
      this.viewModel.currentAvatarConfig.Value = newAvatarConfig;
      return;
    }

    // compute difference between new and current avatar config
    let difference: any = {}; // actually Partial<AvatarConfigTO>, but TS doesn't like that
    for (const key in newAvatarConfig) {
      const typedKey = key as keyof AvatarConfigTO;
      if (
        newAvatarConfig[typedKey] !==
        this.viewModel.currentAvatarConfig.Value[typedKey]
      )
        difference[typedKey] = newAvatarConfig[typedKey];
    }

    this.viewModel.avatarConfigDiff.Value =
      difference as Partial<AvatarConfigTO>;
    this.viewModel.currentAvatarConfig.Value = newAvatarConfig;
  }
}
