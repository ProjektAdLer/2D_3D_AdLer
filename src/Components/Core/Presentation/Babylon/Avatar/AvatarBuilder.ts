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
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import AvatarPresenter from "./AvatarPresenter";

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
    super(AvatarViewModel, AvatarController, AvatarView, AvatarPresenter);
  }

  override buildViewModel(): void {
    super.buildViewModel();
    this.viewModel!.learningSpaceTemplateType = this.learningSpaceTemplateType;
    this.viewModel!.focusSelection = CoreDIContainer.get(
      PRESENTATION_TYPES.IAvatarFocusSelection,
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    if (CoreDIContainer.isBound(PRESENTATION_TYPES.IAvatarPresenter)) {
      CoreDIContainer.unbind(PRESENTATION_TYPES.IAvatarPresenter);
    }
    CoreDIContainer.bind<IAvatarPresenter>(
      PRESENTATION_TYPES.IAvatarPresenter,
    ).toConstantValue(this.presenter!);

    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort,
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());
    this.viewModel!.focusSelection.registerAvatarPresenter(this.presenter!);
  }

  override buildController(): void {
    super.buildController();

    this.controller!.learningSpacePresenter = this.learningSpacePresenter;
  }

  override buildView(): void {
    super.buildView();

    this.view!.asyncSetup().then(
      () => this.resolveIsCompleted(),
      (e) => console.log(e),
    );
  }
}
