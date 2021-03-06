import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import AvatarController from "./AvatarController";
import AvatarView from "./AvatarView";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarController from "./IAvatarController";
import IAvatarPresenter from "./IAvatarPresenter";

export default class AvatarBuilder extends PresentationBuilder<
  AvatarViewModel,
  IAvatarController,
  AvatarView,
  IAvatarPresenter
> {
  constructor() {
    super(AvatarViewModel, AvatarController, AvatarView, undefined);
  }

  override buildPresenter(): void {
    // create presenter via DI because it also acts as port for the avatar
    this.presenter = CoreDIContainer.get<IAvatarPresenter>(
      PORT_TYPES.IAvatarPort
    );
    this.presenter.ViewModel = this.viewModel!;
  }
}
