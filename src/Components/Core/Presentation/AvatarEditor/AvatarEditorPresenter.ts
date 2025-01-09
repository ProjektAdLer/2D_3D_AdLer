import IAvatarEditorPresenter from "./IAvatarEditorPresenter";
import AvatarEditorViewModel from "./AvatarEditorViewModel";
import AvatarConfigTO from "../../Application/DataTransferObjects/AvatarConfigTO";

export default class AvatarEditorPresenter implements IAvatarEditorPresenter {
  constructor(private viewModel: AvatarEditorViewModel) {}

  onAvatarConfigLoaded(avatarConfig: AvatarConfigTO) {}
}
