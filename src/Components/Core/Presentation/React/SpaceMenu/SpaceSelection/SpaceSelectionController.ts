import ILoadSpaceUseCase from "src/Components/Core/Application/LoadSpace/ILoadSpaceUseCase";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import ISpaceSelectionController from "./ISpaceSelectionController";

export default class SpaceSelectionController
  implements ISpaceSelectionController
{
  private loadSpaceUseCase: ILoadSpaceUseCase;

  constructor() {
    this.loadSpaceUseCase = CoreDIContainer.get(
      USECASE_TYPES.ILoadSpaceUseCase
    );
  }

  onSpaceRowClicked(spaceId: number): void {
    this.loadSpaceUseCase.executeAsync(spaceId);
  }
}
