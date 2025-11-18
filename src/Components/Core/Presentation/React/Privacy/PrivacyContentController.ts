import IPrivacyContentController from "./IPrivacyContentController";
import PrivacyContentViewModel from "./PrivacyContentViewModel";
import CoreDIContainer from "src/Components/Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type ISetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/SetSettingsConfig/ISetSettingsConfigUseCase";
import SettingsTO from "src/Components/Core/Application/DataTransferObjects/SettingsTO";
import bind from "bind-decorator";

export default class PrivacyContentController
  implements IPrivacyContentController
{
  private setSettingsConfigUseCase: ISetSettingsConfigUseCase;

  constructor(private viewModel: PrivacyContentViewModel) {
    this.setSettingsConfigUseCase =
      CoreDIContainer.get<ISetSettingsConfigUseCase>(
        USECASE_TYPES.ISetSettingsConfigUseCase,
      );
  }

  @bind
  setCookieConsent(accepted: boolean): void {
    const settings = new SettingsTO();
    settings.cookieConsent = accepted ? "accepted" : "declined";
    this.setSettingsConfigUseCase.execute(settings);
  }
}
