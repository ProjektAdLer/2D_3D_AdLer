import bind from "bind-decorator";
import ILoadLearningElementUseCase from "../../../Application/UseCases/LoadLearningElement/ILoadLearningElementUseCase";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_TYPES";
import ILearningElementController from "./ILearningElementController";
import LearningElementViewModel from "./LearningElementViewModel";
import { ActionEvent } from "@babylonjs/core/Actions/actionEvent";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import IBottomTooltipPresenter from "~ReactComponents/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";

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
  clicked(event?: ActionEvent | undefined): void {
    const pointerType = (event?.sourceEvent as PointerEvent).pointerType;
    if (pointerType === "mouse") {
      CoreDIContainer.get<ILoadLearningElementUseCase>(
        USECASE_TYPES.ILoadLearningElementUseCase
      ).executeAsync(this.viewModel.id);
    } else if (pointerType === "touch") {
      this.displayTooltip();
    }
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
}
