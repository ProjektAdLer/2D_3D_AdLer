import ILogUserIntoMoodleUseCase from "../../../Application/LogUserIntoMoodle/ILogUserIntoMoodleUseCase";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_TYPES";
import IMoodleLoginFormController from "./IMoodleLoginFormController";

export default class MoodleLoginFormController
  implements IMoodleLoginFormController
{
  async loginAsync(username: string, password: string): Promise<void> {
    CoreDIContainer.get<ILogUserIntoMoodleUseCase>(
      USECASE_TYPES.ILogUserIntoMoodleUseCase
    ).executeAsync({
      username: username,
      password: password,
    });
  }
}
