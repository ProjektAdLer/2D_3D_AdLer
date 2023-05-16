import { inject, injectable } from "inversify";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";
import IGetLearningSpacePrecursorAndSuccessorUseCase from "./IGetLearningSpacePrecursorAndSuccessorUseCase";
import LearningWorldEntity from "src/Components/Core/Domain/Entities/LearningWorldEntity";
import LearningSpaceAvailabilityStringParser from "src/Components/Core/Application/UseCases/CalculateLearningSpaceAvailability/Parser/LearningSpaceAvailabilityStringParser";
import LearningSpacePrecursorAndSuccessorTO from "../../DataTransferObjects/LearningSpacePrecursorAndSuccessorTO";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

@injectable()
export default class GetLearningSpacePrecursorAndSuccessorUseCase
  implements IGetLearningSpacePrecursorAndSuccessorUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase
  ) {}

  execute(): LearningSpacePrecursorAndSuccessorTO {
    const userLocation = this.getUserLocationUseCase.execute();
    if (!userLocation.worldID || !userLocation.spaceID) {
      throw new Error(`UserLocation is empty or incomplete!`);
    }
    // Load current world and space data
    const worldEntity = this.entityContainer
      .getEntitiesOfType(LearningWorldEntity)
      .find((world) => world.id === userLocation.worldID);
    if (!worldEntity) {
      throw new Error(`World ${userLocation.worldID} not found!`);
    }
    const currentSpace = worldEntity.spaces.find(
      (space) => space.id === userLocation.spaceID
    );
    if (!currentSpace) {
      throw new Error(`Space ${userLocation.spaceID} not found!`);
    }
    //Determine precursor room IDs
    const precursorSpaceIDs =
      LearningSpaceAvailabilityStringParser.parseToIdArray(
        currentSpace.requirements
      );
    const successorSpaceEntities = worldEntity.spaces.filter((space) =>
      LearningSpaceAvailabilityStringParser.parseToIdArray(
        space.requirements
      ).includes(userLocation.spaceID!)
    );
    const successorSpaceIDs: ComponentID[] = [];
    successorSpaceEntities.forEach((spaceEntity) => {
      successorSpaceIDs.push(spaceEntity.id);
    });
    return {
      id: userLocation.spaceID,
      precursorSpaces: precursorSpaceIDs,
      successorSpaces: successorSpaceIDs,
    } as LearningSpacePrecursorAndSuccessorTO;
  }
}
