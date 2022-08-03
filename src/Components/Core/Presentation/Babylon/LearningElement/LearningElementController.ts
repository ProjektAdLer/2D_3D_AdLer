import bind from "bind-decorator";
import ILearningElementStartedUseCase from "../../../Application/LearningElementStarted/ILearningElementStartedUseCase";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_TYPES";
import IUIPort from "../../../Ports/UIPort/IUIPort";
import ILearningElementController from "./ILearningElementController";
import LearningElementViewModel from "./LearningElementViewModel";

export default class LearningElementController
  implements ILearningElementController
{
  constructor(private viewModel: LearningElementViewModel) {}

  @bind
  pointerOver(): void {
    CoreDIContainer.get<IUIPort>(
      PORT_TYPES.IUIPort
    ).displayLearningElementTooltip({
      name: this.viewModel.name.Value,
      learningElementData: this.viewModel.learningElementData.Value,
      id: this.viewModel.id,
    });
  }

  @bind
  pointerOut(): void {
    CoreDIContainer.get<IUIPort>(PORT_TYPES.IUIPort).hideBottomTooltip();
  }

  @bind
  clicked(): void {
    CoreDIContainer.get<ILearningElementStartedUseCase>(
      USECASE_TYPES.ILearningElementStartedUseCase
    ).execute({
      learningElementId: this.viewModel.id,
    });
  }
}
