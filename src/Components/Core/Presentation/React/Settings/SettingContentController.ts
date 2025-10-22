import ISetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/SetSettingsConfig/ISetSettingsConfigUseCase";
import ISettingContentController from "./ISettingContentController";
import SettingContentViewModel from "./SettingContentViewModel";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import i18next from "i18next";
const soundLink = require("../../../../../Assets/Sounds/fanfare.mp3");

export default class SettingContentController
  implements ISettingContentController
{
  private setSettingsConfigUseCase: ISetSettingsConfigUseCase;

  private audio = new Audio(soundLink);
  constructor(private viewModel: SettingContentViewModel) {
    this.setSettingsConfigUseCase = CoreDIContainer.get(
      USECASE_TYPES.ISetSettingsConfigUseCase,
    );
  }

  onVolumeChange(newVolume: number): void {
    this.viewModel.changedSettings = true;
    this.viewModel.volume.Value = newVolume;
    this.setSettingsConfigUseCase.execute({
      volume: newVolume,
    });
  }

  onGraphicsQualityChange(newGraphicQuality: number): void {
    this.viewModel.changedSettings = true;
    this.viewModel.graphicsQuality.Value = newGraphicQuality;
    this.setSettingsConfigUseCase.execute({
      graphicsQuality: newGraphicQuality,
    });
  }

  onGermanButtonClicked(): void {
    this.viewModel.changedSettings = true;
    this.viewModel.language.Value = "de";
    this.setSettingsConfigUseCase.execute({
      language: "de",
    });
    i18next.changeLanguage("de");
  }
  onEnglishButtonClicked(): void {
    this.viewModel.changedSettings = true;
    this.viewModel.language.Value = "en";
    this.setSettingsConfigUseCase.execute({
      language: "en",
    });
    i18next.changeLanguage("en");
  }
  onGraphicsQualityButtonClicked(): void {
    this.viewModel.changedSettings = true;
    this.viewModel.highGraphicsQualityEnabled.Value =
      !this.viewModel.highGraphicsQualityEnabled.Value;
    this.setSettingsConfigUseCase.execute({
      highGraphicsQualityEnabled:
        this.viewModel.highGraphicsQualityEnabled.Value,
    });
  }

  onBreakTimeNotificationsButtonClicked(): void {
    this.viewModel.changedSettings = true;
    this.viewModel.breakTimeNotificationsEnabled.Value =
      !this.viewModel.breakTimeNotificationsEnabled.Value;
    this.setSettingsConfigUseCase.execute({
      breakTimeNotificationsEnabled:
        this.viewModel.breakTimeNotificationsEnabled.Value,
    });
  }

  onTestSoundButtonClicked(): void {
    this.audio.volume = this.viewModel.volume.Value;
    this.audio.play();
  }
}
