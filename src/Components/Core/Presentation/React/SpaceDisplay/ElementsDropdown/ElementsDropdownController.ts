import ILoadElementUseCase from "../../../../Application/UseCases/ElementStarted/ILoadElementUseCase";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../DependencyInjection/UseCases/USECASE_TYPES";
import { ComponentID } from "../../../../Domain/Types/EntityTypes";
import IElementsDropdownController from "./IElementsDropdownController";

export default class ElementsDropdownController
  implements IElementsDropdownController
{
  startElement(elementId: ComponentID): void {
    CoreDIContainer.get<ILoadElementUseCase>(
      USECASE_TYPES.ILoadElementUseCase
    ).executeAsync(elementId);
  }
}
