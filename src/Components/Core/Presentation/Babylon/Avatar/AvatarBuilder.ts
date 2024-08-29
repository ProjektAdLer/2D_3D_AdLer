import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import AsyncPresentationBuilder from "../../PresentationBuilder/AsyncPresentationBuilder";
import AvatarController from "./AvatarController";
import AvatarView from "./AvatarView";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarController from "./IAvatarController";
import IAvatarPresenter from "./IAvatarPresenter";
import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import ILearningSpacePresenter from "../LearningSpaces/ILearningSpacePresenter";
import IAvatarBuilder from "./IAvatarBuilder";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";

export default class AvatarBuilder
  extends AsyncPresentationBuilder<
    AvatarViewModel,
    IAvatarController,
    AvatarView,
    IAvatarPresenter
  >
  implements IAvatarBuilder
{
  learningSpaceTemplateType: LearningSpaceTemplateType;
  learningSpacePresenter: ILearningSpacePresenter;

  constructor() {
    super(AvatarViewModel, AvatarController, AvatarView, undefined);
  }

  override buildViewModel(): void {
    super.buildViewModel();
    this.viewModel!.learningSpaceTemplateType = this.learningSpaceTemplateType;
  }

  override buildPresenter(): void {
    // create presenter via DI because it also acts as port for the avatar
    this.presenter = CoreDIContainer.get<IAvatarPresenter>(
      PORT_TYPES.IAvatarPort
    );
    this.presenter.ViewModel = this.viewModel!;

    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter, HistoryWrapper.currentLocationScope());
  }

  override buildController(): void {
    super.buildController();

    this.controller!.learningSpacePresenter = this.learningSpacePresenter;
  }

  override buildView(): void {
    super.buildView();

    this.view!.asyncSetup().then(
      () => this.resolveIsCompleted(),
      (e) => console.log(e)
    );
  }
}
