import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import NarrativeFrameworkViewModel from "./NarrativeFrameworkViewModel";
import INarrativeFrameworkController from "./INarrativeFrameworkController";
import INarrativeFrameworkPresenter from "./INarrativeFrameworkPresenter";
import NarrativeFrameworkController from "./NarrativeFrameworkController";
import NarrativeFrameworkPresenter from "./NarrativeFrameworkPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";

@injectable()
export default class NarrativeFrameworkBuilder extends PresentationBuilder<
  NarrativeFrameworkViewModel,
  INarrativeFrameworkController,
  undefined,
  INarrativeFrameworkPresenter
> {
  constructor() {
    super(
      NarrativeFrameworkViewModel,
      NarrativeFrameworkController,
      undefined,
      NarrativeFrameworkPresenter,
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort,
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());
  }
}
