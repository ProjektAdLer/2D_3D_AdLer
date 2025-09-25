export default interface ISettingContentController {
  onVolumeChange(newVolume: number): void;
  onGermanButtonClicked(): void;
  onEnglishButtonClicked(): void;
  onGraphicsQualityButtonClicked(): void;
  onBreakTimeNotificationsButtonClicked(): void;
}
