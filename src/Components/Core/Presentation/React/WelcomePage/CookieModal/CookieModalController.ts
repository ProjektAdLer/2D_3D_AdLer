import ICookieModalController from "./ICookieModalController";

export default class CookieModalController implements ICookieModalController {
  private static readonly CONSENT_KEY = "adler_cookie_consent";
  private static readonly CONSENT_TIMESTAMP_KEY =
    "adler_cookie_consent_timestamp";

  accept(): void {
    localStorage.setItem(CookieModalController.CONSENT_KEY, "accepted");
    localStorage.setItem(
      CookieModalController.CONSENT_TIMESTAMP_KEY,
      Date.now().toString(),
    );
    console.log("Cookies accepted and saved to localStorage.");
  }

  decline(): void {
    localStorage.setItem(CookieModalController.CONSENT_KEY, "declined");
    localStorage.setItem(
      CookieModalController.CONSENT_TIMESTAMP_KEY,
      Date.now().toString(),
    );
    console.log("Cookies declined and saved to localStorage.");
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
