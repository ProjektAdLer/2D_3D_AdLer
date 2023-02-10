import { inject, injectable } from "inversify";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import IGetLoginStatusUseCase from "./IGetLoginStatusUseCase";

@injectable()
export default class GetLoginStatusUseCase implements IGetLoginStatusUseCase {
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer
  ) {}

  execute(): boolean {
    // TODO: change this when multiple users are supported
    return (
      this.container.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0]
        ?.isLoggedIn ?? false
    );
  }
}
