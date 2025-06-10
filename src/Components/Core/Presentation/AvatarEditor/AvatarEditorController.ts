import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import AvatarConfigTO from "../../Application/DataTransferObjects/AvatarConfigTO";
import IAvatarEditorController from "./IAvatarEditorController";
import IUpdateAvatarConfigUseCase from "../../Application/UseCases/UpdateAvatarConfig/IUpdateAvatarConfigUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import ISaveAvatarConfigUseCase from "../../Application/UseCases/SaveAvatarConfig/ISaveAvatarConfigUseCase";
import ILoadAvatarConfigUseCase from "../../Application/UseCases/LoadAvatarConfig/ILoadAvatarConfigUseCase";
import AvatarEditorViewModel from "./AvatarEditorViewModel";
import IRandomizeAvatarConfigUseCase from "../../Application/UseCases/RandomizeAvatarConfig/IRandomizeAvatarConfigUseCase";

export default class AvatarEditorController implements IAvatarEditorController {
  constructor(private viewModel: AvatarEditorViewModel) {}

  onAvatarConfigChanged(changes: Partial<AvatarConfigTO>): void {
    CoreDIContainer.get<IUpdateAvatarConfigUseCase>(
      USECASE_TYPES.IUpdateAvatarConfigUseCase,
    ).executeAsync(changes);
    this.viewModel.hasChanged.Value = true;
  }

  saveAvatarConfig(): void {
    CoreDIContainer.get<ISaveAvatarConfigUseCase>(
      USECASE_TYPES.ISaveAvatarConfigUseCase,
    ).executeAsync();
    this.viewModel.hasChanged.Value = false;
  }

  resetAvatarConfig(): void {
    CoreDIContainer.get<ILoadAvatarConfigUseCase>(
      USECASE_TYPES.ILoadAvatarConfigUseCase,
    ).executeAsync();
    this.viewModel.hasChanged.Value = true;
  }

  public async randomizeAvatarConfig(): Promise<void> {
    const newConfig = await CoreDIContainer.get<IRandomizeAvatarConfigUseCase>(
      USECASE_TYPES.IRandomizeAvatarConfigUseCase,
    ).executeAsync();

    await CoreDIContainer.get<IUpdateAvatarConfigUseCase>(
      USECASE_TYPES.IUpdateAvatarConfigUseCase,
    ).executeAsync(newConfig);

    this.viewModel.hasChanged.Value = true;
  }
}
