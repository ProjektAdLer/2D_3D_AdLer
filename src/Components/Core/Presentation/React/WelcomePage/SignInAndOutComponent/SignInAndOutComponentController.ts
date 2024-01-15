import ILoginUseCase from "src/Components/Core/Application/UseCases/Login/ILoginUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import ISignInAndOutComponentController from "./ISignInAndOutComponentController";
import SignInAndOutComponentViewModel from "./SignInAndOutComponentViewModel";
import ILogoutUseCase from "src/Components/Core/Application/UseCases/Logout/ILogoutUseCase";

export default class SignInAndOutComponentController
  implements ISignInAndOutComponentController
{
  constructor(private viewModel: SignInAndOutComponentViewModel) {}

  login(username: string, password: string): void {
    this.viewModel.loginFailed.Value = false;

    CoreDIContainer.get<ILoginUseCase>(
      USECASE_TYPES.ILoginUseCase
    ).executeAsync({
      username: username,
      password: password,
    });
  }

  logout(): void {
    CoreDIContainer.get<ILogoutUseCase>(USECASE_TYPES.ILogoutUseCase).execute();
  }
}
