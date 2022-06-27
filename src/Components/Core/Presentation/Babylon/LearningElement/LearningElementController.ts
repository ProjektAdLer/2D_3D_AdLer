import { ActionEvent } from "@babylonjs/core";
import bind from "bind-decorator";
import ILearningElementStartedUseCase from "../../../Application/LearningElementStarted/ILearningElementStartedUseCase";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_SYMBOLS";
import IUIPort from "../../../Ports/UIPort/IUIPort";
import ILearningElementController from "./ILearningElementController";
import LearningElementViewModel from "./LearningElementViewModel";

export default class LearningElementController
  implements ILearningElementController
{
  constructor(private viewModel: LearningElementViewModel) {}
  @bind
  pointerOver(event?: ActionEvent | undefined): void {
    const port = CoreDIContainer.get<IUIPort>(PORT_TYPES.IUIPort);

    port.displayLearningElementTooltip({
      name: this.viewModel.name.Value,
      learningElementData: this.viewModel.learningElementData.Value,
      id: this.viewModel.id,
    });
  }
  @bind
  pointerOut(event?: ActionEvent | undefined): void {
    CoreDIContainer.get<IUIPort>(PORT_TYPES.IUIPort).hide();
  }

  clicked = (event?: ActionEvent): void => {
    const useCase = CoreDIContainer.get<ILearningElementStartedUseCase>(
      USECASE_TYPES.ILearningElementStartedUseCase
    );

    useCase.execute({
      learningElementId: this.viewModel.id,
    });
  };
}
