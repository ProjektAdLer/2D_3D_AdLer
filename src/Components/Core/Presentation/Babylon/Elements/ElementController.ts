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
      elementData: this.viewModel.elementData.Value,
      parentCourseId: 1,
      id: this.viewModel.id,
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
    ).execute({
      elementId: this.viewModel.id,
    });
  }
}
