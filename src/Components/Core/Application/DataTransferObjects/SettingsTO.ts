export default class SettingsTO {
  volume?: number;
  graphicsQuality?: number;
  language?: string;
  highGraphicsQualityEnabled?: boolean;
  breakTimeNotificationsEnabled?: boolean;
  cookieConsent?: "accepted" | "declined";
}
