import { injectable, inject } from "inversify";
import CookieModalController from "./CookieModalController";
import ICookieModalController from "./ICookieModalController";
import CookieModalViewModel from "./CookieModalViewModel";
import CookieModalPresenter from "./CookieModalPresenter";
import ICookieModalPresenter from "./ICookieModalPresenter";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import type ISetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/SetSettingsConfig/ISetSettingsConfigUseCase";
import type IGetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/GetSettingsConfig/IGetSettingsConfigUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
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
  private setSettingsConfigUseCase: ISetSettingsConfigUseCase;
  private getSettingsConfigUseCase: IGetSettingsConfigUseCase;

  constructor(
    @inject(USECASE_TYPES.ISetSettingsConfigUseCase)
    setSettingsConfigUseCase: ISetSettingsConfigUseCase,
    @inject(USECASE_TYPES.IGetSettingsConfigUseCase)
    getSettingsConfigUseCase: IGetSettingsConfigUseCase,
  ) {
    super(CookieModalViewModel, undefined, undefined, CookieModalPresenter);
    this.setSettingsConfigUseCase = setSettingsConfigUseCase;
    this.getSettingsConfigUseCase = getSettingsConfigUseCase;
  }

  override buildViewModel(): void {
    this.viewModel = new CookieModalViewModel();

    // Initialize with current cookie consent status from settings
    const currentSettings = this.getSettingsConfigUseCase.execute();
    if (currentSettings.cookieConsent !== undefined) {
      this.viewModel.cookieConsent.Value = currentSettings.cookieConsent;
    }
  }

  override buildController(): void {
    this.controller = new CookieModalController(
      this.setSettingsConfigUseCase,
      this.getSettingsConfigUseCase,
    );
  }

  override buildPresenter(): void {
    this.presenter = new CookieModalPresenter(this.viewModel!);
    CoreDIContainer.get<AbstractPort<ISettingsAdapter>>(
      PORT_TYPES.ISettingsPort,
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());
  }
}
