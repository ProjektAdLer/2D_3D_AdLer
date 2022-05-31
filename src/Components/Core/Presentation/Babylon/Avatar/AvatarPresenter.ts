import AvatarViewModel from "./AvatarViewModel";
import IAvatarPresenter from "./IAvatarPResenter";

export default class AvatarPresenter implements IAvatarPresenter {
  constructor(private viewModel: AvatarViewModel) {}
}
