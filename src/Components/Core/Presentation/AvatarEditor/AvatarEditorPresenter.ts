import IAvatarEditorPresenter from "./IAvatarEditorPresenter";
import AvatarEditorViewModel from "./AvatarEditorViewModel";
import AvatarConfigTO from "../../Application/DataTransferObjects/AvatarConfigTO";

export default class AvatarEditorPresenter implements IAvatarEditorPresenter {
  constructor(private viewModel: AvatarEditorViewModel) {}

  onAvatarConfigLoaded(avatarConfig: AvatarConfigTO) {
    this.viewModel.hair.Value = avatarConfig.hair ?? this.viewModel.hair.Value;
    this.viewModel.beard.Value =
      avatarConfig.beard ?? this.viewModel.beard.Value;
    this.viewModel.hairColor.Value =
      avatarConfig.hairColor ?? this.viewModel.hairColor.Value;

    this.viewModel.eyes.Value = avatarConfig.eyes ?? this.viewModel.eyes.Value;
    this.viewModel.mouth.Value =
      avatarConfig.mouth ?? this.viewModel.mouth.Value;
  }

  onAvatarConfigChanged(
    newAvatarConfig: AvatarConfigTO,
    avatarConfigDiff: Partial<AvatarConfigTO>,
  ): void {
    this.viewModel.hair.Value =
      newAvatarConfig.hair ?? this.viewModel.hair.Value;
    this.viewModel.beard.Value =
      newAvatarConfig.beard ?? this.viewModel.beard.Value;
    this.viewModel.hairColor.Value =
      newAvatarConfig.hairColor ?? this.viewModel.hairColor.Value;

    this.viewModel.eyes.Value =
      newAvatarConfig.eyes ?? this.viewModel.eyes.Value;
    this.viewModel.mouth.Value =
      newAvatarConfig.mouth ?? this.viewModel.mouth.Value;
  }
}
