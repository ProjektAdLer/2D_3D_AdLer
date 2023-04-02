import { injectable } from "inversify";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import ICalculateLearningSpaceAvailabilityUseCase from "./ICalculateLearningSpaceAvailabilityUseCase";

@injectable()
export default class CalculateLearningSpaceAvailabilityUseCase
  implements ICalculateLearningSpaceAvailabilityUseCase
{
  internalExecute(spaceID: ComponentID): boolean {
    throw new Error("Method not implemented.");
  }
}
