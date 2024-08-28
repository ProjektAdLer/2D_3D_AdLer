import { injectable } from "inversify";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import LearningWorldScorePanelPresenter from "./LearningWorldScorePanelPresenter";
import LearningWorldScorePanelViewModel from "./LearningWorldScorePanelViewModel";

@injectable()
export default class LearningWorldScorePanelBuilder extends PresentationBuilder<
  LearningWorldScorePanelViewModel,
  undefined,
  undefined,
  LearningWorldScorePanelPresenter
> {
  constructor() {
    super(
      LearningWorldScorePanelViewModel,
      undefined,
      undefined,
      LearningWorldScorePanelPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!);
  }
}
