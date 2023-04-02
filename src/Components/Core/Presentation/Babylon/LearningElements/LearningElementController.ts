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
  }

  @bind
  pointerOut(): void {
    CoreDIContainer.get<IBottomTooltipPresenter>(
      PRESENTATION_TYPES.IBottomTooltipPresenter
    ).hide();
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
      name: this.viewModel.name.Value,
      type: this.viewModel.type.Value,
      id: this.viewModel.id,
      description: this.viewModel.description.Value,
      goals: this.viewModel.goals.Value,
      value: this.viewModel.value.Value,
      parentSpaceID: 0,
      parentWorldID: 0,
      hasScored: false,
    });
  }
}
