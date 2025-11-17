import { injectable } from "inversify";
import PrivacyContentViewModel from "./PrivacyContentViewModel";
import PrivacyContentController from "./PrivacyContentController";
import IPrivacyContentController from "./IPrivacyContentController";
import PrivacyContentPresenter from "./PrivacyContentPresenter";
import IPrivacyContentPresenter from "./IPrivacyContentPresenter";
import PresentationBuilder from "src/Components/Core/Presentation/PresentationBuilder/PresentationBuilder";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import AbstractPort from "src/Components/Core/Application/Ports/AbstractPort/AbstractPort";
import ISettingsAdapter from "src/Components/Core/Application/Ports/SettingsPort/ISettingsAdapter";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";

@injectable()
export default class PrivacyContentBuilder extends PresentationBuilder<
  PrivacyContentViewModel,
  IPrivacyContentController,
  undefined,
  IPrivacyContentPresenter
> {
  constructor() {
    super(
      PrivacyContentViewModel,
      PrivacyContentController,
      undefined,
      PrivacyContentPresenter,
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<AbstractPort<ISettingsAdapter>>(
      PORT_TYPES.ISettingsPort,
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());
  }
}
