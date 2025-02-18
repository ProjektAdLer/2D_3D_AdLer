import IAvatarEditorPresenter from "./IAvatarEditorPresenter";
import AvatarEditorViewModel from "./AvatarEditorViewModel";
import AvatarConfigTO from "../../Application/DataTransferObjects/AvatarConfigTO";

export default class AvatarEditorPresenter implements IAvatarEditorPresenter {
  constructor(private viewModel: AvatarEditorViewModel) {}

  onAvatarConfigLoaded(avatarConfig: AvatarConfigTO) {
    this.updateViewModel(avatarConfig);
  }

  onAvatarConfigChanged(
    newAvatarConfig: AvatarConfigTO,
    avatarConfigDiff: Partial<AvatarConfigTO>,
  ): void {
    this.updateViewModel(newAvatarConfig);
  }

  updateViewModel(avatarConfig: AvatarConfigTO) {
    // Face
    this.viewModel.eyebrows.Value =
      avatarConfig.eyebrows ?? this.viewModel.eyebrows.Value;
    this.viewModel.eyes.Value = avatarConfig.eyes ?? this.viewModel.eyes.Value;
    this.viewModel.nose.Value = avatarConfig.nose ?? this.viewModel.nose.Value;
    this.viewModel.mouth.Value =
      avatarConfig.mouth ?? this.viewModel.mouth.Value;
    // Hair
    this.viewModel.hair.Value = avatarConfig.hair ?? this.viewModel.hair.Value;
    this.viewModel.beard.Value =
      avatarConfig.beard ?? this.viewModel.beard.Value;
    this.viewModel.hairColor.Value =
      avatarConfig.hairColor ?? this.viewModel.hairColor.Value;
    // Accessories
    this.viewModel.headgear.Value =
      avatarConfig.headgear ?? this.viewModel.headgear.Value;
    this.viewModel.glasses.Value =
      avatarConfig.glasses ?? this.viewModel.glasses.Value;
    this.viewModel.backpack.Value =
      avatarConfig.backpack ?? this.viewModel.backpack.Value;
    this.viewModel.other.Value =
      avatarConfig.other ?? this.viewModel.other.Value;
    //clothes
    this.viewModel.shirt.Value =
      avatarConfig.shirt ?? this.viewModel.shirt.Value;
    this.viewModel.shirtColor.Value =
      avatarConfig.shirtColor ?? this.viewModel.shirtColor.Value;
    this.viewModel.pants.Value =
      avatarConfig.pants ?? this.viewModel.pants.Value;
    this.viewModel.pantsColor.Value =
      avatarConfig.pantsColor ?? this.viewModel.pantsColor.Value;
    this.viewModel.shoes.Value =
      avatarConfig.shoes ?? this.viewModel.shoes.Value;
    this.viewModel.shoesColor.Value =
      avatarConfig.shoesColor ?? this.viewModel.shoesColor.Value;

    //Body
    this.viewModel.skinColor.Value =
      avatarConfig.skinColor ?? this.viewModel.skinColor.Value;
  }
}
