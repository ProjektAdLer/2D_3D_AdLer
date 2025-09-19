export default interface ISettingContentController {
  onVolumeChange(newVolume: number): void;
  onGermanButtonClicked(): void;
  onEnglishButtonClicked(): void;
  onGraphicsQualityChange(newQuality: string): void;
}
