import ILearningElementStartedUseCase from "../../../../Application/LearningElementStarted/ILearningElementStartedUseCase";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../DependencyInjection/UseCases/USECASE_TYPES";
import { LearningComponentID } from "../../../../Domain/Types/EntityTypes";
import ILearningElementsDropdownController from "./ILearningElementsDropdownController";

export default class LearningElementsDropdownController
  implements ILearningElementsDropdownController
{
  startLearningElement(learningElementId: LearningComponentID): void {
    CoreDIContainer.get<ILearningElementStartedUseCase>(
      USECASE_TYPES.ILearningElementStartedUseCase
    ).execute({
      learningElementId: learningElementId,
    });
  }
}
