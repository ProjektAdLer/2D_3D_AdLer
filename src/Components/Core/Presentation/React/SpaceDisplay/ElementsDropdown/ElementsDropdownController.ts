import IElementStartedUseCase from "../../../../Application/ElementStarted/IElementStartedUseCase";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../DependencyInjection/UseCases/USECASE_TYPES";
import { ElementID } from "../../../../Domain/Types/EntityTypes";
import IElementsDropdownController from "./IElementsDropdownController";

export default class ElementsDropdownController
  implements IElementsDropdownController
{
  startElement(elementId: ElementID): void {
    CoreDIContainer.get<IElementStartedUseCase>(
      USECASE_TYPES.IElementStartedUseCase
    ).execute({
      elementId: elementId,
    });
  }
}
