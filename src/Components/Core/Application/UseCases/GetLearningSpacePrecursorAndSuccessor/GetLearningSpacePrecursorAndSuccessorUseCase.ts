import { inject, injectable } from "inversify";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";
import LearningSpaceEntity from "src/Components/Core/Domain/Entities/LearningSpaceEntity";
import IGetLearningSpacePrecursorAndSuccessorUseCase from "./IGetLearningSpacePrecursorAndSuccessorUseCase";
import type ILoadLearningSpaceUseCase from "../LoadLearningSpace/ILoadLearningSpaceUseCase";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import LearningWorldEntity from "src/Components/Core/Domain/Entities/LearningWorldEntity";
import LearningSpaceAvailabilityStringParser from "src/Components/Core/Application/UseCases/CalculateLearningSpaceAvailability/Parser/LearningSpaceAvailabilityStringParser";
import LearningSpacePrecursorAndSuccessorTO from "../../DataTransferObjects/LearningSpacePrecursorAndSuccessorTO";
import LearningSpaceTO from "../../DataTransferObjects/LearningSpaceTO";

@injectable()
export default class GetLearningSpacePrecursorAndSuccessorUseCase
  implements IGetLearningSpacePrecursorAndSuccessorUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase,
    @inject(USECASE_TYPES.ILoadLearningSpaceUseCase)
    private loadLearningSpace: ILoadLearningSpaceUseCase,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort
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
    //Load precursor rooms and push them into the precursorSpaces array
    const precursorSpaces: LearningSpaceTO[] = [];
    precursorSpaceIDs.forEach((id) => {
      const matchingSpaceEntity = worldEntity.spaces.find(
        (space) => space.id === id
      );
      if (matchingSpaceEntity) {
        let spaceTO = this.toTO(matchingSpaceEntity);
        precursorSpaces.push(spaceTO);
      }
    });
    //Determine successorSpaces and push them into the successorSpaces array
    const successorSpaceEntities = worldEntity.spaces.filter((space) =>
      LearningSpaceAvailabilityStringParser.parseToIdArray(
        space.requirements
      ).includes(userLocation.spaceID!)
    );
    const successorSpaces: LearningSpaceTO[] = [];
    successorSpaceEntities.forEach((spaceEntity) => {
      let spaceTO = this.toTO(spaceEntity);
      successorSpaces.push(spaceTO);
    });
    return {
      id: userLocation.spaceID,
      precursorSpaces: precursorSpaces,
      successorSpaces: successorSpaces,
    } as LearningSpacePrecursorAndSuccessorTO;
  }

  private toTO(spaceEntity: LearningSpaceEntity): LearningSpaceTO {
    let spaceTO = new LearningSpaceTO();
    spaceTO = Object.assign(spaceTO, structuredClone(spaceEntity));
    return spaceTO;
  }
}
