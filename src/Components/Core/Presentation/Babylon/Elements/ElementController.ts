import bind from "bind-decorator";
import IElementStartedUseCase from "../../../Application/UseCases/ElementStarted/IElementStartedUseCase";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_TYPES";
import IUIPort from "../../../Ports/UIPort/IUIPort";
import IElementController from "./IElementController";
import ElementViewModel from "./ElementViewModel";

export default class ElementController implements IElementController {
  constructor(private viewModel: ElementViewModel) {}

  @bind
  pointerOver(): void {
    CoreDIContainer.get<IUIPort>(PORT_TYPES.IUIPort).displayElementTooltip({
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

  @bind
  pointerOut(): void {
    CoreDIContainer.get<IUIPort>(PORT_TYPES.IUIPort).hideBottomTooltip();
  }

  @bind
  clicked(): void {
    CoreDIContainer.get<IElementStartedUseCase>(
      USECASE_TYPES.IElementStartedUseCase
    ).executeAsync(this.viewModel.id);
  }
}
