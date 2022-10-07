import { injectable } from "inversify";
import IAvatarPort, {
  AvatarTO,
} from "../../../Application/UseCases/LoadAvatar/IAvatarPort";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarPresenter from "./IAvatarPresenter";

/**
 * @class AvatarPresenter
 * @description Presenter and Port for the Avatar.
 */
@injectable()
export default class AvatarPresenter implements IAvatarPresenter, IAvatarPort {
  private viewModel: AvatarViewModel;

  public set ViewModel(newViewModel: AvatarViewModel) {
    this.viewModel = newViewModel;
  }

  async presentAvatar(avatarTO: AvatarTO): Promise<void> {
    // TODO: apply avatar customization to the viewModel here
  }
}
