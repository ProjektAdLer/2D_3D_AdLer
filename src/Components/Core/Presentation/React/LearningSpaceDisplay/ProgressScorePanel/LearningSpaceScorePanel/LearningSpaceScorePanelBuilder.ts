import { injectable } from "inversify";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PresentationBuilder from "../../../../PresentationBuilder/PresentationBuilder";
import LearningSpaceScorePanelPresenter from "./LearningSpaceScorePanelPresenter";
import LearningSpaceScorePanelViewModel from "./LearningSpaceScorePanelViewModel";
import LearningSpaceScorePanelController from "./LearningSpaceScorePanelController";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";

@injectable()
export default class LearningSpaceScorePanelBuilder extends PresentationBuilder<
  LearningSpaceScorePanelViewModel,
  LearningSpaceScorePanelController,
  undefined,
  LearningSpaceScorePanelPresenter
> {
  constructor() {
    super(
      LearningSpaceScorePanelViewModel,
      LearningSpaceScorePanelController,
      undefined,
      LearningSpaceScorePanelPresenter,
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort,
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());
  }
}
