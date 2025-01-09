import IAvatarEditorPresenter from "./IAvatarEditorPresenter";
import AvatarEditorViewModel from "./AvatarEditorViewModel";
import AvatarConfigTO from "../../Application/DataTransferObjects/AvatarConfigTO";

export default class AvatarEditorPresenter implements IAvatarEditorPresenter {
  constructor(private viewModel: AvatarEditorViewModel) {
    console.log("AvatarEditorPresenter.constructor", viewModel);
  }

  onAvatarConfigLoaded(avatarConfig: AvatarConfigTO) {
    console.log("AvatarEditorPresenter.onAvatarConfigLoaded", avatarConfig);
    this.viewModel.hair.Value = avatarConfig.hair;
    this.viewModel.beard.Value = avatarConfig.beard;
    this.viewModel.hairColor.Value = avatarConfig.hairColor;

    this.viewModel.eyes.Value = avatarConfig.eyes;
    this.viewModel.mouth.Value = avatarConfig.mouth;
    this.viewModel.shirt.Value = avatarConfig.shirt;
    this.viewModel.pants.Value = avatarConfig.pants;
    this.viewModel.shoes.Value = avatarConfig.shoes;
  }
}
