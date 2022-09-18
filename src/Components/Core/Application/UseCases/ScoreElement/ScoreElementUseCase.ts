import { ElementID } from "../../../Domain/Types/EntityTypes";
import { inject, injectable } from "inversify";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_TYPES";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import IScoreElementUseCase from "./IScoreElementUseCase";
import type IBackendAdapter from "../../../Adapters/BackendAdapter/IBackendAdapter";
import type ICalculateSpaceScoreUseCase from "../CalculateSpaceScore/ICalculateSpaceScoreUseCase";
import ElementEntity from "../../../Domain/Entities/ElementEntity";
import SpaceEntity from "../../../Domain/Entities/SpaceEntity";

@injectable()
export default class ScoreElementUseCase implements IScoreElementUseCase {
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(CORE_TYPES.IBackendAdapter)
    private backendAdapter: IBackendAdapter,
    @inject(USECASE_TYPES.ICalculateSpaceScore)
    private calculateSpaceScoreUseCase: ICalculateSpaceScoreUseCase
  ) {}

  async executeAsync(data?: { elementId: ElementID }): Promise<void> {
    if (!data || !data.elementId) {
      throw new Error("data is undefined");
    }
    let elements = this.entityContainer.filterEntitiesOfType<ElementEntity>(
      ElementEntity,
      (entity) => {
        return entity.id === data.elementId;
      }
    );
    if (elements.length === 0)
      throw new Error(`Could not find element with id ${data?.elementId}`);
    else if (elements.length > 1)
      throw new Error(`Found more than one element with id ${data?.elementId}`);

    try {
      await this.backendAdapter.scoreElement(elements[0].id);
    } catch {
      throw new Error("Could not score element via Backend");
    }

    elements[0].hasScored = true;

    const space = this.entityContainer.filterEntitiesOfType<SpaceEntity>(
      SpaceEntity,
      (space) => space?.elements?.includes(elements[0])
    )[0];

    if (!space)
      throw new Error(`Could not find space with element ${data?.elementId}`);

    this.calculateSpaceScoreUseCase.execute({
      spaceId: space.id,
    });

    return Promise.resolve();
  }
}
