import { injectable } from "inversify";
import AvatarConfigTO from "../../DataTransferObjects/AvatarConfigTO";
import AbstractPort from "../AbstractPort/AbstractPort";
import IAvatarPort from "../Interfaces/IAvatarPort";
import IAvatarAdapter from "./IAvatarAdapter";

@injectable()
export default class AvatarPort
  extends AbstractPort<IAvatarAdapter>
  implements IAvatarPort
{
  name(): string {
    return "AVATAR-PORT";
  }

  onAvatarConfigChanged(newAvatarConfig: AvatarConfigTO): void {
    this.mappedAdapters.forEach((adapters) => {
      adapters.forEach((adapter) => {
        if (adapter.onAvatarConfigChanged)
          adapter.onAvatarConfigChanged(newAvatarConfig);
      });
    });
  }
}