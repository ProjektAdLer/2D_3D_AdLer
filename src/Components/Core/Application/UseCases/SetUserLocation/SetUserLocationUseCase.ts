import { inject, injectable } from "inversify";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import ISetUserLocationUseCase from "./ISetUserLocationUseCase";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type { IInternalGetLoginStatusUseCase } from "../GetLoginStatus/IGetLoginStatusUseCase";

@injectable()
export default class SetUserLocationUseCase implements ISetUserLocationUseCase {
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(USECASE_TYPES.IGetLoginStatusUseCase)
    private getLoginStatusUseCase: IInternalGetLoginStatusUseCase
  ) {}

  execute(data: { worldID?: number; spaceID?: number }): void {
    const loginStatus = this.getLoginStatusUseCase.internalExecute();
    if (!loginStatus.isLoggedIn) {
      this.logger.log(
        LogLevelTypes.ERROR,
        "SetUserLocationUseCase: User is not logged in, cannot set current location"
      );
      return;
    }

    let userDataEntity =
      this.entityContainer.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0];

    if (data.worldID) userDataEntity.currentWorldID = data.worldID;
    else userDataEntity.currentWorldID = undefined;

    if (data.spaceID) userDataEntity.currentSpaceID = data.spaceID;
    else userDataEntity.currentSpaceID = undefined;

    this.logger.log(
      LogLevelTypes.INFO,
      `User location set to: ${data.worldID} + ${data.spaceID}`
    );
  }
}
