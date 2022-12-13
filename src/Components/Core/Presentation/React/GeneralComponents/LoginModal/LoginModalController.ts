import ILoginMoodleUseCase from "../../../../Application/UseCases/LoginMoodle/ILoginMoodleUseCase";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../DependencyInjection/UseCases/USECASE_TYPES";
import ILoginModalController from "./ILoginModalController";

export default class LoginModalController implements ILoginModalController {
  async loginAsync(username: string, password: string): Promise<void> {
    CoreDIContainer.get<ILoginMoodleUseCase>(
      USECASE_TYPES.ILoginMoodleUseCase
    ).executeAsync({
      username: username,
      password: password,
    });
  }
}
