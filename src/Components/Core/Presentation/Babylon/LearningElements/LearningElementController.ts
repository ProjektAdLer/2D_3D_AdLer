import bind from "bind-decorator";
import ILoadLearningElementUseCase from "../../../Application/UseCases/LoadLearningElement/ILoadLearningElementUseCase";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_TYPES";
import ILearningElementController from "./ILearningElementController";
import LearningElementViewModel from "./LearningElementViewModel";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import IBottomTooltipPresenter from "~ReactComponents/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import { LearningElementTypes } from "src/Components/Core/Domain/Types/LearningElementTypes";
import ILoadAdaptivityElementUseCase from "../../../Application/UseCases/Adaptivity/LoadAdaptivityElementUseCase/ILoadAdaptivityElementUseCase";
import { Vector3 } from "@babylonjs/core";

export default class LearningElementController
  implements ILearningElementController
{
  private bottomTooltipPresenter: IBottomTooltipPresenter;

  constructor(private viewModel: LearningElementViewModel) {
    this.bottomTooltipPresenter = CoreDIContainer.get<IBottomTooltipPresenter>(
      PRESENTATION_TYPES.IBottomTooltipPresenter
    );

    this.viewModel.isInteractable.subscribe(this.onAvatarInteractableChange);
  }

  @bind
  pointerOver(): void {
    this.displayTooltip();
    this.scaleUpIcon();
  }

  @bind
  pointerOut(): void {
    this.bottomTooltipPresenter.hide();
    this.resetIconScale();
  }

  @bind
  picked(): void {
    if (this.viewModel.isInteractable.Value) {
      if (this.viewModel.type === LearningElementTypes.adaptivity) {
        this.startLoadAdaptivityElementUseCase();
      } else {
        this.startLoadElementUseCase();
      }
    }
  }

  @bind
  private onAvatarInteractableChange(isInteractable: boolean): void {
    if (isInteractable) {
      this.displayTooltip();
      this.scaleUpIcon();
    } else {
      this.bottomTooltipPresenter.hide();
      this.resetIconScale();
    }
  }

  private displayTooltip(): void {
    this.bottomTooltipPresenter.display(
      this.viewModel.name,
      this.viewModel.type,
      this.viewModel.value,
      this.picked
    );
  }

  private startLoadElementUseCase() {
    CoreDIContainer.get<ILoadLearningElementUseCase>(
      USECASE_TYPES.ILoadLearningElementUseCase
    ).executeAsync({ elementID: this.viewModel.id, isScoreable: true });
  }

  private startLoadAdaptivityElementUseCase(): void {
    CoreDIContainer.get<ILoadAdaptivityElementUseCase>(
      USECASE_TYPES.ILoadAdaptivityElementUseCase
    ).executeAsync(this.viewModel.id);
  }

  private scaleUpIcon(): void {
    this.viewModel.iconMeshes?.forEach((mesh) => {
      mesh.scaling = new Vector3(
        this.viewModel.iconScaleUpOnHover,
        this.viewModel.iconScaleUpOnHover,
        this.viewModel.iconScaleUpOnHover
      );
    });
  }

  private resetIconScale(): void {
    this.viewModel.iconMeshes?.forEach((mesh) => {
      mesh.scaling = Vector3.One();
    });
  }
}
