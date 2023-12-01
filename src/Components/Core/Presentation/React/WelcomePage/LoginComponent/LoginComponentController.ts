import ILoginUseCase from "src/Components/Core/Application/UseCases/Login/ILoginUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import ILoginComponentController from "./ILoginComponentController";
import LoginComponentViewModel from "./LoginComponentViewModel";
import ILogoutUseCase from "src/Components/Core/Application/UseCases/Logout/ILogoutUseCase";

export default class LoginComponentController
  implements ILoginComponentController
{
  constructor(private viewModel: LoginComponentViewModel) {}

  login(username: string, password: string): void {
    this.viewModel.loginFailed.Value = false;

    CoreDIContainer.get<ILoginUseCase>(USECASE_TYPES.ILoginUseCase)
      .executeAsync({
        username: username,
        password: password,
      })
      .catch(() => {
        this.viewModel.loginFailed.Value = true;
      });
  }

  logout(): void {
    CoreDIContainer.get<ILogoutUseCase>(USECASE_TYPES.ILogoutUseCase).execute();
  }
}
