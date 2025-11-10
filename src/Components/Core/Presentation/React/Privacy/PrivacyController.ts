import IPrivacyController from "./IPrivacyController";
import PrivacyViewModel from "./PrivacyViewModel";
import CoreDIContainer from "src/Components/Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/GetSettingsConfig/IGetSettingsConfigUseCase";
import type ISetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/SetSettingsConfig/ISetSettingsConfigUseCase";
import SettingsTO from "src/Components/Core/Application/DataTransferObjects/SettingsTO";
import bind from "bind-decorator";

export default class PrivacyController implements IPrivacyController {
  private getSettingsConfigUseCase: IGetSettingsConfigUseCase;
  private setSettingsConfigUseCase: ISetSettingsConfigUseCase;

  constructor(private viewModel: PrivacyViewModel) {
    this.getSettingsConfigUseCase =
      CoreDIContainer.get<IGetSettingsConfigUseCase>(
        USECASE_TYPES.IGetSettingsConfigUseCase,
      );
    this.setSettingsConfigUseCase =
      CoreDIContainer.get<ISetSettingsConfigUseCase>(
        USECASE_TYPES.ISetSettingsConfigUseCase,
      );

    // Initialize cookie consent status
    this.loadCookieConsent();
  }

  private loadCookieConsent(): void {
    const settings = this.getSettingsConfigUseCase.execute();
    this.viewModel.cookiesAccepted.Value =
      settings.cookieConsent === "accepted";
  }

  @bind
  getUserSettings(): SettingsTO {
    return this.getSettingsConfigUseCase.execute();
  }

  @bind
  setCookieConsent(accepted: boolean): void {
    const settings = new SettingsTO();
    settings.cookieConsent = accepted ? "accepted" : "declined";
    this.setSettingsConfigUseCase.execute(settings);
    this.viewModel.cookiesAccepted.Value = accepted;
  }
}
