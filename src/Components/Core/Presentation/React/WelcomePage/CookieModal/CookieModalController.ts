import ICookieModalController from "./ICookieModalController";
import CookieModalViewModel from "./CookieModalViewModel";
import CoreDIContainer from "src/Components/Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type ISetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/SetSettingsConfig/ISetSettingsConfigUseCase";
import SettingsTO from "src/Components/Core/Application/DataTransferObjects/SettingsTO";
import bind from "bind-decorator";

export default class CookieModalController implements ICookieModalController {
  private setSettingsConfigUseCase: ISetSettingsConfigUseCase;

  constructor(private viewModel: CookieModalViewModel) {
    this.setSettingsConfigUseCase =
      CoreDIContainer.get<ISetSettingsConfigUseCase>(
        USECASE_TYPES.ISetSettingsConfigUseCase,
      );
  }

  @bind
  accept(): void {
    const settings = new SettingsTO();
    settings.cookieConsent = "accepted";
    this.setSettingsConfigUseCase.execute(settings);
  }

  @bind
  decline(): void {
    const settings = new SettingsTO();
    settings.cookieConsent = "declined";
    this.setSettingsConfigUseCase.execute(settings);
  }
}
