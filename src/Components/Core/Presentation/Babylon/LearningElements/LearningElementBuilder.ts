import { injectable } from "inversify";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import ILearningElementController from "./ILearningElementController";
import ILearningElementPresenter from "./ILearningElementPresenter";
import LearningElementController from "./LearningElementController";
import LearningElementPresenter from "./LearningElementPresenter";
import LearningElementView from "./LearningElementView";
import LearningElementViewModel from "./LearningElementViewModel";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";

@injectable()
export default class LearningElementBuilder extends PresentationBuilder<
  LearningElementViewModel,
  ILearningElementController,
  LearningElementView,
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

    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!);
  }
}
