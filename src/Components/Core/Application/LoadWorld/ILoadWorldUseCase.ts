import { IAsyncUsecase } from "../Abstract/IAsyncUsecase";
import WorldTO from "../DataTransportObjects/WorldTO";
export default interface ILoadWorldUseCase
  extends IAsyncUsecase<void, WorldTO> {}
