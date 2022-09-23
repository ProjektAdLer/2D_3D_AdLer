import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";
import WorldTO from "../../DataTransferObjects/WorldTO";
export default interface ILoadWorldUseCase
  extends IAsyncUsecase<void, WorldTO> {}
