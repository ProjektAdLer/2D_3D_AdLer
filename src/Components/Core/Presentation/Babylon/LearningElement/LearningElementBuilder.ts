import { injectable } from "inversify";
import ILearningElementPort from "../../../Application/LearningElementStarted/ILearningElementPort";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import ILearningElementController from "./ILearningElementController";
import ILearningElementPresenter from "./ILearningElementPresenter";
import ILearningElementView from "./ILearningElementView";
import LearningElementController from "./LearningElementController";
import LearningElementPresenter from "./LearningElementPresenter";
import LearningElementView from "./LearningElementView";
import LearningElementViewModel from "./LearningElementViewModel";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";

@injectable()
export default class LearningElementBuilder extends PresentationBuilder<
  LearningElementViewModel,
  ILearningElementController,
  ILearningElementView,
  ILearningElementPresenter
> {
  constructor() {
    super(
      LearningElementViewModel,
      LearningElementController,
      LearningElementView,
      LearningElementPresenter
    );
  }

  buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<ILearningElementPort>(
      PORT_TYPES.ILearningElementPort
    ).addLearningElementPresenter(this.presenter!);
  }
}
