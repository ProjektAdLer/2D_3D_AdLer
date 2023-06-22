import { inject, injectable } from "inversify";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import type IAvatarPort from "../../Ports/Interfaces/IAvatarPort";
import ILoadAvatarUseCase from "./ILoadAvatarUseCase";

@injectable()
export default class LoadAvatarUseCase implements ILoadAvatarUseCase {
  constructor(
    @inject(PORT_TYPES.IAvatarPort) private avatarPort: IAvatarPort
  ) {}

  async executeAsync(): Promise<void> {
    // TODO: load avatar data from backend and pass it to the avatar port
    // this.avatarPort.presentAvatar();

    return Promise.resolve();
  }
}
