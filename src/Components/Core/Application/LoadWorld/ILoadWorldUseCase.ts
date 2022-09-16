import { IAsyncUsecase } from "../Abstract/IAsyncUsecase";
import LearningWorldTO from "../DataTransportObjects/LearningWorldTO";
export default interface ILoadWorldUseCase
  extends IAsyncUsecase<void, LearningWorldTO> {}
