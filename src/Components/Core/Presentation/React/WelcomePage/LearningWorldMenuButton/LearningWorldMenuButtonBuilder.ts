import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import LearningWorldMenuButtonViewModel from "./LearningWorldMenuButtonViewModel";
import LearningWorldMenuButtonPresenter from "./LearningWorldMenuButtonPresenter";
import AbstractPort from "src/Components/Core/Application/Ports/AbstractPort/AbstractPort";
import ILMSAdapter from "src/Components/Core/Application/Ports/LMSPort/ILMSAdapter";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";

@injectable()
export default class LearningWorldMenuButtonBuilder extends PresentationBuilder<
  LearningWorldMenuButtonViewModel,
  undefined,
  undefined,
  LearningWorldMenuButtonPresenter
> {
  constructor() {
    super(
      LearningWorldMenuButtonViewModel,
      undefined,
      undefined,
      LearningWorldMenuButtonPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<AbstractPort<ILMSAdapter>>(
      PORT_TYPES.ILMSPort
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());
  }
}
