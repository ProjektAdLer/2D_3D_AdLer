import { inject, injectable } from "inversify";
import PORT_TYPES from "../../DependencyInjection/Ports/PORT_TYPES";
import type IAvatarPort from "./IAvatarPort";
import ILoadAvatarUseCase from "./ILoadAvatarUseCase";

@injectable()
export default class LoadAvatarUseCase implements ILoadAvatarUseCase {
  constructor(
    @inject(PORT_TYPES.IAvatarPort) private avatarPort: IAvatarPort
  ) {}

  async executeAsync(): Promise<void> {
    this.avatarPort.presentAvatar({ avatarName: "PlaceholderCharacter" });

    return Promise.resolve();
  }
}
