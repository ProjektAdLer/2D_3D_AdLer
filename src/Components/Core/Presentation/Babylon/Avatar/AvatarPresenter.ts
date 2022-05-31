import { injectable } from "inversify";
import IAvatarPort, {
  AvatarTO,
} from "../../../Application/LoadAvatar/IAvatarPort";
import BUILDER_TYPES from "../../../DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import IPresentationBuilder from "../../PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../PresentationBuilder/IPresentationDirector";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarPresenter from "./IAvatarPresenter";

/**
 * @class AvatarBuilder
 * @description Presenter and Port for the Avatar. The first call to presentAvatar creates View, ViewModel and Controller for the Avatar.
 */
@injectable()
export default class AvatarPresenter implements IAvatarPresenter, IAvatarPort {
  private viewModel: AvatarViewModel;

  public set ViewModel(newViewModel: AvatarViewModel) {
    this.viewModel = newViewModel;
  }

  presentAvatar(avatarTO: AvatarTO): void {
    if (!this.viewModel) {
      let director = CoreDIContainer.get<IPresentationDirector>(
        BUILDER_TYPES.IPresentationDirector
      );
      let builder = CoreDIContainer.get<IPresentationBuilder>(
        BUILDER_TYPES.IAvatarBuilder
      );
      director.Builder = builder;
      director.build();
    }
    // TODO: apply avatar customization here
  }
}
