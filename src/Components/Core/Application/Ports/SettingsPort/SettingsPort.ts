import { injectable } from "inversify";
import AbstractPort from "../AbstractPort/AbstractPort";
import ISettingsAdapter from "./ISettingsAdapter";
import ISettingsPort from "../Interfaces/ISettingsPort";
import bind from "bind-decorator";
import SettingsTO from "../../DataTransferObjects/SettingsTO";

@injectable()
export default class SettingsPort
  extends AbstractPort<ISettingsAdapter>
  implements ISettingsPort
{
  @bind
  name(): string {
    return "SETTINGS-PORT";
  }

  public onSettingsUpdated(settingsTO: SettingsTO): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onSettingsUpdated) value.onSettingsUpdated(settingsTO);
      });
    });
  }
}
