import { injectable } from "inversify";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import ScorePanelPresenter from "./ScorePanelPresenter";
import ScorePanelViewModel from "./ScorePanelViewModel";

@injectable()
export default class ScorePanelBuilder extends PresentationBuilder<
  ScorePanelViewModel,
  undefined,
  undefined,
  ScorePanelPresenter
> {
  constructor() {
    super(ScorePanelViewModel, undefined, undefined, ScorePanelPresenter);
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!);
  }
}
