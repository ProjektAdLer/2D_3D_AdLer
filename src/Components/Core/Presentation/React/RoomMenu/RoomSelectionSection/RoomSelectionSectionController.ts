import ILoadRoomUseCase from "src/Components/Core/Application/LoadRoom/ILoadRoomUseCase";
import { logger } from "src/Lib/Logger";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import IRoomSelectionSectionController from "./IRoomSelectionSectionController";

export default class RoomSelectionSectionController
  implements IRoomSelectionSectionController
{
  private loadRoomUseCase: ILoadRoomUseCase;

  constructor() {
    this.loadRoomUseCase = CoreDIContainer.get(USECASE_TYPES.ILoadRoomUseCase);
  }

  onRoomRowClicked(learningRoomId: number): void {
    this.loadRoomUseCase.executeAsync(learningRoomId);
  }
}
