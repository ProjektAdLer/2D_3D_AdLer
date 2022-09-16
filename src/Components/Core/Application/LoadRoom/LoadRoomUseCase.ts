import { inject, injectable } from "inversify";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import LearningWorldEntity from "../../Domain/Entities/LearningWorldEntity";
import type IEntityContainer from "../../Domain/EntityContainer/IEntityContainer";
import type ILearningRoomPort from "../../Ports/LearningRoomPort/ILearningRoomPort";
import type IUIPort from "../../Ports/UIPort/IUIPort";
import type ILoadWorldUseCase from "../LoadWorld/ILoadWorldUseCase";
import ILoadRoomUseCase from "./ILoadRoomUseCase";
import LearningRoomTO from "../DataTransportObjects/LearningRoomTO";
import { LearningComponentID } from "../../Domain/Types/EntityTypes";
import LearningRoomEntity from "../../Domain/Entities/LearningRoomEntity";

@injectable()
export default class LoadRoomUseCase implements ILoadRoomUseCase {
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(PORT_TYPES.IUIPort)
    private uiPort: IUIPort,
    @inject(USECASE_TYPES.ILoadWorldUseCase)
    private loadWorldUseCase: ILoadWorldUseCase,
    @inject(PORT_TYPES.ILearningRoomPort)
    private learningRoomPort: ILearningRoomPort
  ) {}

  async executeAsync(id: LearningComponentID): Promise<LearningRoomTO> {
    // try to get the world entity from the container, there should always be only one at most
    let worldEntity = this.container.getEntitiesOfType(LearningWorldEntity)[0];

    // if the world is not loaded yet, load it via the LoadWorldUseCase
    if (!worldEntity) {
      await this.loadWorldUseCase.executeAsync();

      worldEntity = this.container.getEntitiesOfType(LearningWorldEntity)[0];
    }

    // try to find the room with a matching id
    let roomEntity = worldEntity.learningRooms.find(
      (roomEntity) => roomEntity.id === id
    );

    if (!roomEntity)
      return Promise.reject("LearningRoomEntity with " + id + " not found");
    else {
      let roomTO = this.toTO(roomEntity);
      this.learningRoomPort.onRoomDataLoaded(roomTO);
      return Promise.resolve(roomTO);
    }
  }

  private toTO(roomEntity: LearningRoomEntity): LearningRoomTO {
    return structuredClone(roomEntity) as LearningRoomTO;
  }
}
