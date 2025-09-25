import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";
import SettingsTO from "../../DataTransferObjects/SettingsTO";

export default interface IGetSettingsConfigUseCase
  extends ISynchronousUsecase<void, SettingsTO> {}
