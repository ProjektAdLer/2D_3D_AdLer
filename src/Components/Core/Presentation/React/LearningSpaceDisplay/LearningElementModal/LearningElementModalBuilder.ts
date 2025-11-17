import { injectable } from "inversify";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import AbstractPort from "src/Components/Core/Application/Ports/AbstractPort/AbstractPort";
import ISettingsAdapter from "src/Components/Core/Application/Ports/SettingsPort/ISettingsAdapter";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import LearningElementModalController from "./LearningElementModalController";
import LearningElementModalPresenter from "./LearningElementModalPresenter";
import LearningElementModalViewModel from "./LearningElementModalViewModel";
import ILearningElementModalController from "./ILearningElementModalController";
import ILearningElementModalPresenter from "./ILearningElementModalPresenter";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";

@injectable()
export default class LearningElementModalBuilder extends PresentationBuilder<
  LearningElementModalViewModel,
  ILearningElementModalController,
  undefined,
  ILearningElementModalPresenter
> {
  constructor() {
    super(
      LearningElementModalViewModel,
      LearningElementModalController,
      undefined,
      LearningElementModalPresenter,
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort,
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());

    CoreDIContainer.get<AbstractPort<ISettingsAdapter>>(
      PORT_TYPES.ISettingsPort,
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());
  }
}
