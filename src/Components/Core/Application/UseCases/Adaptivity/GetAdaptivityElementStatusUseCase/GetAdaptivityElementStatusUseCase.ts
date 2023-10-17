import { inject, injectable } from "inversify";
import AdaptivityElementProgressTO from "../../../DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";
import IGetAdaptivityElementStatusUseCase from "./IGetAdaptivityElementStatusUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../../Ports/Interfaces/ILoggerPort";
import type IBackendPort from "../../../Ports/Interfaces/IBackendPort";
import { AdaptivityElementStatusTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementStatusTypes";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../../GetUserLocation/IGetUserLocationUseCase";

@injectable()
export default class GetAdaptivityElementStatusUseCase
  implements IGetAdaptivityElementStatusUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IBackendAdapter)
    private backendAdapter: IBackendPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase
  ) {}

  // TODO remove data as argument, repalce with other arguments
  async internalExecuteAsync(
    data: AdaptivityElementProgressTO
  ): Promise<AdaptivityElementProgressTO> {
    const token =
      this.entityContainer.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0]
        .userToken;

    const userLocation = this.getUserLocationUseCase.execute();
    if (!userLocation.worldID || !userLocation.spaceID) {
      throw new Error(`User is not in a space!`);
    }

    const response =
      await this.backendAdapter.getAdaptivityElementStatusResponse({
        userToken: token,
        elementID: data.id,
        worldID: userLocation.worldID,
      });

    data.isCompleted = response.element.success;
    data.tasks.forEach((task) => {
      const t = response.tasks.find((t) => t.taskId === task.taskId);
      task.isCompleted = this.parseStatusToBoolean(t!.taskStatus);
      task.questions.forEach((question) => {
        const q = response.questions.find((q) => q.id === question.questionId);
        question.isCompleted = this.parseStatusToBoolean(q!.status);
      });
    });

    return data;
  }

  private parseStatusToBoolean(status: string): boolean | null {
    if (status === AdaptivityElementStatusTypes.Correct) return true;
    else if (status === AdaptivityElementStatusTypes.Incorrect) return false;
    else return null;
  }
}
