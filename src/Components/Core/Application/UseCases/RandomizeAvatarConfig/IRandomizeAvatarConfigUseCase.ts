// filepath: src/Components/Core/Application/UseCases/RandomizeAvatarConfig/IRandomizeAvatarConfigUseCase.ts
import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";
import AvatarConfigTO from "../../DataTransferObjects/AvatarConfigTO";

export default interface IRandomizeAvatarConfigUseCase {
  executeAsync(): Promise<void>;
}
