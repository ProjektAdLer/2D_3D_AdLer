import { inject, injectable } from "inversify";
import IDisplayAdaptivityHintLearningElementUseCase from "./IDisplayAdaptivityHintLearningElementUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../../Ports/Interfaces/ILoggerPort";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import LearningSpaceEntity from "src/Components/Core/Domain/Entities/LearningSpaceEntity";
import LearningElementEntity from "src/Components/Core/Domain/Entities/LearningElementEntity";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../../GetUserLocation/IGetUserLocationUseCase";
import type ICalculateLearningSpaceAvailabilityUseCase from "../../CalculateLearningSpaceAvailability/ICalculateLearningSpaceAvailabilityUseCase";
import type ILoadLearningElementUseCase from "../../LoadLearningElement/ILoadLearningElementUseCase";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILearningWorldPort from "../../../Ports/Interfaces/ILearningWorldPort";
import AdaptivityElementHintTO from "../../../DataTransferObjects/AdaptivityElement/AdaptivityElementHintTO";
import { AdaptivityElementActionTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementActionTypes";

@injectable()
export default class DisplayAdaptivityHintLearningElementUseCase
  implements IDisplayAdaptivityHintLearningElementUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase,
    @inject(USECASE_TYPES.ICalculateLearningSpaceAvailabilityUseCase)
    private calculateLearningSpaceAvailabilityUseCase: ICalculateLearningSpaceAvailabilityUseCase,
    @inject(USECASE_TYPES.ILoadLearningElementUseCase)
    private loadLearningElementUseCase: ILoadLearningElementUseCase,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort
  ) {}

  async executeAsync(elementID: ComponentID): Promise<void> {
    const location = this.getUserLocationUseCase.execute();

    if (!location.spaceID || !location.worldID) {
      throw new Error(`User not in a space!`);
    }

    // get spaces of current learning world
    const spaces = this.entityContainer.filterEntitiesOfType(
      LearningSpaceEntity,
      (entity: LearningSpaceEntity) => {
        return entity.parentWorldID === location.worldID;
      }
    );

    if (spaces.length === 0) {
      throw new Error(
        "Could not find space for currently active learning world."
      );
    }

    // get learning element with given id in current learning world
    const elements = this.entityContainer.filterEntitiesOfType(
      LearningElementEntity,
      (e) => e.id === elementID && e.parentWorldID === location.worldID
    );

    if (elements.length === 0) {
      throw new Error("Could not find referenced learning element.");
    }

    // check if element is in current space
    const currentSpace = spaces.find((e) => e.id === location.spaceID);
    const isInCurrentSpace =
      currentSpace?.elements.find((e) => e?.id === elementID) !== undefined;

    // element is in space
    if (isInCurrentSpace) {
      this.worldPort.onAdaptivityElementUserHintInformed({
        hintID: -1,
        showOnIsWrong: true,
        hintAction: {
          hintActionType: AdaptivityElementActionTypes.CommentAction,
          textData:
            "Der Hinweis für diese Frage befindet sich hier in diesem Raum. Schau dir `" +
            elements[0].name +
            "` nochmal an.",
        },
      } as AdaptivityElementHintTO);
    } else {
      // check if space is available
      const spaceAvailability =
        this.calculateLearningSpaceAvailabilityUseCase.internalExecute({
          spaceID: spaces[0].id,
          worldID: location.worldID,
        });

      if (spaceAvailability.isAvailable) {
        await this.loadLearningElementUseCase.executeAsync({
          elementID: elementID,
          isScoreable: false,
        });
      } else {
        // tell player where to find learning element
        this.worldPort.onAdaptivityElementUserHintInformed({
          hintID: -1,
          showOnIsWrong: true,
          hintAction: {
            hintActionType: AdaptivityElementActionTypes.CommentAction,
            textData:
              "Der Hinweis für diese Frage ist das Lernelement `" +
              elements[0].name +
              "` im Lernraum `" +
              spaces[0].name +
              "`",
          },
        } as AdaptivityElementHintTO);
      }
    }
  }
}
