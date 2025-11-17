import { injectable } from "inversify";
import CookieModalController from "./CookieModalController";
import ICookieModalController from "./ICookieModalController";
import CookieModalViewModel from "./CookieModalViewModel";
import CookieModalPresenter from "./CookieModalPresenter";
import ICookieModalPresenter from "./ICookieModalPresenter";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import AbstractPort from "src/Components/Core/Application/Ports/AbstractPort/AbstractPort";
import ISettingsAdapter from "src/Components/Core/Application/Ports/SettingsPort/ISettingsAdapter";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";

@injectable()
export default class CookieModalBuilder extends PresentationBuilder<
  CookieModalViewModel,
  ICookieModalController,
  undefined,
  ICookieModalPresenter
> {
  constructor() {
    super(
      CookieModalViewModel,
      CookieModalController,
      undefined,
      CookieModalPresenter,
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<AbstractPort<ISettingsAdapter>>(
      PORT_TYPES.ISettingsPort,
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());
  }
}
