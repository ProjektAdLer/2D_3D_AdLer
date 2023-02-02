import type ICalculateSpaceScoreUseCase from "src/Components/Core/Application/UseCases/CalculateSpaceScore/ICalculateSpaceScoreUseCase";
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
import SpaceTO from "../../DataTransferObjects/SpaceTO";
import { ElementID } from "../../../Domain/Types/EntityTypes";
import SpaceEntity from "../../../Domain/Entities/SpaceEntity";
import ElementTO from "../../DataTransferObjects/ElementTO";

@injectable()
export default class LoadSpaceUseCase implements ILoadSpaceUseCase {
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(USECASE_TYPES.ILoadWorldUseCase)
    private loadWorldUseCase: ILoadWorldUseCase,
    @inject(PORT_TYPES.ISpacePort)
    private spacePort: ISpacePort,
    @inject(USECASE_TYPES.ICalculateSpaceScore)
    private calculateSpaceScore: ICalculateSpaceScoreUseCase
  ) {}

  async executeAsync(id: ElementID): Promise<void> {
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

    // create SpaceTO and fill with scoring data
    let spaceTO = this.toTO(spaceEntity);
    const spaceScoreTO = this.calculateSpaceScore.execute(spaceTO.id);
    spaceTO.currentScore = spaceScoreTO.currentScore;
    spaceTO.maxScore = spaceScoreTO.maxScore;

    this.spacePort.onSpaceLoaded(spaceTO);
  }

  private toTO(spaceEntity: SpaceEntity): SpaceTO {
    let spaceTO = new SpaceTO();
    spaceTO = Object.assign(spaceTO, structuredClone(spaceEntity));
    return spaceTO;
  }
}
