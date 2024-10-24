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
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type INotificationPort from "../../../Ports/Interfaces/INotificationPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import { ErrorTypes } from "src/Components/Core/Domain/Types/ErrorTypes";

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
    private getUserLocationUseCase: IGetUserLocationUseCase,
    @inject(PORT_TYPES.INotificationPort)
    private notificationPort: INotificationPort,
  ) {}

  async internalExecuteAsync(data: AdaptivityElementProgressTO): Promise<void> {
    const token =
      this.entityContainer.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0]
        .userToken;

    const userLocation = this.getUserLocationUseCase.execute();
    if (!userLocation.worldID || !userLocation.spaceID) {
      this.logger.log(
        LogLevelTypes.ERROR,
        `GetAdaptivityElementStatusUseCase: User is not in a space!`,
      );
      throw new Error(ErrorTypes.USER_NOT_IN_SPACE);
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
        if (q!.answers !== null && q!.answers !== undefined) {
          question.questionAnswers.forEach((answer, index) => {
            answer.answerIsCorrect =
              q!.answers[index].correct && q!.answers[index].checked;
          });
        }
        question.isCompleted = this.parseStatusToBoolean(q!.status);
      });
    });
  }

  private parseStatusToBoolean(status: string): boolean | null {
    if (status === AdaptivityElementStatusTypes.Correct) return true;
    else if (status === AdaptivityElementStatusTypes.Incorrect) return false;
    else return null;
  }
}
