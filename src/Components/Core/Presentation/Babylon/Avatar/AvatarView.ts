import AvatarViewModel from "./AvatarViewModel";
import IAvatarController from "./IAvatarController";

export default class AvatarView {
  constructor(
    private viewModel: AvatarViewModel,
    private controller: IAvatarController
  ) {}
}
