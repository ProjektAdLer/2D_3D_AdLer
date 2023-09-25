import bind from "bind-decorator";
import ILoadLearningElementUseCase from "../../../Application/UseCases/LoadLearningElement/ILoadLearningElementUseCase";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_TYPES";
import ILearningElementController from "./ILearningElementController";
import LearningElementViewModel from "./LearningElementViewModel";
import { ActionEvent } from "@babylonjs/core/Actions/actionEvent";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import IBottomTooltipPresenter from "~ReactComponents/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import { LearningElementTypes } from "src/Components/Core/Domain/Types/LearningElementTypes";
import ILoadAdaptivityElementUseCase from "../../../Application/UseCases/Adaptivity/LoadAdaptivityElementUseCase/ILoadAdaptivityElementUseCase";

export default class LearningElementController
  implements ILearningElementController
{
  constructor(private viewModel: LearningElementViewModel) {}

  @bind
  pointerOver(): void {
    this.displayTooltip();
    this.viewModel.iconMeshes?.forEach((mesh) => {
      mesh.scaling.scaleInPlace(this.viewModel.iconScaleUpOnHover);
    });
  }

  @bind
  pointerOut(): void {
    CoreDIContainer.get<IBottomTooltipPresenter>(
      PRESENTATION_TYPES.IBottomTooltipPresenter
    ).hide();
    this.viewModel.iconMeshes?.forEach((mesh) => {
      mesh.scaling.scaleInPlace(1 / this.viewModel.iconScaleUpOnHover);
    });
  }

  @bind
  picked(event?: ActionEvent | undefined): void {
    if (this.viewModel.type === LearningElementTypes.adaptivity) {
      this.startLoadAdaptivityElementUseCase();
    } else {
      this.startLoadElementUseCase();
    }
  }

  @bind
  doublePicked(event?: ActionEvent): void {
    this.displayTooltip();
  }

  private displayTooltip(): void {
    CoreDIContainer.get<IBottomTooltipPresenter>(
      PRESENTATION_TYPES.IBottomTooltipPresenter
    ).displayLearningElementSummaryTooltip({
      name: this.viewModel.name,
      type: this.viewModel.type,
      points: this.viewModel.value,
    });
  }

  private startLoadElementUseCase() {
    CoreDIContainer.get<ILoadLearningElementUseCase>(
      USECASE_TYPES.ILoadLearningElementUseCase
    ).executeAsync(this.viewModel.id);
  }

  private startLoadAdaptivityElementUseCase(): void {
    CoreDIContainer.get<ILoadAdaptivityElementUseCase>(
      USECASE_TYPES.ILoadAdaptivityElementUseCase
    ).executeAsync(this.viewModel.id);
  }
}
