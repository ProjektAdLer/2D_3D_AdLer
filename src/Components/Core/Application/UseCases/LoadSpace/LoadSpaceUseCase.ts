import { inject, injectable } from "inversify";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import WorldEntity from "../../../Domain/Entities/WorldEntity";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import type ISpacePort from "../../../Ports/SpacePort/ISpacePort";
import type IUIPort from "../../../Ports/UIPort/IUIPort";
import type ILoadWorldUseCase from "../LoadWorld/ILoadWorldUseCase";
import ILoadSpaceUseCase from "./ILoadSpaceUseCase";
import SpaceTO from "../../DataTransportObjects/SpaceTO";
import { ElementID } from "../../../Domain/Types/EntityTypes";
import SpaceEntity from "../../../Domain/Entities/SpaceEntity";

@injectable()
export default class LoadSpaceUseCase implements ILoadSpaceUseCase {
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(PORT_TYPES.IUIPort)
    private uiPort: IUIPort,
    @inject(USECASE_TYPES.ILoadWorldUseCase)
    private loadWorldUseCase: ILoadWorldUseCase,
    @inject(PORT_TYPES.ISpacePort)
    private spacePort: ISpacePort
  ) {}

  async executeAsync(id: ElementID): Promise<SpaceTO> {
    // try to get the world entity from the container, there should always be only one at most
    let worldEntity = this.container.getEntitiesOfType(WorldEntity)[0];

    // if the world is not loaded yet, load it via the LoadWorldUseCase
    if (!worldEntity) {
      await this.loadWorldUseCase.executeAsync();

      worldEntity = this.container.getEntitiesOfType(WorldEntity)[0];
    }

    // try to find the room with a matching id
    let spaceEntity = worldEntity.spaces.find(
      (spaceEntity) => spaceEntity.id === id
    );

    if (!spaceEntity)
      return Promise.reject("SpaceEntity with " + id + " not found");
    else {
      let spaceTO = this.toTO(spaceEntity);
      this.spacePort.onSpaceDataLoaded(spaceTO);
      return Promise.resolve(spaceTO);
    }
  }

  private toTO(spaceEntity: SpaceEntity): SpaceTO {
    return structuredClone(spaceEntity) as SpaceTO;
  }
}
