import { inject } from "inversify";
import ICookieModalController from "./ICookieModalController";
import type ISetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/SetSettingsConfig/ISetSettingsConfigUseCase";
import type IGetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/GetSettingsConfig/IGetSettingsConfigUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

export default class CookieModalController implements ICookieModalController {
  private setSettingsConfigUseCase: ISetSettingsConfigUseCase;
  private getSettingsConfigUseCase: IGetSettingsConfigUseCase;

  constructor(
    @inject(USECASE_TYPES.ISetSettingsConfigUseCase)
    setSettingsConfigUseCase: ISetSettingsConfigUseCase,
    @inject(USECASE_TYPES.IGetSettingsConfigUseCase)
    getSettingsConfigUseCase: IGetSettingsConfigUseCase,
  ) {
    this.setSettingsConfigUseCase = setSettingsConfigUseCase;
    this.getSettingsConfigUseCase = getSettingsConfigUseCase;
  }

  accept(): void {
    this.setSettingsConfigUseCase.execute({ cookieConsent: "accepted" });
  }

  decline(): void {
    this.setSettingsConfigUseCase.execute({ cookieConsent: "declined" });
  }
}
