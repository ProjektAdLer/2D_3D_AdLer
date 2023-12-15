import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import IntroStoryElementViewModel from "./IntroStoryElementViewModel";
import IIntroStoryElementController from "./IIntroStoryElementController";
import IIntroStoryElementPresenter from "./IIntroStoryElementPresenter";
import IntroStoryElementController from "./IntroStoryElementController";
import IntroStoryElementPresenter from "./IntroStoryElementPresenter";

@injectable()
export default class IntroStoryElementBuilder extends PresentationBuilder<
  IntroStoryElementViewModel,
  IIntroStoryElementController,
  undefined,
  IIntroStoryElementPresenter
> {
  constructor() {
    super(
      IntroStoryElementViewModel,
      IntroStoryElementController,
      undefined,
      IntroStoryElementPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    // ensure that previous instances of the presenter are unbound, when changing between spaces
    if (
      CoreDIContainer.isBound(PRESENTATION_TYPES.IIntroStoryElementPresenter)
    ) {
      CoreDIContainer.unbind(PRESENTATION_TYPES.IIntroStoryElementPresenter);
    }

    CoreDIContainer.bind<IIntroStoryElementPresenter>(
      PRESENTATION_TYPES.IIntroStoryElementPresenter
    ).toConstantValue(this.presenter!);

    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!);
  }
}
