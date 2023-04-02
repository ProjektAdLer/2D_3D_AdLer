import ILoadLearningElementUseCase from "../../../../Application/UseCases/LoadLearningElement/ILoadLearningElementUseCase";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../DependencyInjection/UseCases/USECASE_TYPES";
import { ComponentID } from "../../../../Domain/Types/EntityTypes";
import ILearningElementsDropdownController from "./ILearningElementsDropdownController";

export default class LearningElementsDropdownController
  implements ILearningElementsDropdownController
{
  startLearningElement(elementID: ComponentID): void {
    CoreDIContainer.get<ILoadLearningElementUseCase>(
      USECASE_TYPES.ILoadLearningElementUseCase
    ).executeAsync(elementID);
  }
}
