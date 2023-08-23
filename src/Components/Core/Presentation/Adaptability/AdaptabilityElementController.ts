import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IAdaptabilityElementController from "./IAdaptabilityElementController";
import ILoadQuizElementUseCase from "../../Application/UseCases/Adaptability/LoadQuizElementUseCase/ILoadQuizElementUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import UseCaseDIContainer from "~DependencyInjection/UseCases/UseCaseDIConatiner";
import IUpdateQuizElementUseCase from "../../Application/UseCases/Adaptability/UpdateQuizElementUseCase/IUpdateQuizElementUseCase";

export default class AdaptabilityElementController
  implements IAdaptabilityElementController
{
  constructor() {}

  loadAdaptivityElement(filePath: string): void {
    CoreDIContainer.get<ILoadQuizElementUseCase>(
      USECASE_TYPES.ILoadQuizElementUseCase
    ).executeAsync(filePath);
  }

  updateAdaptabilityElementDisplay(): void {
    CoreDIContainer.get<IUpdateQuizElementUseCase>(
      USECASE_TYPES.IUpdateQuizElementUseCase
    ).executeAsync();
  }
}
