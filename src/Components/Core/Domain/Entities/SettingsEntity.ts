export default class SettingsEntity {
  volume: number | undefined;
  graphicsQuality: number | undefined;
  language: string | undefined;
  highGraphicsQualityEnabled: boolean | undefined;
  breakTimeNotificationsEnabled: boolean | undefined;
  cookieConsent: "accepted" | "declined" | undefined;
}
