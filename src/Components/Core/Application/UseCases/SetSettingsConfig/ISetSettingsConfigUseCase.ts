import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";
import SettingsTO from "../../DataTransferObjects/SettingsTO";

export default interface ISetSettingsConfigUseCase
  extends ISynchronousUsecase<SettingsTO, void> {}
