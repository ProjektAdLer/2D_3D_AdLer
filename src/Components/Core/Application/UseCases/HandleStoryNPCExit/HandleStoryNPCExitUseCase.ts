import { inject, injectable } from "inversify";
import IHandleStoryNPCExitUseCase from "./IHandleStoryNPCExitUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../GetUserLocation/IGetUserLocationUseCase";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IDoorPresenter from "src/Components/Core/Presentation/Babylon/Door/IDoorPresenter";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";

@injectable()
export default class HandleStoryNPCExitUseCase
  implements IHandleStoryNPCExitUseCase
{
  constructor(
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase,
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
  ) {}

  async executeAsync({
    storyType,
  }: {
    storyType: StoryElementType;
  }): Promise<void> {
    const userLocation = this.getUserLocationUseCase.execute();

    if (!userLocation.spaceID) {
      this.logger.log(
        LogLevelTypes.WARN,
        "HandleStoryNPCExitUseCase: User is not in a space!",
      );
      return;
    }

    // Find the exit door presenter that belongs to the current space
    const exitDoorPresenter = CoreDIContainer.getAll<IDoorPresenter>(
      PRESENTATION_TYPES.IDoorPresenter,
    ).find(
      (door) => door.isExit() && door.belongsToSpace(userLocation.spaceID!),
    );

    if (!exitDoorPresenter) {
      this.logger.log(
        LogLevelTypes.WARN,
        `HandleStoryNPCExitUseCase: No exit door found for space ${userLocation.spaceID}`,
      );
      return;
    }

    this.logger.log(
      LogLevelTypes.INFO,
      `HandleStoryNPCExitUseCase: Opening exit door for story type ${StoryElementType[storyType]} in space ${userLocation.spaceID}`,
    );

    // Return a Promise that resolves when the door animation is finished
    return new Promise<void>((resolve) => {
      exitDoorPresenter.open(() => {
        // Door animation is finished, wait a bit then close the door
        setTimeout(() => {
          exitDoorPresenter.close();
          resolve(); // Resolve when everything is done
        }, 2000);
      });
    });
  }
}
