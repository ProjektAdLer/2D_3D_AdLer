import bind from "bind-decorator";
import IElementStartedUseCase from "../../../Application/UseCases/ElementStarted/ILoadElementUseCase";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_TYPES";
import IUIPort from "../../../Ports/UIPort/IUIPort";
import IElementController from "./IElementController";
import ElementViewModel from "./ElementViewModel";
import { ActionEvent } from "@babylonjs/core/Actions/actionEvent";

export default class ElementController implements IElementController {
  constructor(private viewModel: ElementViewModel) {}

  @bind
  pointerOver(): void {
    this.displayTooltip();
  }

  @bind
  pointerOut(): void {
    CoreDIContainer.get<IUIPort>(PORT_TYPES.IUIPort).hideBottomTooltip();
  }

  @bind
  clicked(event?: ActionEvent | undefined): void {
    const pointerType = (event?.sourceEvent as PointerEvent).pointerType;
    if (pointerType === "mouse") {
      CoreDIContainer.get<IElementStartedUseCase>(
        USECASE_TYPES.ILoadElementUseCase
      ).executeAsync(this.viewModel.id);
    } else if (pointerType === "touch") {
      this.displayTooltip();
    }
  }

  private displayTooltip(): void {
    CoreDIContainer.get<IUIPort>(
      PORT_TYPES.IUIPort
    ).displayElementSummaryTooltip({
      name: this.viewModel.name.Value,
      type: this.viewModel.type.Value,
      id: this.viewModel.id,
      description: this.viewModel.description.Value,
      goals: this.viewModel.goals.Value,
      value: this.viewModel.value.Value,
      parentSpaceId: 0,
      parentCourseId: 0,
      hasScored: false,
    });
  }
}
