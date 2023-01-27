import ILoginUseCase from "src/Components/Core/Application/UseCases/Login/ILoginUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import ILoginButtonController from "./ILoginButtonController";
import LoginButtonViewModel from "./LoginButtonViewModel";

export default class LoginButtonController implements ILoginButtonController {
  constructor(private viewModel: LoginButtonViewModel) {}

  async loginAsync(username: string, password: string): Promise<void> {
    CoreDIContainer.get<ILoginUseCase>(
      USECASE_TYPES.ILoginUseCase
    ).executeAsync({
      username: username,
      password: password,
    });
  }
}
