import ISetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/SetSettingsConfig/ISetSettingsConfigUseCase";
import ISettingContentController from "./ISettingContentController";
import SettingContentViewModel from "./SettingContentViewModel";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

export default class SettingContentController
  implements ISettingContentController
{
  private setSettingsConfigUseCase: ISetSettingsConfigUseCase;
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
  onGermanButtonClicked(): void {
    this.viewModel.changedSettings = true;
    this.viewModel.language.Value = "de";
    this.setSettingsConfigUseCase.execute({
      language: "de",
    });
  }
  onEnglishButtonClicked(): void {
    this.viewModel.changedSettings = true;
    this.viewModel.language.Value = "en";
    this.setSettingsConfigUseCase.execute({
      language: "en",
    });
  }
  onGraphicsQualityChange(newQuality: string): void {
    this.viewModel.changedSettings = true;
    this.viewModel.graphicsQuality.Value = newQuality;
    this.setSettingsConfigUseCase.execute({
      graphicsQuality: newQuality,
    });
  }
}
