import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import StoryElementViewModel from "./StoryElementViewModel";
import IStoryElementController from "./IStoryElementController";
import IStoryElementPresenter from "./IStoryElementPresenter";
import StoryElementController from "./StoryElementController";
import StoryElementPresenter from "./StoryElementPresenter";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";

@injectable()
export default class StoryElementBuilder extends PresentationBuilder<
  StoryElementViewModel,
  IStoryElementController,
  undefined,
  IStoryElementPresenter
> {
  constructor() {
    super(
      StoryElementViewModel,
      StoryElementController,
      undefined,
      StoryElementPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    // ensure that previous instances of the presenter are unbound, when changing between spaces
    if (CoreDIContainer.isBound(PRESENTATION_TYPES.IStoryElementPresenter)) {
      CoreDIContainer.unbind(PRESENTATION_TYPES.IStoryElementPresenter);
    }

    CoreDIContainer.bind<IStoryElementPresenter>(
      PRESENTATION_TYPES.IStoryElementPresenter
    ).toConstantValue(this.presenter!);

    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());
  }
}
