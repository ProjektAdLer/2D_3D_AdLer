import ILoadElementUseCase from "../../../../Application/UseCases/LoadElement/ILoadElementUseCase";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../DependencyInjection/UseCases/USECASE_TYPES";
import { ComponentID } from "../../../../Domain/Types/EntityTypes";
import IElementsDropdownController from "./IElementsDropdownController";

export default class ElementsDropdownController
  implements IElementsDropdownController
{
  startElement(elementID: ComponentID): void {
    CoreDIContainer.get<ILoadElementUseCase>(
      USECASE_TYPES.ILoadElementUseCase
    ).executeAsync(elementID);
  }
}
