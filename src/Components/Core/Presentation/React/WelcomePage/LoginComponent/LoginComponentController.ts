import ILoginUseCase from "src/Components/Core/Application/UseCases/Login/ILoginUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import ILoginComponentController from "./ILoginComponentController";
import LoginComponentViewModel from "./LoginComponentViewModel";

export default class LoginComponentController
  implements ILoginComponentController
{
  constructor(private viewModel: LoginComponentViewModel) {}

  async loginAsync(username: string, password: string): Promise<void> {
    CoreDIContainer.get<ILoginUseCase>(
      USECASE_TYPES.ILoginUseCase
    ).executeAsync({
      username: username,
      password: password,
    });
  }
}
