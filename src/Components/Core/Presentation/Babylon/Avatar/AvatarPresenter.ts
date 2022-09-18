import { inject, injectable } from "inversify";
import IAvatarPort, {
  AvatarTO,
} from "../../../Application/UseCases/LoadAvatar/IAvatarPort";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import type IScenePresenter from "../SceneManagement/IScenePresenter";
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

  constructor(
    @inject(CORE_TYPES.IScenePresenter) private scenePresenter: IScenePresenter
  ) {}

  async presentAvatar(avatarTO: AvatarTO): Promise<void> {
    // TODO: apply avatar customization to the viewModel here
  }
}
