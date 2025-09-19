export default interface ISettingContentController {
  onVolumeChange(newVolume: number): void;
  onLanguageChange(newLanguage: string): void;
  onGraphicsQualityChange(newQuality: string): void;
}
