import ILoginUseCase from "../../../../Application/UseCases/Login/ILoginUseCase";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../DependencyInjection/UseCases/USECASE_TYPES";
import ILoginModalController from "./ILoginModalController";

export default class LoginModalController implements ILoginModalController {
  async loginAsync(username: string, password: string): Promise<void> {
    CoreDIContainer.get<ILoginUseCase>(
      USECASE_TYPES.ILoginUseCase
    ).executeAsync({
      username: username,
      password: password,
    });
  }
}
