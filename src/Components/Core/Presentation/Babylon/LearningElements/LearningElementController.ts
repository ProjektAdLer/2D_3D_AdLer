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
  private proximityToolTipId: number = -1;
  private hoverToolTipId: number = -1;

  constructor(private viewModel: LearningElementViewModel) {
    this.bottomTooltipPresenter = CoreDIContainer.get<IBottomTooltipPresenter>(
      PRESENTATION_TYPES.IBottomTooltipPresenter,
    );

    this.viewModel.isInteractable.subscribe(this.onAvatarInteractableChange);
  }

  @bind
  pointerOver(): void {
    if (this.proximityToolTipId === -1 && this.hoverToolTipId === -1) {
      this.hoverToolTipId = this.displayTooltip();
      this.scaleUpIcon();
    }
  }

  @bind
  pointerOut(): void {
    if (this.hoverToolTipId !== -1) {
      this.resetIconScale();
      this.bottomTooltipPresenter.hide(this.hoverToolTipId);
      this.hoverToolTipId = -1;
    }
  }


  @bind
  picked(overrideIsInteractable?: boolean): void {
    if (this.viewModel.isInteractable.Value || overrideIsInteractable) {
      this.bottomTooltipPresenter.hideAll();
      if (this.viewModel.type === LearningElementTypes.adaptivity) {
        this.startLoadAdaptivityElementUseCase();
      } else {
        this.startLoadElementUseCase();
      }
    }
  }

  @bind
  private onAvatarInteractableChange(isInteractable: boolean): void {
    if (isInteractable && this.proximityToolTipId === -1) {
      this.proximityToolTipId = this.displayTooltip();
      this.scaleUpIcon();
    } else if (!isInteractable && this.proximityToolTipId !== -1) {
      this.bottomTooltipPresenter.hide(this.proximityToolTipId);
      this.resetIconScale();
      this.proximityToolTipId = -1;
    }
  }

  private displayTooltip(): number {
    return this.bottomTooltipPresenter.display(
      this.viewModel.name,
      this.viewModel.type,
      this.viewModel.value,
      this.viewModel.hasScored,
      this.picked,
    );
  }

  private startLoadElementUseCase() {
    CoreDIContainer.get<ILoadLearningElementUseCase>(
      USECASE_TYPES.ILoadLearningElementUseCase,
    ).executeAsync({ elementID: this.viewModel.id, isScoreable: true });
  }

  private startLoadAdaptivityElementUseCase(): void {
    CoreDIContainer.get<ILoadAdaptivityElementUseCase>(
      USECASE_TYPES.ILoadAdaptivityElementUseCase,
    ).executeAsync(this.viewModel.id);
  }

  private scaleUpIcon(): void {
    this.viewModel.iconMeshes?.forEach((mesh) => {
      mesh.scaling = new Vector3(
        this.viewModel.iconScaleUpOnHover,
        this.viewModel.iconScaleUpOnHover,
        this.viewModel.iconScaleUpOnHover,
      );
    });
  }

  private resetIconScale(): void {
    this.viewModel.iconMeshes?.forEach((mesh) => {
      mesh.scaling = Vector3.One();
    });
  }
}
