import CookieModalController from "./CookieModalController";

/**
 * Helper class to check cookie consent status throughout the application.
 * Use this when you need to conditionally load external content (like H5P) based on user consent.
 */
export default class CookieConsentHelper {
  /**
   * Returns true if the user has accepted cookies.
   * Use this to determine if external content like H5P can be loaded.
   */
  static hasUserAcceptedCookies(): boolean {
    return CookieModalController.hasConsent();
  }

  /**
   * Returns true if the user has declined cookies.
   */
  static hasUserDeclinedCookies(): boolean {
    return CookieModalController.hasDeclined();
  }

  /**
   * Returns true if the user has made any decision (accept or decline).
   */
  static hasUserMadeDecision(): boolean {
    return CookieModalController.getConsent() !== null;
  }

  /**
   * Resets the user's cookie consent decision.
   * The cookie banner will be shown again on next page load.
   */
  static resetUserDecision(): void {
    CookieModalController.resetConsent();
  }
}
