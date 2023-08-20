import { inject, injectable } from "inversify";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import IGetLoginStatusUseCase from "./IGetLoginStatusUseCase";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
@injectable()
export default class GetLoginStatusUseCase implements IGetLoginStatusUseCase {
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer
  ) {}

  execute(): boolean {
    // TODO: change this when multiple users are supported
    this.logger.log(
      LogLevelTypes.TRACE,
      `GetLoginStatusUseCase: Checked LoginStatus: ${
        this.container.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0]
          ?.isLoggedIn
      }.`
    );
    return (
      this.container.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0]
        ?.isLoggedIn ?? false
    );
  }
}
