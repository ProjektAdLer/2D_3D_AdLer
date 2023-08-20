import { inject, injectable } from "inversify";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import type IAvatarPort from "../../Ports/Interfaces/IAvatarPort";
import ILoadAvatarUseCase from "./ILoadAvatarUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";

@injectable()
export default class LoadAvatarUseCase implements ILoadAvatarUseCase {
  constructor(
    @inject(CORE_TYPES.ILogger) private logger: ILoggerPort,
    @inject(PORT_TYPES.IAvatarPort) private avatarPort: IAvatarPort
  ) {}

  async executeAsync(): Promise<void> {
    // TODO: load avatar data from backend and pass it to the avatar port
    // this.avatarPort.presentAvatar();

    this.logger.log(
      LogLevelTypes.TRACE,
      "LoadAvatarUseCase: Loaded Avatar from Backend (NOT IMPLEMENTED)."
    );
    return Promise.resolve();
  }
}
