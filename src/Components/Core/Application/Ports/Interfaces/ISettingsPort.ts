import SettingsTO from "../../DataTransferObjects/SettingsTO";
import ISettingsAdapter from "../SettingsPort/ISettingsAdapter";
import { IAbstractPort } from "./IAbstractPort";

export default interface ISettingsPort extends IAbstractPort<ISettingsAdapter> {
  onSettingsUpdated(settings: SettingsTO): void;
}
