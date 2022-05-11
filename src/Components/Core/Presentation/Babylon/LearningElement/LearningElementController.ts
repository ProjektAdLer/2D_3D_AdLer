import { ActionEvent } from "@babylonjs/core";
import { inject, injectable } from "inversify";
import ILearningElementStartedUseCase from "../../../Application/LearningElementStarted/ILearningElementStartedUseCase";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_SYMBOLS";
import ILearningElementController from "./ILearningElementController";
import LearningElementViewModel from "./LearningElementViewModel";

@injectable()
export default class LearningElementController
  implements ILearningElementController
{
  clicked(event?: ActionEvent): void {
    const useCase = CoreDIContainer.get<ILearningElementStartedUseCase>(
      USECASE_TYPES.ILearningElementStartedUseCase
    );

    useCase.execute();
    throw new Error("Method not implemented.");
  }
}
