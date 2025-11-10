import { inject } from "inversify";
import ICookieModalController from "./ICookieModalController";
import type ISetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/SetSettingsConfig/ISetSettingsConfigUseCase";
import type IGetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/GetSettingsConfig/IGetSettingsConfigUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

export default class CookieModalController implements ICookieModalController {
  private static readonly CONSENT_KEY = "adler_cookie_consent";
  private static readonly CONSENT_TIMESTAMP_KEY =
    "adler_cookie_consent_timestamp";

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

  public static getConsent(): string | null {
    return localStorage.getItem(CookieModalController.CONSENT_KEY);
  }

  public static hasConsent(): boolean {
    const consent = this.getConsent();
    return consent === "accepted";
  }

  public static hasDeclined(): boolean {
    const consent = this.getConsent();
    return consent === "declined";
  }

  public static resetConsent(): void {
    localStorage.removeItem(CookieModalController.CONSENT_KEY);
    localStorage.removeItem(CookieModalController.CONSENT_TIMESTAMP_KEY);
  }
}
